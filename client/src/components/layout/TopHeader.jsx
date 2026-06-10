import React from 'react';
import { motion } from 'framer-motion';
import { IconSearch, IconBell, IconMenu2 } from '@tabler/icons-react';

export default function TopHeader({ title = "Dashboard", onMenuToggle }) {
  return (
    <header className="flex flex-row items-center justify-between w-full h-16 md:h-20 px-4 md:px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[var(--color-primary-dark)] sticky top-0 z-40 shrink-0 shadow-sm relative overflow-hidden transition-colors duration-300">
      <div className="flex-1 flex items-center justify-between z-10">
        
        <div className="flex items-center gap-3">
          {/* Hamburger for mobile */}
          <button 
            onClick={onMenuToggle}
            className="md:hidden p-2 -ml-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            aria-label="Toggle sidebar"
          >
            <IconMenu2 size={22} />
          </button>

          <motion.h1 
            className="text-lg md:text-2xl font-bold font-orbitron text-zinc-900 dark:text-white uppercase tracking-wider truncate"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {title}
          </motion.h1>
        </div>
      
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative group hidden sm:block">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-400 transition-colors pointer-events-none" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-40 md:w-64 h-9 md:h-10 bg-zinc-100 dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-700 rounded-full pl-9 md:pl-10 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500 transition-all focus:shadow-[0_0_15px_rgba(124,58,237,0.2)]"
            />
          </div>

          <button className="relative p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group">
            <IconBell size={22} className="group-hover:scale-110 transition-transform" />
            <span className="absolute top-1 right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-violet-500 border-2 border-white dark:border-[var(--color-primary-dark)] rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>
      
      {/* Background glow decoration */}
      <div className="absolute top-[-50px] right-[10%] w-[100px] h-[100px] bg-violet-500 opacity-5 blur-[50px] pointer-events-none rounded-full" />
    </header>
  );
}
