import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { IconFlame, IconBook2, IconLock, IconCheck, IconSearch, IconFilter } from '@tabler/icons-react';

const STORAGE_KEY = 'finlitgo_classes';

function getClasses() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, title: 'Money Management Basics', category: 'Foundation', description: 'Learn the fundamentals of managing your money wisely.', chapters: 12, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80' },
    { id: 2, title: 'Investing for Beginners', category: 'Growth', description: 'Start your investment journey with confidence.', chapters: 8, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80' },
    { id: 3, title: 'Crypto & Digital Assets', category: 'Advanced', description: 'Understand the world of cryptocurrency and blockchain.', chapters: 10, image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80' },
  ];
}

export default function ClassPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const classes = getClasses();

  // IDs of classes that require login
  const loginRequiredIds = [1, 2, 3];

  const handleClassClick = (course) => {
    if (loginRequiredIds.includes(course.id) && !user) {
      navigate(`/register?redirect=/class/${course.id}`);
      return;
    }
    navigate(`/class/${course.id}`);
  };

  const filters = ['All', 'Foundation', 'Growth', 'Advanced'];
  const filteredClasses = classes.filter(cls => {
    const matchFilter = activeFilter === 'All' || cls.category === activeFilter;
    const matchSearch = cls.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section — matching home page gradient */}
      <section className="relative w-full py-24 px-6 overflow-hidden">
        {/* Background gradient like home hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#6D28D9] to-[#A78BFA] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-violet-300 font-mono text-sm uppercase tracking-[0.3em] block mb-4">FinLitGo Learning</span>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-6 leading-tight">
              Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">Financial</span> Future
            </h1>
            <p className="text-zinc-300 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
              Interactive learning modules designed for Gen Z. Bite-sized lessons, real-world case studies, and gamified quizzes to build your financial literacy.
            </p>
          </motion.div>

          {/* Search Bar */}
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
              onChange={e => setSearch(e.target.value)}
              placeholder="Search classes..."
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-4 px-12 text-white placeholder-zinc-400 focus:outline-none focus:border-violet-400 focus:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all text-lg"
            />
          </motion.div>

          {/* Streak Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 mt-8 bg-black/40 backdrop-blur-xl border border-violet-500/30 px-6 py-3 rounded-2xl"
          >
            <IconFlame size={24} className="text-orange-500 animate-pulse" />
            <div className="text-left">
              <span className="text-xl font-bold font-orbitron text-white">32</span>
              <span className="text-xs text-zinc-400 ml-2">Day Streak</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-3">
            <IconBook2 className="text-violet-400" /> Learning Paths
          </h2>
          <div className="flex gap-2">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f 
                    ? 'bg-gradient-to-r from-violet-600 to-purple-400 text-white shadow-[0_4px_15px_rgba(124,58,237,0.3)]' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleClassClick(course)}
              className="bg-[#1A1A1A] border border-zinc-800 hover:border-violet-500/40 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-violet-500/10 flex flex-col"
            >
              {/* Image */}
              <div className="h-48 w-full relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
                {course.image ? (
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <IconBook2 size={48} />
                  </div>
                )}
                
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-violet-300 border border-violet-500/30">
                  {course.category}
                </div>

                {/* Lock overlay for login-required classes */}
                {loginRequiredIds.includes(course.id) && !user && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2">
                      <IconLock size={32} className="text-violet-300" />
                      <span className="text-xs font-medium text-violet-300">Login Required</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-violet-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm text-zinc-500 font-mono">{course.chapters} Chapters</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-violet-600/20 to-purple-400/20 text-violet-300 text-xs font-medium rounded-full border border-violet-500/20">
                    Start Learning
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            <IconSearch size={48} className="mx-auto mb-4 text-zinc-600" />
            <p className="text-lg">No classes found. Try different filters or search terms.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-[#1A1A2E] via-[#2D1B69] to-[#1A1A2E] border border-violet-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold font-orbitron text-white mb-4">Ready to Level Up?</h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">Sign up now and start your financial literacy journey. Track your progress, earn streaks, and master your money.</p>
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
