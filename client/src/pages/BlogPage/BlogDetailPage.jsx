// Tambah import
import { supabase } from '@/services/supabase';

// Ganti useEffect di BlogDetailPage.jsx
useEffect(() => {
  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)  // atau postId kalau di BlogPostPage
      .single();

    if (!error && data) {
      setBlog({
        ...data,
        image: data.image || data.thumbnail_url || '',
        timeToRead: data.time_to_read || '5 min read',
        date: new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      });
    }
    window.scrollTo(0, 0);
  };
  fetchBlog();
}, [id]);