import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { getCurrentStreak } from '../../utils/streak';
import { CLASS_META, CLASS_LEVELS } from '../../data/classContent';
import { fetchClasses as fetchClassesFromDb } from '../../services/classService';
import {
  IconFlame,
  IconBook2,
  IconSearch,
  IconStar,
  IconClock,
  IconChevronRight,
  IconArrowRight,
} from '@tabler/icons-react';

function getStaticClassesFallback() {
  return [
    {
      id: 1, title: 'THE FINANCIAL BLUEPRINT', category: 'Foundation', description: 'Dari Mindset, Alokasi, hingga Proteksi. Bangun fondasi keuangan yang mustahil runtuh..', chapters: 12, youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://i.pinimg.com/736x/73/2f/cd/732fcd0132b3818c03c01c1d4fb99589.jpg', quizzes: [
        { question: 'What percentage of income should go to Needs in the 50/30/20 rule?', options: ['20%', '30%', '50%', '10%'], correctAnswer: 2 },
        { question: 'Which is considered a "Want"?', options: ['Rent', 'Groceries', 'Dining Out', 'Electricity'], correctAnswer: 2 }
      ]
    },
    { id: 2, title: 'Investing for Beginners', category: 'Growth', description: 'Start your investment journey with confidence.', chapters: 8, youtubeUrl: 'https://www.youtube.com/watch?v=PHe0bXAIuk0', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80', quizzes: [] },
    { id: 3, title: 'Crypto & Digital Assets', category: 'Advanced', description: 'Understand the world of cryptocurrency and blockchain.', chapters: 10, youtubeUrl: '', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80', quizzes: [] },
  ];
}

export default function ClassPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const streak = profile?.streak_count || 0;

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchClassesFromDb();
      if (data?.length) {
        // Sort classes to ensure correct order
        data.sort((a, b) => a.id - b.id);
      }
      setClasses(data?.length ? data : getStaticClassesFallback());
    } catch (e) {
      console.error('Failed to fetch classes:', e);
      setClasses(getStaticClassesFallback());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const categoryFilters = useMemo(() => {
    const fromDb = [...new Set(classes.map((c) => String(c.category || '').trim()).filter(Boolean))];
    return ['All', ...fromDb.sort((a, b) => a.localeCompare(b))];
  }, [classes]);

  useEffect(() => {
    if (activeFilter !== 'All' && !categoryFilters.includes(activeFilter)) {
      setActiveFilter('All');
    }
  }, [categoryFilters, activeFilter]);

  const handleClassClick = (course) => {
    if (!user) {
      navigate(`/register?redirect=/class/${course.id}`);
      return;
    }
    navigate(`/class/${course.id}`);
  };

  const filteredClasses = classes.filter(cls => {
    const cat = String(cls.category || '').trim().toLowerCase();
    const matchFilter =
      activeFilter === 'All' || cat === activeFilter.toLowerCase();
    const matchSearch = cls.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const chapterLabel = (course) => {
    const n = course.class_chapters?.length ?? course.chapters;
    if (typeof n === 'number' && n >= 0) return `${n} bab`;
    try {
      if (course.levels_data) {
        const lv = typeof course.levels_data === 'string' ? JSON.parse(course.levels_data) : course.levels_data;
        const items = Array.isArray(lv) ? lv.reduce((acc, L) => acc + (L.items?.length || 0), 0) : 0;
        if (items) return `${items} materi`;
      }
    } catch { /* ignore */ }
    return 'Modul';
  };

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
    <div className="relative min-h-screen text-zinc-900 dark:text-white">

      {/* Hero Section */}
      <section className="relative z-10 w-full overflow-hidden bg-white/60 dark:bg-[#0a0a0a] px-6 py-24">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-violet-600 dark:text-violet-300 font-mono text-sm uppercase tracking-[0.3em] block mb-4">FinLitGo Learning</span>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-zinc-900 dark:text-white mb-6 leading-tight">
              Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">Financial</span> Future
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
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
              className="w-full bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-zinc-200 dark:border-white/20 rounded-2xl py-4 px-12 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all text-lg"
            />
          </motion.div>

          {/* Streak Badge — only show when logged in */}
          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 mt-8 bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-violet-500/30 px-6 py-3 rounded-2xl"
            >
              <IconFlame size={24} className={`${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-zinc-600'}`} />
              <div className="text-left">
                <span className="text-xl font-bold font-orbitron text-zinc-900 dark:text-white">{streak}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">Day Streak</span>
              </div>
              <span className="text-xs text-violet-300 font-mono ml-2">{streakMessage}</span>
            </motion.div>
          )}
        </div>
      </section>

      <div className="pointer-events-none relative z-10 -mt-14 h-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(139,92,246,0.15)_52%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(to_bottom,rgba(10,10,10,0)_0%,rgba(62,38,140,0.34)_52%,rgba(10,10,10,0)_100%)]" />

      {/* Category Filters */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-8 pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold font-orbitron text-zinc-900 dark:text-white flex items-center gap-3">
            <IconBook2 className="text-violet-400" /> Learning Paths
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryFilters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeFilter === f
                    ? 'bg-gradient-to-r from-violet-600 to-purple-400 text-white shadow-[0_4px_15px_rgba(124,58,237,0.3)]'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">            {filteredClasses.map((course, i) => {
            const image = course.thumbnail_url || course.image;
            const meta = CLASS_META?.[course.id] || null;

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
                className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/40 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-violet-500/10 flex flex-col"
              >
                {/* Image */}
                <div className="h-48 w-full relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  {image ? (
                    <img src={image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90" />
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
                </div>


                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{course.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono mb-4">
                    <span className="flex items-center gap-1"><IconBook2 size={12} /> {chapterLabel(course)}</span>
                    {meta && (
                      <span className="flex items-center gap-1"><IconClock size={12} /> {meta.totalTime}</span>
                    )}
                  </div>


                  {/* CTA */}
                  <div className="mt-auto flex items-center justify-end">
                    <span className="flex items-center gap-1 text-xs font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                      Mulai Belajar
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
            <div className="bg-gradient-to-br from-violet-50 via-purple-100 to-violet-50 dark:from-[#1A1A2E] dark:via-[#2D1B69] dark:to-[#1A1A2E] border border-violet-200 dark:border-violet-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold font-orbitron text-zinc-900 dark:text-white mb-4">Ready to Level Up?</h2>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-8">Sign up now and start your financial literacy journey. Track your progress, earn streaks, and master your money.</p>
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
