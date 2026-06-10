import React, { useState, useRef, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminSidebar from './AdminSidebar';
import TopHeader from './TopHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../store/AuthContext';

export default function DashboardLayout() {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const edgeTouchStartX = useRef(0);
  const edgeTouchStartY = useRef(0);

  // Swipe-right-from-left-edge to open sidebar
  const handleEdgeTouchStart = useCallback((e) => {
    edgeTouchStartX.current = e.touches[0].clientX;
    edgeTouchStartY.current = e.touches[0].clientY;
  }, []);

  const handleEdgeTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - edgeTouchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - edgeTouchStartY.current);
    // Only trigger if started from left 30px, swiped right >60px, and mostly horizontal
    if (edgeTouchStartX.current <= 30 && dx > 60 && dy < 80) {
      setSidebarOpen(true);
    }
  }, []);

  const getHeaderTitle = () => {
    if (location.pathname.startsWith('/dashboard/manage-classes')) return 'Manage Classes';
    if (location.pathname.startsWith('/dashboard/manage-blog')) return 'Manage Blog';
    switch (location.pathname) {
      case '/dashboard': return isAdmin ? 'Admin Dashboard' : 'Dashboard Overview';
      case '/dashboard/finance': return 'Financial Dashboard';
      case '/dashboard/history': return 'History Transaction & Study';
      case '/dashboard/classes': return 'My Classes Progress';
      case '/dashboard/settings': return 'Pengaturan';
      default: return 'FinLitGo';
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-[#121212] text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden font-inter">
      {isAdmin
        ? <AdminSidebar />
        : <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      }
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          title={getHeaderTitle()}
          onMenuToggle={() => setSidebarOpen(prev => !prev)}
        />
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative"
          onTouchStart={handleEdgeTouchStart}
          onTouchEnd={handleEdgeTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full w-full max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
