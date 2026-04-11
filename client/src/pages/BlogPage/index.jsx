import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight, IconSearch, IconClock, IconBookmark } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = "finlitgo_blogs";

function getBlogs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);

  return [
    {
      id: 1,
      title: "How to Build an Emergency Fund in 6 Months",
      excerpt: "An emergency fund is a financial safety net designed to cover unexpected expenses. Learn how to build one in just 6 months with these simple steps.",
      content: `
        <p>An emergency fund is a financial safety net designed to cover unexpected expenses such as medical bills, car repairs, or job loss. Building one might seem daunting, but with a solid plan, you can achieve it in just 6 months.</p>
        
        <h2>Why You Need an Emergency Fund</h2>
        <p>Life is unpredictable. Without savings, unexpected costs can derail your finances and push you into debt. An emergency fund gives you peace of mind and financial stability.</p>
        
        <h2>Step-by-Step Plan</h2>
        <p><strong>Month 1-2:</strong> Save $1,000 as a starter fund. Cut unnecessary expenses like dining out and subscriptions.</p>
        <p><strong>Month 3-4:</strong> Build up to 3 months of expenses. Consider a side hustle or overtime work.</p>
        <p><strong>Month 5-6:</strong> Reach your goal of 6 months of expenses. Automate your savings to stay consistent.</p>
        
        <h2>Where to Keep Your Fund</h2>
        <p>Keep your emergency fund in a high-yield savings account that's separate from your daily checking account. This makes it accessible but not too easy to spend.</p>
        
        <h2>Final Tips</h2>
        <ul>
          <li>Start small - even $20 per week adds up</li>
          <li>Celebrate milestones to stay motivated</li>
          <li>Replenish the fund if you ever need to use it</li>
        </ul>
      `,
      author: "Admin FinlitGo",
      date: "Oct 12",
      timeToRead: "4 min read",
      category: "Foundation",
      image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80",
    },
    {
      id: 2,
      title: "Understanding Crypto: A Beginner's Guide",
      excerpt: "Cryptocurrency has taken the financial world by storm. This beginner's guide will help you understand the basics of blockchain and digital assets.",
      content: `
        <p>Cryptocurrency has taken the financial world by storm, but what exactly is it? Simply put, cryptocurrency is digital or virtual currency that uses cryptography for security.</p>
        
        <h2>What is Blockchain?</h2>
        <p>Blockchain is the technology behind cryptocurrencies. It's a decentralized ledger that records transactions across many computers.</p>
        
        <h2>Popular Cryptocurrencies</h2>
        <ul>
          <li><strong>Bitcoin (BTC)</strong> - The first and most well-known cryptocurrency</li>
          <li><strong>Ethereum (ETH)</strong> - Known for smart contracts</li>
          <li><strong>Cardano (ADA)</strong> - Focuses on sustainability and scalability</li>
        </ul>
        
        <h2>Getting Started</h2>
        <p>To start investing in crypto, you'll need to choose a reputable exchange, verify your identity, and start with small amounts.</p>
      `,
      author: "Doctor Solking",
      date: "Oct 10",
      timeToRead: "8 min read",
      category: "Advanced",
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
    },
    {
      id: 3,
      title: "The 50/30/20 Rule Explained",
      excerpt: "Budgeting doesn't have to be complicated. Learn how the 50/30/20 rule can simplify your finances and help you achieve your financial goals.",
      content: "<p>The 50/30/20 rule is a simple budgeting method that divides your after-tax income into three categories.</p><h2>The Breakdown</h2><ul><li><strong>50% for Needs</strong> - Rent, utilities, groceries</li><li><strong>30% for Wants</strong> - Entertainment, dining out, hobbies</li><li><strong>20% for Savings</strong> - Emergency fund, investments, debt repayment</li></ul>",
      author: "Admin FinlitGo",
      date: "Oct 05",
      timeToRead: "5 min read",
      category: "Foundation",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    },
    {
      id: 4,
      title: "Why You Need to Start Investing Early",
      excerpt: "Compound interest is the eighth wonder of the world. Find out why starting early is crucial for building long-term wealth.",
      content: "<p>The earlier you start investing, the more time your money has to grow through compound interest.</p><h2>The Magic of Compound Interest</h2><p>If you invest $1,000 at age 20 with an 8% annual return, by age 65 it could grow to over $31,000 without adding another penny!</p>",
      author: "Snickers",
      date: "Sep 28",
      timeToRead: "6 min read",
      category: "Growth",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    },
    {
      id: 5,
      title: "10 Side Hustles That Actually Make Money",
      excerpt: "Looking to boost your income? Here are 10 proven side hustles that can help you earn extra cash in 2024.",
      content: "<p>Here are 10 side hustles that can help you earn extra income in 2024.</p><h2>Top Side Hustles</h2><ul><li>Freelance writing</li><li>Virtual assistant</li><li>Online tutoring</li><li>Delivery driving</li><li>Pet sitting</li><li>Social media management</li><li>Print on demand</li><li>Affiliate marketing</li><li>Online surveys</li><li>Rent out your stuff</li></ul>",
      author: "Admin FinlitGo",
      date: "Sep 20",
      timeToRead: "7 min read",
      category: "Income",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    },
    {
      id: 6,
      title: "How to Improve Your Credit Score Fast",
      excerpt: "A good credit score opens doors to better loans and lower interest rates. Learn actionable tips to boost your score quickly.",
      content: "<p>Your credit score affects your ability to get loans, credit cards, and even apartments. Here's how to improve it fast.</p><h2>Quick Tips</h2><ul><li>Pay bills on time</li><li>Keep credit utilization below 30%</li><li>Don't close old accounts</li><li>Check your credit report for errors</li><li>Become an authorized user</li></ul>",
      author: "Doctor Solking",
      date: "Sep 15",
      timeToRead: "5 min read",
      category: "Credit",
      image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&q=80",
    },
  ];
}

