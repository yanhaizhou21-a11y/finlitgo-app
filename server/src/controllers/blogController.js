const { getSupabaseClient } = require('../utils/supabaseClient');

exports.getAllBlogs = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;
    
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
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
    const supabase = getSupabaseClient(req);
    
    const newBlog = {
        title: req.body.title,
        excerpt: req.body.excerpt,
        content: req.body.content,
        author: req.body.author,
        thumbnail_url: req.body.thumbnail_url || req.body.image
    };

    const { data: createdBlog, error } = await supabase
      .from('blogs')
      .insert(newBlog)
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: createdBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;
    
    const updatedBlog = {
        title: req.body.title,
        excerpt: req.body.excerpt,
        content: req.body.content,
        author: req.body.author,
        thumbnail_url: req.body.thumbnail_url || req.body.image
    };

    const { data, error } = await supabase
      .from('blogs')
      .update(updatedBlog)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    const { id } = req.params;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

