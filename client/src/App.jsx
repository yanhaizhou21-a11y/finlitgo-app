import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SmoothScroll from './components/common/SmoothScroll';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useAuth } from './store/AuthContext';
import { useTheme } from './store/ThemeContext';

// Lazy-loaded dashboard pages
const OverviewPage = lazy(() => import('./pages/Dashboard/OverviewPage'));
const AdminOverview = lazy(() => import('./pages/Dashboard/AdminOverview'));
const FinancialPage = lazy(() => import('./pages/Dashboard/FinancialPage'));
const HistoryPage = lazy(() => import('./pages/Dashboard/HistoryPage'));
const SettingsPage = lazy(() => import('./pages/Dashboard/SettingsPage'));
const ClassProgressPage = lazy(() => import('./pages/Dashboard/ClassProgressPage'));

// Lazy-loaded admin CRUD pages
const AdminClassCRUD = lazy(() => import('./pages/Dashboard/AdminClassCRUD'));
const AdminBlogCRUD = lazy(() => import('./pages/Dashboard/AdminBlogCRUD'));

// Lazy-loaded landing pages
const ClassPage = lazy(() => import('./pages/ClassPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

// Lazy-loaded detail pages
const ClassDetailPage = lazy(() => import('./pages/Class/ClassDetailPage'));
const BlogPostPage = lazy(() => import('./pages/Blog/BlogPostPage'));

// Lazy-loaded AI Assist
const AIAssistPage = lazy(() => import('./pages/AIAssistPage/Dashboard'));

// Layout for public pages
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Suspense fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a]">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function PublicLayout({ children }) {
  const { isDarkMode } = useTheme();
  const { pathname } = useLocation();
  /* Purple glow only on class list + blog — not on /class/:id (reader/quiz stays clean) */
  const useLearningGradient =
    pathname === '/class' || pathname.startsWith('/blog');
  const showFooter = !(pathname.startsWith('/class/') && pathname !== '/class');
  const navbarVariant = pathname.startsWith('/class/') ? 'learning' : 'default';
  const isClassDetail = /^\/class\/.+/.test(pathname);

  return (
    <div className="relative w-full min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      {useLearningGradient && isDarkMode && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#06070c_0%,#090b14_22%,#0a0a0a_52%,#0a0a0a_100%)]" />
        </div>
      )}
      {useLearningGradient && !isDarkMode && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff_0%,#f8f6ff_22%,#f3f0ff_52%,#ede8ff_84%,#e8e0ff_100%)]" />
        </div>
      )}
      {!isClassDetail && <Navbar variant={navbarVariant} />}
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
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </Router>
  );
}

export default App;