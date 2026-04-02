import React from 'react';
import { motion } from 'framer-motion';
import { IconFlame, IconBook2, IconLock, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function ClassListPage() {
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: 'Money Management Basics', category: 'Foundation', chapters: 12, progress: 100, locked: false, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80' },
    { id: 2, title: 'Investing for Beginners', category: 'Growth', chapters: 8, progress: 45, locked: false, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80' },
    { id: 3, title: 'Crypto & Digital Assets', category: 'Advanced', chapters: 10, progress: 0, locked: true, image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80' },
    { id: 4, title: 'Real Estate 101', category: 'Advanced', chapters: 5, progress: 0, locked: true, image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80' },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header & Streak */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-[#1A1A1A] p-8 border border-zinc-800 rounded-3xl relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--color-accent-green)]/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="z-10">
          <span className="text-[var(--color-accent-green)] font-mono text-sm uppercase tracking-widest block mb-2">FinLitGo Learning</span>
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-white">Master Your Finances</h2>
          <p className="text-zinc-400 mt-2 max-w-lg leading-relaxed">Level up your financial literacy with bite-sized literature and interactive quizzes. Keep your streak alive to earn rewards.</p>
        </div>

        {/* Streak Tracker (TikTok Style) */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-zinc-900 border border-[var(--color-accent-green)]/30 p-4 rounded-2xl flex items-center gap-4 z-10 shadow-[0_0_20px_rgba(202,255,51,0.1)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-green)]/20 to-transparent w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="w-14 h-14 bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] rounded-full flex justify-center items-center border-2 border-[var(--color-accent-green)] flex-shrink-0 animate-pulse">
             <IconFlame size={28} />
          </div>
          <div>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold font-orbitron text-white leading-none">32</span>
              <span className="text-sm text-zinc-400 mb-1">Days</span>
            </div>
            <p className="text-xs text-[var(--color-accent-green)] font-mono uppercase tracking-wider mt-1">Excellent Streak!</p>
          </div>
        </motion.div>
      </div>

      {/* Course Grid (Dicoding Style) */}
      <div className="mt-4">
         <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <IconBook2 className="text-[var(--color-accent-green)]"/> Learning Paths
           </h3>
           <div className="flex gap-2 text-sm text-zinc-400 font-medium">
             <button className="text-white bg-zinc-800 px-4 py-1.5 rounded-full">All</button>
             <button className="hover:text-white px-4 py-1.5 transition-colors">Foundation</button>
             <button className="hover:text-white px-4 py-1.5 transition-colors">Advanced</button>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {courses.map((course, i) => (
             <motion.div
               key={course.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               onClick={() => course.locked ? navigate('/register') : navigate(`/class/${course.id}`)}
               className={`bg-[#1A1A1A] border ${course.locked ? 'border-zinc-800/50 opacity-70 cursor-pointer' : 'border-zinc-800 hover:border-[var(--color-accent-green)] cursor-pointer group hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-[var(--color-accent-green)]/10'} rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-[380px]`}
             >
                <div className="h-40 w-full relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60" />
                  
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-[var(--color-accent-green)] border border-[var(--color-accent-green)]/30">
                    {course.category}
                  </div>

                  {course.locked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
                        <IconLock />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[var(--color-accent-green)] transition-colors">{course.title}</h4>
                  <p className="text-sm text-zinc-500 mb-6 font-mono">{course.chapters} Chapters</p>
                  
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex justify-between items-end text-sm">
                      <span className="text-zinc-400 font-medium">Progress</span>
                      {course.progress === 100 ? (
                        <span className="text-green-500 flex items-center gap-1"><IconCheck size={16}/> Completed</span>
                      ) : (
                        <span className="text-white font-mono">{course.progress}%</span>
                      )}
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-accent-green)]" style={{ width: `${course.locked ? 0 : course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
             </motion.div>
           ))}
         </div>
      </div>
    </div>
  );
}
