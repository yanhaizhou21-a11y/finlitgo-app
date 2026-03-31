let blogs = [
  { 
    id: 1, 
    title: 'How to Build an Emergency Fund in 6 Months', 
    excerpt: 'An emergency fund is a financial safety net designed to cover unexpected expenses...', 
    content: 'Full article content for emergency fund...',
    author: 'Admin FinlitGo', 
    date: 'Oct 12, 2026', 
    timeToRead: '4 min read', 
    category: 'Foundation', 
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80' 
  },
  { 
    id: 2, 
    title: 'Understanding Crypto: A Beginner\'s Guide', 
    excerpt: 'Cryptocurrency has taken the financial world by storm...', 
    content: 'Full article content for crypto...',
    author: 'Doctor Solking', 
    date: 'Oct 10, 2026', 
    timeToRead: '8 min read', 
    category: 'Advanced', 
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80' 
  }
];

exports.getAllBlogs = async (req, res) => {
  try {
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const newBlog = {
      id: blogs.length + 1,
      ...req.body,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    blogs.push(newBlog);
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
