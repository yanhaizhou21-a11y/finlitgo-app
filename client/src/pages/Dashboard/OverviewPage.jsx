import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { IconFlame, IconBook2, IconArticle, IconChevronRight } from '@tabler/icons-react';
import { getCurrentStreak, getWeeklyStreak } from '../../utils/streak';
import { useAuth } from '../../store/AuthContext';
import { supabase } from '../../services/supabase';
import { CLASS_META, CLASS_LEVELS } from '../../data/classContent';


export default function OverviewPage() {
  const { user, profile } = useAuth();
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const streakCount = profile?.streak_count || 0;
  const points = profile?.points || 0;

  // Read real-time progress from localStorage
  const refreshProgress = async () => {
    const userId = user?.id || 'guest';
    
    // 1. Initial local data
    let localData = [1, 2, 3].map((id) => {
      const meta = CLASS_META[id];
      const levels = CLASS_LEVELS[id];
      const totalItems = levels.reduce((sum, l) => sum + l.items.length, 0);
      let completedCount = 0;
      try {
        const raw = localStorage.getItem(`finlitgo_progress_${userId}_class_${id}`);
        if (raw) completedCount = JSON.parse(raw).length;
      } catch {}
      const progress = Math.min(100, Math.round((completedCount / totalItems) * 100));
      return { id, title: meta.title, category: meta.category, totalItems, completedCount, progress };
    });

    setMyClasses(localData);

    // 2. Fetch real data from server if logged in
    if (user) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const res = await fetch('http://localhost:5000/api/classes', {
          headers: {
            'Authorization': `Bearer ${session?.access_token}`
          }
        });
        const json = await res.json();
        
        if (json.success && json.data.classes) {
          const apiClasses = json.data.classes.map(apiClass => {
            const meta = CLASS_META[apiClass.id] || { 
              title: apiClass.title, 
              category: apiClass.category, 
              description: apiClass.description 
            };
            
            // Take the higher of local vs api for migration
            const localCourse = localData.find(ld => ld.id === apiClass.id);
            const apiProgress = apiClass.progress || 0;
            const localProgress = localCourse?.progress || 0;
            const finalProgress = Math.min(100, Math.max(apiProgress, localProgress));
            
            // Calculate item counts based on final percentage
            const chaptersCount = apiClass.chapters_count || 1;
            const finalCompletedCount = Math.min(chaptersCount, Math.round((finalProgress / 100) * chaptersCount));

            return {
               ...meta,
               id: apiClass.id,
               progress: finalProgress,
               totalItems: chaptersCount,
               completedCount: finalCompletedCount
            };
          });
          setMyClasses(apiClasses);
        }
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
      }
    }
  };

  useEffect(() => {
    refreshProgress();
    const onStorage = (e) => {
      if (e.key && e.key.startsWith('finlitgo_progress_')) refreshProgress();
    };
    window.addEventListener('storage', onStorage);
    const interval = setInterval(refreshProgress, 10000);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, [user]);

  const blogHistory = [
    { id: 1, title: 'How to Build an Emergency Fund in 6 Months', readDate: '2026-04-06', timeToRead: '4 min', category: 'Foundation' },
  ];


  return (
    <div className="flex flex-col gap-6">
      {/* Header & Streak */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl text-zinc-400 font-medium">GOOD MORNING, LEARNER</h2>
          <p className="text-sm text-zinc-500">Track your learning progress and reading history.</p>
        </div>
        <div className="flex bg-[#1E1E1E] px-4 py-2 rounded-xl items-center gap-3 border border-zinc-800 shadow-lg">
          <IconFlame size={28} className="text-orange-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-lg font-bold font-orbitron">{streakCount}</span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Study Progress Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <IconBook2 className="text-violet-400" /> My Classes Progress
          </h3>
          <a href="/class" className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
            Browse Classes <IconChevronRight size={14} />
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {myClasses.map((cls, i) => (
            <motion.div 
              key={cls.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-violet-500/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              onClick={() => window.location.href = `/class/${cls.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-5 flex-1 z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm border transition-all duration-500 group-hover:scale-105 ${
                  cls.progress === 100 
                    ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : cls.progress > 0
                    ? 'bg-violet-500/10 text-violet-400 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                    : 'bg-zinc-800/50 text-zinc-500 border-zinc-700/50'
                }`}>
                  <span className="font-orbitron tracking-tighter">{cls.progress}%</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h4 className="font-bold text-white group-hover:text-violet-300 transition-colors truncate text-base">{cls.title}</h4>
                    {cls.progress === 100 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
                        COMPLETED
                      </span>
                    ) : cls.progress > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        LEARNING
                      </span>
                    ) : null}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[var(--color-accent-green)] font-mono uppercase tracking-widest opacity-80">{cls.category}</span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">
                      {cls.completedCount}/{cls.totalItems} Materi Selesai
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Sleek Progress bar */}
              <div className="w-full md:w-48 mt-4 md:mt-0 z-10">
                <div className="flex justify-between items-center mb-1.5 md:hidden">
                   <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Progress</span>
                   <span className="text-[10px] text-zinc-400 font-mono">{cls.progress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cls.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                      cls.progress === 100 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-400' 
                        : cls.progress > 0 
                        ? 'bg-gradient-to-r from-violet-600 to-purple-400'
                        : 'bg-zinc-700'
                    }`}
                  />
                </div>
                <div className="hidden md:flex justify-end mt-1.5">
                   <span className={`text-[9px] font-black uppercase tracking-widest ${cls.progress === 100 ? 'text-green-500/70' : 'text-zinc-600'}`}>
                     {cls.progress === 100 ? 'Verified Master' : 'In Progress'}
                   </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Blog Reading History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <IconArticle className="text-violet-400" /> Blog Reading History
          </h3>
          <a href="/blog" className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
            Browse Blog <IconChevronRight size={14} />
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {blogHistory.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-violet-500/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-violet-500/10 text-violet-400 rounded-lg flex items-center justify-center">
                  <IconArticle size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm group-hover:text-violet-300 transition-colors">{blog.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-zinc-500">{blog.readDate}</span>
                    <span className="text-xs text-zinc-600">•</span>
                    <span className="text-xs text-zinc-500">{blog.timeToRead}</span>
                    <span className="text-xs text-zinc-600">•</span>
                    <span className="text-xs text-violet-400/60 font-mono">{blog.category}</span>
                  </div>
                </div>
              </div>
              <IconChevronRight size={16} className="text-zinc-600 group-hover:text-violet-400 transition-colors" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
