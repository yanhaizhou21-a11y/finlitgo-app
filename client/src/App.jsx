import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 pt-[80px]">{children}</div>
      <Footer />
    </div>
  );
}

// Smart dashboard switch based on role
function DashboardSwitch() {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminOverview /> : <OverviewPage />;
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

        {/* Dashboard routes (protected, with sidebar) */}
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardSwitch />} />
          <Route path="dashboard/finance" element={<FinancialPage />} />
          <Route path="dashboard/history" element={<HistoryPage />} />
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