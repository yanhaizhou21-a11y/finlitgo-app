const { getSupabaseClient } = require('../utils/supabaseClient');

exports.getAllClasses = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    // Fetch classes
    const { data: classes, error: classError } = await supabase
      .from('classes')
      .select('*')
      .order('created_at', { ascending: true });

    if (classError) throw classError;

    // Return user stats if user is authenticated
    let stats = { current_streak: 0, total_points: 0 };
    
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user) {
        const { data: userProfile } = await supabase
            .from('users')
            .select('current_streak, total_points')
            .eq('id', userData.user.id)
            .single();
            
        if (userProfile) {
            stats = userProfile;
        }
    }

    res.json({ success: true, data: { classes, stats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;
    
    // Fetch class with chapters and quizzes nested
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
    
    // Order chapters
    if (classData.chapters) {
        classData.chapters.sort((a, b) => a.order_index - b.order_index);
    }

    res.json({ success: true, data: classData });
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

