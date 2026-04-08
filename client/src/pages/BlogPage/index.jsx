import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowRight, IconSearch, IconClock, IconBookmark } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'finlitgo_blogs';

function getBlogs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, title: 'How to Build an Emergency Fund in 6 Months', excerpt: 'An emergency fund is a financial safety net designed to cover unexpected expenses...', author: 'Admin FinlitGo', date: 'Oct 12', timeToRead: '4 min read', category: 'Foundation', image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80' },
    { id: 2, title: 'Understanding Crypto: A Beginner\'s Guide', excerpt: 'Cryptocurrency has taken the financial world by storm, but what exactly is it?', author: 'Doctor Solking', date: 'Oct 10', timeToRead: '8 min read', category: 'Advanced', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80' },
    { id: 3, title: 'The 50/30/20 Rule Explained', excerpt: 'Budgeting doesn\'t have to be complicated. Learn how the 50/30/20 rule can simplify your finances.', author: 'Admin FinlitGo', date: 'Oct 05', timeToRead: '5 min read', category: 'Foundation', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80' },
    { id: 4, title: 'Why You Need to Start Investing Early', excerpt: 'Compound interest is the eighth wonder of the world. Find out why starting early is crucial.', author: 'Snickers', date: 'Sep 28', timeToRead: '6 min read', category: 'Growth', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80' }
  ];
}

export default function BlogPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    const data = getBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  ).map(b => ({
    ...b,
    image: b.thumbnail_url || b.image,
    date: new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const featured = filteredBlogs[0];
  const restPosts = filteredBlogs.slice(1, 1 + visibleCount);


  return (
    <div className="relative min-h-screen text-white">

      {/* Hero Section */}
      <section className="relative z-10 w-full overflow-hidden bg-[#0a0a0a] px-6 py-20">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="text-violet-300 font-mono text-sm uppercase tracking-[0.3em] block mb-4">FinLitGo Blog</span>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">Knowledge</span> Base
            </h1>
            <p className="text-zinc-300 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
              Deep dives, guides, and insights to help you navigate the complex world of personal finance, tailored for the younger generation.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <div className="relative w-full">
              {/* Placeholder text yang bergeser ke kanan */}
              <AnimatePresence mode="wait">
                {!isSearchFocused && search === "" && (
                  <motion.div
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-12 flex items-center pointer-events-none z-10"
                  >
                    <span className="text-zinc-400 text-lg">Search articles...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon Search yang muncul dari kanan */}
              <AnimatePresence mode="wait">
                {isSearchFocused && (
                  <motion.div
                    initial={{ x: 50, opacity: 0, scale: 0.5 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -50, opacity: 0, scale: 0.5 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      duration: 0.4 
                    }}
                    className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10"
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 0.5, ease: "easeInOut" },
                        scale: { duration: 0.3, ease: "easeInOut" }
                      }}
                    >
                      <IconSearch 
                        className="text-violet-400" 
                        size={24} 
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon Search statis (selalu ada) */}
              <motion.div 
                className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10"
                animate={{ 
                  opacity: isSearchFocused ? 0 : 1,
                  scale: isSearchFocused ? 0.8 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <IconSearch 
                  className="text-zinc-400" 
                  size={20} 
                />
              </motion.div>
              
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(3);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-transparent focus:outline-none focus:border-violet-400 focus:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all duration-300 text-lg"
              />

              {/* Animated Glow Effect saat focus */}
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-400 rounded-2xl blur-xl -z-10 opacity-30"
                />
              )}
            </div>
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
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
              <div className="absolute top-6 left-6 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-xs px-3 py-1 rounded-full shadow-lg">
                Featured
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-violet-400 font-mono text-sm uppercase mb-3">{featured.category}</span>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-violet-300 transition-colors">{featured.title}</h2>
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

      {/* Recent Articles Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-8 pb-20">
        <h3 className="text-2xl font-bold font-orbitron mb-8 border-b border-zinc-800 pb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-400 rounded-full" />
          Recent Articles
        </h3>

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
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
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

        <div className="text-center mt-10 flex justify-center gap-4">

          {/* LOAD MORE */}
          {visibleCount + 1 < filteredBlogs.length && (
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Load More
            </button>
          )}

          {/* SHOW LESS */}
          {visibleCount > 3 && (
            <button
              onClick={() => setVisibleCount(3)}
              className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl font-bold hover:bg-zinc-700 transition-all"
            >
              Show Less
            </button>
          )}

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