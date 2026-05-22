import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SmoothScroll from './components/common/SmoothScroll';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useAuth } from './store/AuthContext';

// Dashboard pages
import OverviewPage from './pages/Dashboard/OverviewPage';
import AdminOverview from './pages/Dashboard/AdminOverview';
import FinancialPage from './pages/Dashboard/FinancialPage';
import HistoryPage from './pages/Dashboard/HistoryPage';
import SettingsPage from './pages/Dashboard/SettingsPage';
import ClassProgressPage from './pages/Dashboard/ClassProgressPage';

// Admin CRUD pages
import AdminClassCRUD from './pages/Dashboard/AdminClassCRUD';
import AdminBlogCRUD from './pages/Dashboard/AdminBlogCRUD';

// Landing pages (public, with Navbar)
import ClassPage from './pages/ClassPage';
import BlogPage from './pages/BlogPage';

// Detail pages
import ClassDetailPage from './pages/Class/ClassDetailPage';
import BlogPostPage from './pages/Blog/BlogPostPage';

// AI Assist landing
import AIAssistPage from './pages/AIAssistPage/Dashboard';

// Layout for public pages
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function PublicLayout({ children }) {
  const { pathname } = useLocation();
  /* Purple glow only on class list + blog — not on /class/:id (reader/quiz stays clean) */
  const useLearningGradient =
    pathname === '/class' || pathname.startsWith('/blog');
  const showFooter = !(pathname.startsWith('/class/') && pathname !== '/class') && pathname !== '/blog';
  const navbarVariant = pathname.startsWith('/class/') ? 'learning' : 'default';
  const isClassDetail = /^\/class\/.+/.test(pathname);

  // Auto-hide navbar on class detail pages
  const [navVisible, setNavVisible] = useState(true);
  const hideTimer = useRef(null);

  const resetHideTimer = useCallback(() => {
    setNavVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (isClassDetail) {
      hideTimer.current = setTimeout(() => setNavVisible(false), 3000);
    }
  }, [isClassDetail]);

  useEffect(() => {
    if (!isClassDetail) { setNavVisible(true); return; }
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [isClassDetail, resetHideTimer]);

  // Show navbar when mouse enters top area
  const handleMouseMove = useCallback((e) => {
    if (!isClassDetail) return;
    if (e.clientY < 80) {
      setNavVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    } else {
      resetHideTimer();
    }
  }, [isClassDetail, resetHideTimer]);

  useEffect(() => {
    if (!isClassDetail) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClassDetail, handleMouseMove]);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {useLearningGradient && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#06070c_0%,#090b14_22%,#0a0a0a_52%,#0a0a0a_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(95,56,220,0.62)_0%,rgba(47,30,112,0.36)_20%,rgba(10,10,10,0)_48%)]" />
          <div className="absolute bottom-[-280px] left-1/2 h-[740px] w-[1650px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,72,255,0.9)_0%,rgba(124,72,255,0.5)_38%,rgba(12,10,24,0)_78%)] blur-3xl" />
          <div className="absolute bottom-[-90px] left-1/2 h-[260px] w-[1180px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,175,255,0.34)_0%,rgba(200,175,255,0)_72%)] blur-2xl" />
        </div>
      )}
      <div
        className="transition-all duration-300"
        style={{
          transform: isClassDetail && !navVisible ? 'translateY(-100%)' : 'translateY(0)',
          opacity: isClassDetail && !navVisible ? 0 : 1,
          position: isClassDetail ? 'fixed' : 'relative',
          top: 0, left: 0, right: 0, zIndex: 50,
        }}
        onMouseEnter={() => isClassDetail && setNavVisible(true)}
      >
        <Navbar variant={navbarVariant} />
      </div>
      {isClassDetail && <div className="h-16" />}
      <div className="">{children}</div>
      {showFooter && (
        <div className="relative">
          <Footer />
        </div>
      )}
    </div>
  );
}

// Smart dashboard switch based on role
function DashboardSwitch() {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminOverview /> : <OverviewPage />;
}

// Wrapper that checks profile completeness for dashboard routes
function ProfileGuard({ children }) {
  const { user, profileComplete, loading, isAdmin } = useAuth();

  if (loading) return null;

  // If user is logged in but profile not complete, redirect to complete profile
  if (user && !profileComplete && !isAdmin) {
    return <Navigate to="/register?view=complete" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Public landing pages with Navbar + Footer */}
        <Route path="/class" element={<PublicLayout><ClassPage /></PublicLayout>} />
        <Route path="/class/:moduleId" element={<PublicLayout><ClassDetailPage /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
        <Route path="/blog/:postId" element={<PublicLayout><BlogPostPage /></PublicLayout>} />
        <Route path="/ai-assist" element={<PublicLayout><AIAssistPage /></PublicLayout>} />

        {/* Dashboard routes (protected, with sidebar, profile must be complete) */}
        <Route path="/" element={<ProtectedRoute><ProfileGuard><DashboardLayout /></ProfileGuard></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardSwitch />} />
          <Route path="dashboard/finance" element={<FinancialPage />} />
          <Route path="dashboard/history" element={<HistoryPage />} />
          <Route path="dashboard/classes" element={<ClassProgressPage />} />
          <Route path="dashboard/settings" element={<SettingsPage />} />
          
          {/* Admin-only CRUD routes */}
          <Route path="dashboard/manage-classes" element={
            <ProtectedRoute requireAdmin={true}><AdminClassCRUD /></ProtectedRoute>
          } />
          <Route path="dashboard/manage-blog" element={
            <ProtectedRoute requireAdmin={true}><AdminBlogCRUD /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;