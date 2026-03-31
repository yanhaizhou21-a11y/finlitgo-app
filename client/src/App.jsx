import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SmoothScroll from './components/common/SmoothScroll';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Dashboard pages
import OverviewPage from './pages/Dashboard/OverviewPage';
import FinancialPage from './pages/Dashboard/FinancialPage';
import HistoryPage from './pages/Dashboard/HistoryPage';
import SettingsPage from './pages/Dashboard/SettingsPage';

// Class pages
import ClassListPage from './pages/Class/ClassListPage';
import ClassDetailPage from './pages/Class/ClassDetailPage';

// Blog pages
import BlogListPage from './pages/Blog/BlogListPage';
import BlogPostPage from './pages/Blog/BlogPostPage';

// AI Assist
import AIAssistPage from './pages/AIAssistPage/Dashboard';

function App() {
  return (
    <Router>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Nested standard Dashboard routes */}
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<OverviewPage />} />
          <Route path="dashboard/finance" element={<FinancialPage />} />
          <Route path="dashboard/history" element={<HistoryPage />} />
          <Route path="dashboard/settings" element={<SettingsPage />} />
          
          <Route path="admin" element={
            <ProtectedRoute requireAdmin={true}>
              {/* Admins see the identical dashboard component but populated with org-level info down the line */}
              <OverviewPage /> 
            </ProtectedRoute>
          } />

          <Route path="class" element={<ClassListPage />} />
          <Route path="class/:moduleId" element={<ClassDetailPage />} />
          
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:postId" element={<BlogPostPage />} />

          <Route path="ai-assist" element={<AIAssistPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
  