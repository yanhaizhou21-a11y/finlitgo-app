import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { getCurrentStreak } from '../../utils/streak';
import { CLASS_META, CLASS_LEVELS } from '../../data/classContent';
import {
  IconFlame,
  IconBook2,
  IconLock,
  IconCheck,
  IconSearch,
  IconStar,
  IconClock,
  IconChevronRight,
  IconArrowRight,
} from '@tabler/icons-react';

const STORAGE_KEY = 'finlitgo_classes';

function getClasses() {
  return [
    { id: 1, title: 'Financial Foundation & Mindset', category: 'Foundation', description: 'Bangun pondasi keuangan yang kuat, pahami psikologi uang, dan kuasai strategi budgeting yang cocok untuk Gen Z.', levels: 1, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80' },
    { id: 2, title: 'Navigasi Hutang & Kredit Digital', category: 'Intermediate', description: 'Bongkar cara kerja Paylater & fintech, bedakan hutang produktif vs konsumtif, dan jaga skor kreditmu untuk masa depan.', levels: 1, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80' },
    { id: 3, title: 'Dasar Investasi & Wealth Building', category: 'Advanced', description: 'Kenali profil risikomu, mulai investasi dari instrumen aman, dan bangun kekayaan jangka panjang dengan strategi yang terbukti.', levels: 1, image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80' },
  ];
}

// Read real progress from localStorage (per-user)
function getClassProgress(userId, moduleId) {
  try {
    const raw = localStorage.getItem(`finlitgo_progress_${userId}_class_${moduleId}`);
    if (!raw) return 0;
    const completed = JSON.parse(raw);
    const levels = CLASS_LEVELS[moduleId];
    if (!levels) return 0;
    const totalItems = levels.reduce((sum, l) => sum + l.items.length, 0);
    return Math.round((completed.length / totalItems) * 100);
  } catch {
    return 0;
  }
}

export default function ClassPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const classes = getClasses();
  const streak = getCurrentStreak();

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

  // Get streak message
  const streakMessage = useMemo(() => {
    if (streak === 0) return 'Start your streak!';
    if (streak < 3) return 'Good start!';
    if (streak < 7) return 'Keep it up!';
    if (streak < 14) return 'On fire!';
    if (streak < 30) return 'Incredible streak!';
    return 'Legendary!';
  }, [streak]);

  return (
    <div className="relative min-h-screen text-white">

      {/* Hero Section */}
      <section className="relative z-10 w-full overflow-hidden bg-[#0a0a0a] px-6 py-24">
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

          {/* Streak Badge — only show when logged in */}
          {user && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 mt-8 bg-black/40 backdrop-blur-xl border border-violet-500/30 px-6 py-3 rounded-2xl"
            >
              <IconFlame size={24} className={`${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-zinc-600'}`} />
              <div className="text-left">
                <span className="text-xl font-bold font-orbitron text-white">{streak}</span>
                <span className="text-xs text-zinc-400 ml-2">Day Streak</span>
              </div>
              <span className="text-xs text-violet-300 font-mono ml-2">{streakMessage}</span>
            </motion.div>
          )}
        </div>
      </section>

      <div className="pointer-events-none relative z-10 -mt-14 h-20 bg-[linear-gradient(to_bottom,rgba(10,10,10,0)_0%,rgba(62,38,140,0.34)_52%,rgba(10,10,10,0)_100%)]" />

      {/* Category Filters */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-8 pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-3">
            <IconBook2 className="text-violet-400" /> Learning Paths
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
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
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((course, i) => {
              const progress = getClassProgress(userId, course.id);
              const meta = CLASS_META[course.id];
              const isCompleted = progress >= 100;
              const isLocked = loginRequiredIds.includes(course.id) && !user;

              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
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

                    {/* Difficulty Stars */}
                    {meta && (
                      <div className="absolute top-4 right-4 flex items-center gap-0.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-zinc-700/50">
                        {[1, 2, 3].map((star) => (
                          <IconStar
                            key={star}
                            size={10}
                            className={star <= meta.difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'}
                          />
                        ))}
                      </div>
                    )}

                    {/* Lock overlay */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-2">
                          <IconLock size={32} className="text-violet-300" />
                          <span className="text-xs font-medium text-violet-300">Login Required</span>
                        </div>
                      </div>
                    )}

                    {/* Completed Badge Overlay */}
                    {isCompleted && !isLocked && (
                      <div className="absolute bottom-3 right-3 bg-green-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 z-10">
                        <IconCheck size={12} /> Completed
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-violet-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{course.description}</p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono mb-4">
                      <span className="flex items-center gap-1"><IconBook2 size={12} /> 3 Level</span>
                      {meta && (
                        <span className="flex items-center gap-1"><IconClock size={12} /> {meta.totalTime}</span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-auto flex flex-col gap-2">
                      <div className="flex justify-between items-end text-sm">
                        <span className="text-zinc-400 font-medium">Progress</span>
                        {isCompleted ? (
                          <span className="text-green-400 flex items-center gap-1 font-medium"><IconCheck size={14}/> 100%</span>
                        ) : progress > 0 ? (
                          <span className="text-violet-300 font-mono font-bold">{progress}%</span>
                        ) : (
                          <span className="text-zinc-600 font-mono">0%</span>
                        )}
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                          className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-violet-600 to-purple-400'}`}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 flex items-center justify-end">
                      <span className="flex items-center gap-1 text-xs font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                        {isCompleted ? 'Review Materi' : progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                        <IconArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredClasses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 text-zinc-500"
          >
            <IconSearch size={48} className="mx-auto mb-4 text-zinc-600" />
            <p className="text-lg">No classes found. Try different filters or search terms.</p>
          </motion.div>
        )}
      </section>

      {!user && (
        <>
          {/* CTA Section */}
          <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
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
        </>
      )}
    </div>
  );
}
