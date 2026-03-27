import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import BlogPage from './pages/BlogPage';
import AIAssistPage from './pages/AIAssistPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PasswordRecovery from './pages/auth/PasswordRecovery';
import CreateNewPassword from './pages/auth/CreateNewPassword';
import VerifyIdentity from './pages/auth/VerifyIdentity';
import VerifyPhone from './pages/auth/VerifyPhone';

import PageTransition from './components/layout/PageTransition';

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/class" element={<ClassPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/ai-assist" element={<AIAssistPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          <Route path="/verify-identity" element={<VerifyIdentity />} />
          <Route path="/verify-phone" element={<VerifyPhone />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;
  