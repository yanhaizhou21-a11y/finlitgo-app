let classes = [
  { id: 1, title: 'Money Management Basics', category: 'Foundation', chapters: 12, progress: 100, locked: false, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80' },
  { id: 2, title: 'Investing for Beginners', category: 'Growth', chapters: 8, progress: 45, locked: false, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80' },
  { id: 3, title: 'Crypto & Digital Assets', category: 'Advanced', chapters: 10, progress: 0, locked: true, image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80' },
  { id: 4, title: 'Real Estate 101', category: 'Advanced', chapters: 5, progress: 0, locked: true, image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80' }
];

let userStats = {
  streakDays: 32,
  lastCompletedDate: '2026-03-29' // Yesterday
};

exports.getAllClasses = async (req, res) => {
  try {
    res.json({ success: true, data: { classes, stats: userStats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classData = classes.find(c => c.id === parseInt(req.params.id));
    if (!classData) return res.status(404).json({ success: false, message: 'Class not found' });
    res.json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { classId, completedChapter } = req.body;
    
    // Simple logic to ensure streak stays alive
    const today = new Date().toISOString().split('T')[0];
    if (userStats.lastCompletedDate !== today) {
      userStats.streakDays += 1;
      userStats.lastCompletedDate = today;
    }
    
    res.json({ success: true, message: 'Progress saved and streak updated', data: userStats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
