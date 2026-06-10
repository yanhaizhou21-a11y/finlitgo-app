import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconLayoutDashboard,
  IconChartBar,
  IconHistory,
  IconSettings,
  IconLogout,
  IconX
} from '@tabler/icons-react';
import logoUrl from '../../assets/logo.svg';
import { useAuth } from '../../store/AuthContext';

const AnimatedNavItem = ({ to, icon: Icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl mb-4 transition-all duration-300 group ${isActive
          ? 'bg-gradient-to-br from-violet-600 to-purple-400 text-white shadow-lg shadow-violet-500/30'
          : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`
      }
      title={label}
    >
      <Icon size={24} stroke={1.5} />
      {/* Tooltip */}
      <span className="absolute left-16 px-2 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {label}
      </span>
    </NavLink>
  );
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isDragging = useRef(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isOpen && onClose) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Touch swipe to close
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchCurrentX.current;
    // Swipe left to close
    if (diff > 60 && onClose) {
      onClose();
    }
  }, [onClose]);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const photoURL = profile?.avatar_url || profile?.photoUrl || user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || user?.email || 'User')}&background=random`;

  const sidebarContent = (
    <>
      {/* Logo → Landing Page */}
      <div
        className="mb-10 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-violet-500/30 cursor-pointer hover:border-violet-400 transition-colors hover:shadow-[0_0_12px_rgba(124,58,237,0.3)]"
        onClick={() => navigate('/')}
        title="Go to Home"
      >
        <img src={logoUrl} alt="FinLitGo" className="w-10 h-10 object-contain" />
      </div>

      <nav className="flex-1 flex flex-col items-center gap-2 w-full">
        <AnimatedNavItem to="/dashboard" icon={IconLayoutDashboard} label="Dashboard" onClick={onClose} />
        <AnimatedNavItem to="/dashboard/finance" icon={IconChartBar} label="Financial" onClick={onClose} />
        <AnimatedNavItem to="/dashboard/history" icon={IconHistory} label="History" onClick={onClose} />
      </nav>

      <div className="mt-auto w-full flex flex-col items-center gap-2">
        <AnimatedNavItem to="/dashboard/settings" icon={IconSettings} label="Settings" onClick={onClose} />

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group"
        >
          <IconLogout size={22} stroke={1.5} />
          <span className="absolute left-16 px-2 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Logout
          </span>
        </button>

        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden hover:border-violet-400 transition-colors mt-1 group cursor-pointer" onClick={() => { navigate('/dashboard/settings'); onClose?.(); }}>
          <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar — always visible on md+ */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="hidden md:flex w-20 h-screen bg-white dark:bg-[var(--color-primary-dark)] flex-col items-center py-6 border-r border-zinc-200 dark:border-zinc-800 shrink-0 transition-colors duration-300 z-50"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
              onClick={onClose}
            />
            {/* Drawer */}
            <motion.aside
              ref={sidebarRef}
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="fixed top-0 left-0 h-full w-20 bg-white dark:bg-[var(--color-primary-dark)] flex flex-col items-center py-6 border-r border-zinc-200 dark:border-zinc-800 z-[70] md:hidden shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-[-36px] w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white shadow-md transition-colors z-50"
              >
                <IconX size={16} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
