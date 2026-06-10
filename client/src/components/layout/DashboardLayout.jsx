import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminSidebar from './AdminSidebar';
import TopHeader from './TopHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../store/AuthContext';
import gsap from 'gsap';

export default function DashboardLayout() {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const edgeTouchStartX = useRef(0);
  const edgeTouchStartY = useRef(0);
  const mainRef = useRef(null);

  // GSAP smooth scroll for the nested main container
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    let scrollTarget = el.scrollTop;
    let currentScroll = el.scrollTop;
    let rafId = null;

    const onWheel = (e) => {
      // Check if the event target is inside a scrollable child element
      let target = e.target;
      while (target && target !== el) {
        if (target.scrollHeight > target.clientHeight + 2) {
          // This element has its own scroll — let it handle the event naturally
          return;
        }
        target = target.parentElement;
      }

      e.preventDefault();
      const maxScroll = el.scrollHeight - el.clientHeight;
      scrollTarget = Math.max(0, Math.min(maxScroll, scrollTarget + e.deltaY));

      if (!rafId) {
        const animate = () => {
          currentScroll += (scrollTarget - currentScroll) * 0.12;

          if (Math.abs(scrollTarget - currentScroll) < 0.5) {
            currentScroll = scrollTarget;
            el.scrollTop = currentScroll;
            rafId = null;
            return;
          }

          el.scrollTop = currentScroll;
          rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);
      }
    };

    // Sync when content changes (route change, etc.)
    const observer = new MutationObserver(() => {
      scrollTarget = el.scrollTop;
      currentScroll = el.scrollTop;
    });
    observer.observe(el, { childList: true, subtree: true });

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    if (mainRef.current) {
      gsap.to(mainRef.current, {
        scrollTop: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [location.pathname]);

  // Swipe-right-from-left-edge to open sidebar
  const handleEdgeTouchStart = useCallback((e) => {
    edgeTouchStartX.current = e.touches[0].clientX;
    edgeTouchStartY.current = e.touches[0].clientY;
  }, []);

  const handleEdgeTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - edgeTouchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - edgeTouchStartY.current);
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
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <TopHeader
          title={getHeaderTitle()}
          onMenuToggle={() => setSidebarOpen(prev => !prev)}
        />
        <main
          ref={mainRef}
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
              className="w-full max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
