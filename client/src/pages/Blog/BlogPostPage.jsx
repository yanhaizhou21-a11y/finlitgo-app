import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconBrandTwitter, IconBrandLinkedin, IconLink } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

function getBlogData(postId) {
  const STORAGE_KEY = 'finlitgo_blogs';
  const saved = localStorage.getItem(STORAGE_KEY);
  const blogs = saved ? JSON.parse(saved) : [];
  return blogs.find(b => String(b.id) === String(postId));
}

export default function BlogPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const blogData = getBlogData(postId);

  // Fallback
  const post = blogData || {
    title: 'How to Build an Emergency Fund in 6 Months',
    author: 'Admin FinlitGo',
    date: 'Oct 12, 2026',
    timeToRead: '4 min read',
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1600&q=80',
    content: `An emergency fund is a financial safety net designed to cover unexpected expenses such as medical bills, urgent car repairs, or sudden job loss.\n\n### Why is an Emergency Fund Critical?\nLife is unpredictable. Having liquid cash readily available gives you peace of mind.\n\n### Step 1: Set a Realistic Goal\nStart small. Aim for one month of essential expenses.\n\n### Step 2: Automate Your Savings\nSet up an automatic transfer from your checking to a dedicated high-yield savings account.\n\n### Step 3: Trim the Fat\nReview your last three months of bank statements.`
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 font-inter relative">
      {/* Navigation */}
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-zinc-400 hover:text-violet-400 transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
      >
        <div className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
          <IconArrowLeft size={20} />
        </div>
        <span className="hidden md:inline">Back to Blog</span>
      </button>

      {/* Header Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-white leading-tight mb-8">{post.title}</h1>
        
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-800">
              <img src={`https://i.pravatar.cc/150?u=${post.author}`} className="w-full h-full object-cover" alt="Author" />
            </div>
            <div className="text-left font-sans">
              <div className="text-white font-medium">{post.author}</div>
              <div className="text-zinc-500 text-sm">{post.date} · {post.timeToRead}</div>
            </div>
          </div>
          
          <div className="h-8 w-px bg-zinc-800 hidden md:block"></div>
          
          <div className="hidden md:flex items-center gap-4 text-zinc-500">
            <IconBrandTwitter className="hover:text-blue-400 cursor-pointer transition-colors" />
            <IconBrandLinkedin className="hover:text-blue-600 cursor-pointer transition-colors" />
            <IconLink className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Cover Image */}
      {post.image && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-64 md:h-[400px] bg-zinc-900 rounded-3xl overflow-hidden mb-12 shadow-2xl border border-zinc-800">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80" />
        </motion.div>
      )}

      {/* Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="px-4 md:px-12">
        <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-sans leading-relaxed">
          {(post.content || '').split('\n').map((paragraph, idx) => {
            const cleaned = paragraph.trim();
            if (!cleaned) return null;
            
            if (cleaned.startsWith('### ')) {
              return <h3 key={idx} className="text-2xl font-bold font-orbitron text-white mt-10 mb-4">{cleaned.replace('### ', '')}</h3>;
            }
            
            return <p key={idx} className="mb-6 selection:bg-violet-500 selection:text-white">{cleaned}</p>;
          })}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-full h-px bg-zinc-800 my-16"></div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-[#1A1A2E] via-[#2D1B69] to-[#1A1A2E] rounded-3xl p-8 border border-violet-500/20 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-600/20 rounded-full blur-[60px] pointer-events-none" />
        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ready to start building?</h3>
        <p className="text-zinc-400 mb-6 relative z-10">Head over to your Financial Dashboard to set up your goals now.</p>
        <button 
          onClick={() => navigate('/dashboard/finance')}
          className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all relative z-10"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
