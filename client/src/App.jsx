import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import BlogPage from './pages/BlogPage';
import AIAssistPage from './pages/AIAssistPage';

function App() {
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
  