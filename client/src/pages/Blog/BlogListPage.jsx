import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function BlogListPage() {
  const navigate = useNavigate();
  
  const posts = [
    { id: 1, title: 'How to Build an Emergency Fund in 6 Months', excerpt: 'An emergency fund is a financial safety net designed to cover unexpected expenses...', author: 'Admin FinlitGo', date: 'Oct 12', timeToRead: '4 min read', category: 'Foundation', image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80' },
    { id: 2, title: 'Understanding Crypto: A Beginner\'s Guide', excerpt: 'Cryptocurrency has taken the financial world by storm, but what exactly is it?', author: 'Doctor Solking', date: 'Oct 10', timeToRead: '8 min read', category: 'Advanced', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80' },
    { id: 3, title: 'The 50/30/20 Rule Explained', excerpt: 'Budgeting doesn\'t have to be complicated. Learn how the 50/30/20 rule can simplify your finances.', author: 'Admin FinlitGo', date: 'Oct 05', timeToRead: '5 min read', category: 'Foundation', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80' },
    { id: 4, title: 'Why You Need to Start Investing Early', excerpt: 'Compound interest is the eighth wonder of the world. Find out why starting early is crucial.', author: 'Snickers', date: 'Sep 28', timeToRead: '6 min read', category: 'Growth', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80' }
  ];

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto py-8 font-inter">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold font-orbitron text-white mb-4"><span className="text-[var(--color-accent-green)]">FinLitGo</span> Knowledge Base</h1>
        <p className="text-zinc-400 max-w-2xl text-lg">Deep dives, guides, and insights to help you navigate the complex world of personal finance, tailored for the younger generation.</p>
      </div>

      {/* Featured Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate(`/blog/${posts[0].id}`)}
        className="group cursor-pointer bg-[#1A1A1A] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl hover:border-[var(--color-accent-green)] transition-all flex flex-col md:flex-row h-auto md:h-96 w-full"
      >
        <div className="w-full md:w-1/2 h-64 md:h-full overflow-hidden relative">
           <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
           <div className="absolute top-6 left-6 bg-[var(--color-accent-green)] text-black font-bold uppercase tracking-wider text-xs px-3 py-1 rounded-full border border-lime-400 shadow-lg">Featured</div>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
           <span className="text-[var(--color-accent-green)] font-mono text-sm uppercase mb-3">{posts[0].category}</span>
           <h2 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[var(--color-accent-green)] transition-colors">{posts[0].title}</h2>
           <p className="text-zinc-400 mb-8 line-clamp-3 text-lg">{posts[0].excerpt}</p>
           
           <div className="flex items-center justify-between mt-auto">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 p-1 flex items-center justify-center">
                 <img src="https://i.pravatar.cc/150?u=admin" className="rounded-full w-full h-full" alt="Author" />
               </div>
               <div className="flex flex-col">
                 <span className="text-sm text-white font-medium">{posts[0].author}</span>
                 <span className="text-xs text-zinc-500">{posts[0].date} · {posts[0].timeToRead}</span>
               </div>
             </div>
             <button className="text-[var(--color-accent-green)] bg-zinc-900 border border-zinc-700 p-3 rounded-full group-hover:bg-[var(--color-accent-green)] group-hover:text-black transition-all">
               <IconArrowRight size={20} />
             </button>
           </div>
        </div>
      </motion.div>

      {/* Recent Posts Grid */}
      <div>
        <h3 className="text-2xl font-bold font-orbitron mb-8 border-b border-zinc-800 pb-4">Recent Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="bg-[#1A1A1A] border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full"
            >
              <div className="w-full h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[var(--color-accent-green)] font-mono tracking-widest text-[10px] uppercase mb-2 block">{post.category}</span>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-accent-green)] transition-colors leading-tight">{post.title}</h4>
                <p className="text-zinc-500 text-sm line-clamp-2 mb-6">{post.excerpt}</p>
                
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${post.author}`} className="w-full h-full object-cover" alt="Author" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-300 font-medium">{post.author}</span>
                    <span className="text-[10px] text-zinc-600 font-mono">{post.date} · {post.timeToRead}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
