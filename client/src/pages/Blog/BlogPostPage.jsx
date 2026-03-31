import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconBrandTwitter, IconBrandLinkedin, IconLink } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function BlogPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Mock
  const post = {
    title: 'How to Build an Emergency Fund in 6 Months',
    author: 'Admin FinlitGo',
    date: 'Oct 12, 2026',
    timeToRead: '4 min read',
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1600&q=80',
    content: `
      An emergency fund is a financial safety net designed to cover unexpected expenses such as medical bills, urgent car repairs, or sudden job loss. Without one, even a minor hiccup can lead to high-interest debt that derails your long-term goals.

      ### Why is an Emergency Fund Critical?
      Life is unpredictable. Relying on credit cards for emergencies forces you to pay interest on top of the actual expense, effectively making the emergency more expensive. Having liquid cash readily available gives you peace of mind and prevents panic-driven financial decisions.

      ### Step 1: Set a Realistic Goal
      Start small. Aim for one month of essential expenses. "Essential" means housing, food, and utilities—ignore dining out and entertainment for this calculation. Your ultimate goal should be 3 to 6 months of living expenses.
      
      ### Step 2: Automate Your Savings
      The best way to save is to pretend the money never hit your account. Set up an automatic transfer from your checking to a dedicated high-yield savings account (HYSA) every payday.
      
      ### Step 3: Trim the Fat
      Review your last three months of bank statements. Cancel unused subscriptions, cook at home more often, and redirect those funds directly to your emergency goal.
      
      Remember, an emergency fund isn't an investment meant to generate high returns; it's insurance against the unexpected.
    `
  };

  return (
    <div className="max-w-4xl mx-auto py-8 font-inter relative">
      {/* Navigation */}
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-zinc-400 hover:text-[var(--color-accent-green)] transition-colors mb-8 font-mono text-xs uppercase tracking-widest absolute top-0 left-[-40px] md:left-[-120px] 2xl:left-[-200px]"
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
               <img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full object-cover" alt="Author" />
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
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-64 md:h-[400px] bg-zinc-900 rounded-3xl overflow-hidden mb-12 shadow-2xl border border-zinc-800">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80" />
      </motion.div>

      {/* Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="px-4 md:px-12">
        <div className="prose prose-invert prose-green prose-lg max-w-none text-zinc-300 font-sans leading-relaxed">
           {/* Rendering simple markdown-like syntax manually since we don't have a library like ReactMarkdown installed */}
           {post.content.split('\n').map((paragraph, idx) => {
             const cleaned = paragraph.trim();
             if (!cleaned) return null;
             
             if (cleaned.startsWith('### ')) {
               return <h3 key={idx} className="text-2xl font-bold font-orbitron text-white mt-10 mb-4">{cleaned.replace('### ', '')}</h3>;
             }
             
             return <p key={idx} className="mb-6 selection:bg-[var(--color-accent-green)] selection:text-black">{cleaned}</p>;
           })}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-full h-px bg-zinc-800 my-16"></div>

      {/* Bottom CTA */}
      <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-zinc-800 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to start building?</h3>
        <p className="text-zinc-400 mb-6">Head over to your Financial Dashboard to set up your Emergency Fund goal now.</p>
        <button className="px-8 py-3 bg-[var(--color-accent-green)] text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-lime-400 transition-all shadow-[0_4px_14px_0_rgba(202,255,51,0.2)]">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
