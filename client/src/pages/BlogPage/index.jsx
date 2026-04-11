import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight, IconSearch, IconClock, IconBookmark } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/services/supabase';

export default function BlogPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBlogs(data.map(b => ({
          ...b,
          image: b.image || b.thumbnail_url || '',
          timeToRead: b.time_to_read || '5 min read',
          date: new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        })));
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const featured = filteredBlogs[0];
  const restPosts = filteredBlogs.slice(1, 1 + visibleCount);
  const remainingPosts = Math.max(0, filteredBlogs.length - 1 - visibleCount);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-zinc-500">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative z-10 w-full overflow-hidden px-6 py-20">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="text-violet-300 font-mono text-sm uppercase tracking-[0.3em] block mb-4">
              FinLitGo Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                Knowledge
              </span>{" "}
              Base
            </h1>
            <p className="text-zinc-300 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
              Deep dives, guides, and insights to help you navigate the complex
              world of personal finance, tailored for the younger generation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setVisibleCount(3); }}
              placeholder="Search articles..."
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-4 px-12 text-white placeholder-zinc-400 focus:outline-none focus:border-violet-400 focus:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all text-lg"
            />
          </motion.div>
        </div>
      </section>

      <div className="pointer-events-none relative z-10 -mt-14 h-20 bg-[linear-gradient(to_bottom,rgba(10,10,10,0)_0%,rgba(62,38,140,0.34)_52%,rgba(10,10,10,0)_100%)]" />

      {/* Featured Post */}
      {featured && (
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-8 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/blog/${featured.id}`)}
            className="group cursor-pointer bg-[#1A1A1A] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl hover:border-violet-500/30 transition-all flex flex-col md:flex-row h-auto md:h-96 w-full"
          >
            <div className="w-full md:w-1/2 h-64 md:h-full overflow-hidden relative">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-xs px-3 py-1 rounded-full shadow-lg">
                Featured
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-violet-400 font-mono text-sm uppercase mb-3">{featured.category}</span>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-violet-300 transition-colors">
                {featured.title}
              </h2>
              <p className="text-zinc-400 mb-8 line-clamp-3 text-lg">{featured.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${featured.author}`} className="w-full h-full object-cover" alt="Author" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-medium">{featured.author}</span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <IconClock size={12} /> {featured.date} · {featured.timeToRead}
                    </span>
                  </div>
                </div>
                <button className="text-violet-400 bg-zinc-900 border border-zinc-700 p-3 rounded-full group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-400 group-hover:text-white group-hover:border-transparent transition-all">
                  <IconArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-8 pb-20">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
          <h3 className="text-2xl font-bold font-orbitron flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-400 rounded-full" />
            Recent Articles
          </h3>
          <div className="flex gap-3">
            {remainingPosts > 0 && (
              <button onClick={() => setVisibleCount(prev => prev + 3)} className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-400 text-white text-sm rounded-lg font-semibold hover:shadow-lg transition-all">
                Load More
              </button>
            )}
            {visibleCount > 3 && (
              <button onClick={() => setVisibleCount(3)} className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg font-semibold hover:bg-zinc-700 transition-all">
                Show Less
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="bg-[#1A1A1A] border border-zinc-800 hover:border-violet-500/30 rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/5"
            >
              <div className="w-full h-48 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full text-zinc-400 hover:text-violet-400 transition-colors">
                  <IconBookmark size={16} />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-violet-400 font-mono tracking-widest text-[10px] uppercase mb-2 block">{post.category}</span>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-tight">{post.title}</h4>
                <p className="text-zinc-500 text-sm line-clamp-2 mb-6">{post.excerpt}</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${post.author}`} className="w-full h-full object-cover" alt="Author" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-300 font-medium">{post.author}</span>
                    <span className="text-[10px] text-zinc-600 font-mono flex items-center gap-1">
                      <IconClock size={10} /> {post.date} · {post.timeToRead}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            <IconSearch size={48} className="mx-auto mb-4 text-zinc-600" />
            <p className="text-lg">No articles found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}