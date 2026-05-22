import React from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from '../../store/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-zinc-800 dark:text-white border border-zinc-300 dark:border-white/20 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm dark:shadow-none"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? <IconSun className="w-5 h-5 text-amber-400" /> : <IconMoon className="w-5 h-5 text-indigo-600" />}
    </button>
  );
}
