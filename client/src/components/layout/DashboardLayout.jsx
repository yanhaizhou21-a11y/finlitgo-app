import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminSidebar from './AdminSidebar';
import TopHeader from './TopHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../store/AuthContext';

export default function DashboardLayout() {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const getHeaderTitle = () => {
    if (location.pathname.startsWith('/dashboard/manage-classes')) return 'Manage Classes';
    if (location.pathname.startsWith('/dashboard/manage-blog')) return 'Manage Blog';
    switch(location.pathname) {
      case '/dashboard': return isAdmin ? 'Admin Dashboard' : 'Dashboard Overview';
      case '/dashboard/finance': return 'Financial Dashboard';
      case '/dashboard/history': return 'History Transaction & Study';
      case '/dashboard/classes': return 'My Classes Progress';
      case '/dashboard/settings': return 'Pengaturan';
      default: return 'FinLitGo';
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden font-inter">
      {isAdmin ? <AdminSidebar /> : <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader title={getHeaderTitle()} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
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
