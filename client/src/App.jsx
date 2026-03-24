import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import BlogPage from './pages/BlogPage';
import AIAssistPage from './pages/AIAssistPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/class" element={<ClassPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/ai-assist" element={<AIAssistPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
  