// Komponen utama BlogPage (daftar blog)
export default function BlogPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);

  const blogs = getBlogs();

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const featured = filteredBlogs[0];
  const restPosts = filteredBlogs.slice(1, 1 + visibleCount);
  const remainingPosts = Math.max(0, filteredBlogs.length - 1 - visibleCount);

  return (
    <div className="relative min-h-screen text-white bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative z-10 w-full overflow-hidden px-6 py-20">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="text-violet-300 font-mono text-sm uppercase tracking-[0.3em] block mb-4">
              FinLitGo Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                Knowledge
              </span>{" "}
              Base
            </h1>
            <p className="text-zinc-300 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
              Deep dives, guides, and insights to help you navigate the complex
              world of personal finance, tailored for the younger generation.
            </p>
          </motion.div>

          {/* Search Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setVisibleCount(3);
              }}
              placeholder="Search articles..."
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-4 px-12 text-white placeholder-zinc-400 focus:outline-none focus:border-violet-400 focus:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all text-lg"
            />
          </motion.div>
        </div>
      </section>

      <div className="pointer-events-none relative z-10 -mt-14 h-20 bg-[linear-gradient(to_bottom,rgba(10,10,10,0)_0%,rgba(62,38,140,0.34)_52%,rgba(10,10,10,0)_100%)]" />

      {/* Featured Post */}
      {featured && (
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-8 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/blog/${featured.id}`)}
            className="group cursor-pointer bg-[#1A1A1A] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl hover:border-violet-500/30 transition-all flex flex-col md:flex-row h-auto md:h-96 w-full"
          >
            <div className="w-full md:w-1/2 h-64 md:h-full overflow-hidden relative">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-xs px-3 py-1 rounded-full shadow-lg">
                Featured
              </div>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-violet-400 font-mono text-sm uppercase mb-3">
                {featured.category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-violet-300 transition-colors">
                {featured.title}
              </h2>
              <p className="text-zinc-400 mb-8 line-clamp-3 text-lg">
                {featured.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/150?u=${featured.author}`}
                      className="w-full h-full object-cover"
                      alt="Author"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-medium">
                      {featured.author}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <IconClock size={12} /> {featured.date} ·{" "}
                      {featured.timeToRead}
                    </span>
                  </div>
                </div>
                <button className="text-violet-400 bg-zinc-900 border border-zinc-700 p-3 rounded-full group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-400 group-hover:text-white group-hover:border-transparent transition-all">
                  <IconArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Recent Articles Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-8 pb-20">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
          <h3 className="text-2xl font-bold font-orbitron flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-400 rounded-full" />
            Recent Articles
          </h3>

          <div className="flex gap-3">
            {remainingPosts > 0 && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-400 text-white text-sm rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Load More
              </button>
            )}

            {visibleCount > 3 && (
              <button
                onClick={() => setVisibleCount(3)}
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg font-semibold hover:bg-zinc-700 transition-all"
              >
                Show Less
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="bg-[#1A1A1A] border border-zinc-800 hover:border-violet-500/30 rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/5"
            >
              <div className="w-full h-48 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full text-zinc-400 hover:text-violet-400 transition-colors">
                  <IconBookmark size={16} />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-violet-400 font-mono tracking-widest text-[10px] uppercase mb-2 block">
                  {post.category}
                </span>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors leading-tight">
                  {post.title}
                </h4>
                <p className="text-zinc-500 text-sm line-clamp-2 mb-6">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/150?u=${post.author}`}
                      className="w-full h-full object-cover"
                      alt="Author"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-300 font-medium">
                      {post.author}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono flex items-center gap-1">
                      <IconClock size={10} /> {post.date} · {post.timeToRead}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            <IconSearch size={48} className="mx-auto mb-4 text-zinc-600" />
            <p className="text-lg">No articles found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}