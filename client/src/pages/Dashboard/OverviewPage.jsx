import React from 'react';
import { motion } from 'framer-motion';
import { IconFlame, IconBook2, IconArticle, IconChevronRight } from '@tabler/icons-react';
import { getCurrentStreak, getWeeklyStreak } from '../../utils/streak';

export default function OverviewPage() {
  const streakCount = getCurrentStreak();
  const weeklyStreak = getWeeklyStreak();
  // Mock study progress data (would come from localStorage/backend)
  const myClasses = [
    { id: 1, title: 'Money Management Basics', category: 'Foundation', chapters: 12, completedChapters: 12, progress: 100 },
    { id: 2, title: 'Investing for Beginners', category: 'Growth', chapters: 8, completedChapters: 4, progress: 45 },
    { id: 3, title: 'Crypto & Digital Assets', category: 'Advanced', chapters: 10, completedChapters: 1, progress: 10 },
  ];

  const blogHistory = [
    { id: 1, title: 'How to Build an Emergency Fund in 6 Months', readDate: '2026-03-30', timeToRead: '4 min', category: 'Foundation' },
    { id: 2, title: 'Understanding Crypto: A Beginner\'s Guide', readDate: '2026-03-28', timeToRead: '8 min', category: 'Advanced' },
    { id: 3, title: 'The 50/30/20 Rule Explained', readDate: '2026-03-25', timeToRead: '5 min', category: 'Foundation' },
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
              className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-violet-500/30 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  cls.progress === 100 
                    ? 'bg-green-500/10 text-green-500 border-green-500/30' 
                    : 'bg-violet-500/10 text-violet-400 border-violet-500/30'
                }`}>
                  {cls.progress}%
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white group-hover:text-violet-300 transition-colors">{cls.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-zinc-500 font-mono">{cls.category}</span>
                    <span className="text-xs text-zinc-600">•</span>
                    <span className="text-xs text-zinc-500">{cls.completedChapters}/{cls.chapters} chapters</span>
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-40 hidden md:block">
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${cls.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-violet-600 to-purple-400'}`}
                    style={{ width: `${cls.progress}%` }}
                  />
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
