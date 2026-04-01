import React from 'react';
import { motion } from 'framer-motion';
import { IconSearch, IconBell } from '@tabler/icons-react';

export default function TopHeader({ title = "Dashboard" }) {
  return (
    <header className="flex flex-row items-center justify-between w-full h-20 px-8 border-b border-zinc-800 bg-[var(--color-primary-dark)] sticky top-0 z-40 shrink-0 shadow-sm relative overflow-hidden">
      <div className="flex-1 flex items-center justify-between z-10">
        <motion.h1 
          className="text-2xl font-bold font-orbitron text-white uppercase tracking-wider"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
      
        <div className="flex items-center gap-6">
          <div className="relative group">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-400 transition-colors pointer-events-none" size={20} />
            <input 
              type="text" 
              placeholder="Search something..." 
              className="w-64 h-10 bg-[#1A1A1A] border border-zinc-700 rounded-full pl-10 pr-4 text-sm text-white focus:outline-none focus:border-violet-500 transition-all focus:shadow-[0_0_15px_rgba(124,58,237,0.2)]"
            />
          </div>

          <button className="relative p-2 text-zinc-400 hover:text-white transition-colors group">
            <IconBell size={24} className="group-hover:scale-110 transition-transform" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-violet-500 border-2 border-[var(--color-primary-dark)] rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>
      
      {/* Background glow decoration */}
      <div className="absolute top-[-50px] right-[10%] w-[100px] h-[100px] bg-violet-500 opacity-5 blur-[50px] pointer-events-none rounded-full" />
    </header>
  );
}
