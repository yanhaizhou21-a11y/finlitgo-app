import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import BlogPage from './pages/BlogPage';
import AIAssistPage from './pages/AIAssistPage';

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/class" element={<ClassPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/ai-assist" element={<AIAssistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
  