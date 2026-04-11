const { getSupabaseClient } = require('../utils/supabaseClient');

exports.getAllClasses = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    // Fetch classes
    const { data: classes, error: classError } = await supabase
      .from('classes')
      .select('*')
      .order('id', { ascending: true });

    if (classError) throw classError;

    // Return user stats and progress if user is authenticated
    let stats = { current_streak: 0, total_points: 0 };
    let progresses = {}; // Map of classId -> progressPercent
    
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    if (userId) {
        // 1. Fetch user profile stats
        const { data: userProfile } = await supabase
            .from('users')
            .select('current_streak, total_points')
            .eq('id', userId)
            .single();
            
        if (userProfile) {
            stats = userProfile;
        }

        // 2. Fetch all chapters for these classes to get actual total counts
        const { data: allChapters } = await supabase
            .from('chapters')
            .select('id, class_id');
            
        const totalCounts = {};
        if (allChapters) {
            allChapters.forEach(ch => {
                totalCounts[ch.class_id] = (totalCounts[ch.class_id] || 0) + 1;
            });
        }

        // 3. Fetch user progress
        const { data: userProgressData, error: progressError } = await supabase
            .from('user_progress')
            .select('chapter_id, chapters(class_id)')
            .eq('user_id', userId);

        if (!progressError && userProgressData) {
            const completedCounts = {};
            userProgressData.forEach(item => {
                const classId = item.chapters?.class_id;
                if (classId) {
                    completedCounts[classId] = (completedCounts[classId] || 0) + 1;
                }
            });

            // Calculate percentage for each class
            classes.forEach(c => {
                const completed = completedCounts[c.id] || 0;
                const total = totalCounts[c.id] || c.chapters_count || 1; 
                progresses[c.id] = Math.min(100, Math.round((completed / total) * 100));
            });
        }
    }

    // Attach progress and dynamic total count to each class object
    const classesWithProgress = classes.map(c => ({
        ...c,
        progress: progresses[c.id] || 0,
        chapters_count: totalCounts[c.id] || c.chapters_count || 1
    }));

    res.json({ success: true, data: { classes: classesWithProgress, stats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;
    
    // 1. Fetch class with chapters and quizzes nested
    const { data: classData, error } = await supabase
      .from('classes')
      .select(`
        *,
        chapters (
          *,
          quizzes (*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!classData) return res.status(404).json({ success: false, message: 'Class not found' });
    
    // 2. Fetch user progress if authenticated
    let completedChapterIds = [];
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user) {
        const { data: progressData } = await supabase
            .from('user_progress')
            .select('chapter_id')
            .eq('user_id', userData.user.id)
            .in('chapter_id', classData.chapters?.map(c => c.id) || []);
        
        if (progressData) {
            completedChapterIds = progressData.map(p => p.chapter_id);
        }
    }

    // 3. Order chapters and attach progress
    if (classData.chapters) {
        classData.chapters.sort((a, b) => a.order_index - b.order_index);
    }

    res.json({ 
        success: true, 
        data: { 
            ...classData, 
            completed_chapter_ids: completedChapterIds 
        } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { chapterId, earnedPoints } = req.body;
    
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData?.user) throw new Error("Unauthorized");
    
    const userId = userData.user.id;
    
    // 1. Log progress using UPSERT to prevent duplicate inserts 
    const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('chapter_id', chapterId)
        .single();
        
    let pointsToAward = 0;
    if (!existingProgress) {
        const { error: insertError } = await supabase
            .from('user_progress')
            .insert({ user_id: userId, chapter_id: chapterId, earned_points: earnedPoints || 0 });
            
        if (insertError) throw insertError;
        pointsToAward = earnedPoints || 0;
    }
    
    // 2. Update Streak & Points logic
    const { data: userProfile } = await supabase
        .from('users')
        .select('current_streak, last_study_date, total_points')
        .eq('id', userId)
        .single();
        
    if (userProfile) {
        let { current_streak, last_study_date, total_points } = userProfile;
        
        const today = new Date().toISOString().split('T')[0];
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = yesterdayDate.toISOString().split('T')[0];
        
        // Update streak logic
        if (last_study_date === yesterday) {
            current_streak += 1;
            last_study_date = today;
        } else if (last_study_date !== today) {
            current_streak = 1; // Restart streak if missed day
            last_study_date = today;
        }
        
        total_points += pointsToAward;

        // Save updated streak and points
        await supabase
            .from('users')
            .update({ current_streak, last_study_date, total_points })
            .eq('id', userId);
            
        res.json({ success: true, message: 'Progress saved and streak updated', data: { current_streak, total_points } });
    } else {
        res.json({ success: true, message: 'Progress saved but user profile not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { title, category, description, chapters, image, youtubeUrl, quizzes } = req.body;
    
    // 1. Insert class first
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .insert({ 
        title, 
        category, 
        description, 
        chapters_count: chapters, 
        thumbnail_url: image, 
        youtube_url: youtubeUrl 
      })
      .select()
      .single();
      
    if (classError) throw classError;
    
    const classId = classData.id;
    
    // 2. Insert chapters and quizzes if provided (for now we create one main chapter)
    if (quizzes && quizzes.length > 0) {
        const { data: chapterData, error: chapterError } = await supabase
            .from('chapters')
            .insert({ class_id: classId, title: 'Main Content', order_index: 0, content_type: 'video' })
            .select()
            .single();
            
        if (chapterError) throw chapterError;
        
        const quizzesToInsert = quizzes.map(q => ({
            chapter_id: chapterData.id,
            question: q.question,
            options: q.options,
            correct_answer: q.correctAnswer
        }));
        
        const { error: quizError } = await supabase
            .from('quizzes')
            .insert(quizzesToInsert);
            
        if (quizError) throw quizError;
    }
    
    res.status(201).json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;
    const { title, category, description, chapters, image, youtubeUrl } = req.body;
    
    const { data, error } = await supabase
      .from('classes')
      .update({ 
        title, 
        category, 
        description, 
        chapters_count: chapters, 
        thumbnail_url: image, 
        youtube_url: youtubeUrl 
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;
    
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

