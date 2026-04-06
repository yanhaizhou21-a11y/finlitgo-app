import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IconArrowLeft, IconClock, IconBookmark, IconShare, IconHeart } from "@tabler/icons-react";

const STORAGE_KEY = "finlitgo_blogs";

function getBlogs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    {
      id: 1,
      title: "How to Build an Emergency Fund in 6 Months",
      excerpt: "An emergency fund is a financial safety net designed to cover unexpected expenses...",
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
      excerpt: "Cryptocurrency has taken the financial world by storm...",
      content: "<p>Detailed content about cryptocurrency for beginners...</p>",
      author: "Doctor Solking",
      date: "Oct 10",
      timeToRead: "8 min read",
      category: "Advanced",
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
    },
    {
      id: 3,
      title: "The 50/30/20 Rule Explained",
      excerpt: "Budgeting doesn't have to be complicated...",
      content: "<p>Detailed explanation of the 50/30/20 budgeting rule...</p>",
      author: "Admin FinlitGo",
      date: "Oct 05",
      timeToRead: "5 min read",
      category: "Foundation",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    },
    {
      id: 4,
      title: "Why You Need to Start Investing Early",
      excerpt: "Compound interest is the eighth wonder of the world...",
      content: "<p>Why starting early matters for building wealth...</p>",
      author: "Snickers",
      date: "Sep 28",
      timeToRead: "6 min read",
      category: "Growth",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    },
    {
      id: 5,
      title: "10 Side Hustles That Actually Make Money",
      excerpt: "Looking to boost your income? Here are 10 proven side hustles...",
      content: "<p>List of 10 side hustles with actionable steps...</p>",
      author: "Admin FinlitGo",
      date: "Sep 20",
      timeToRead: "7 min read",
      category: "Income",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    },
    {
      id: 6,
      title: "How to Improve Your Credit Score Fast",
      excerpt: "A good credit score opens doors to better loans...",
      content: "<p>Actionable tips to boost your credit score quickly...</p>",
      author: "Doctor Solking",
      date: "Sep 15",
      timeToRead: "5 min read",
      category: "Credit",
      image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&q=80",
    },
  ];
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const blogs = getBlogs();
    const foundBlog = blogs.find((b) => b.id === parseInt(id));
    setBlog(foundBlog);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <button
            onClick={() => navigate("/blog")}
            className="text-violet-400 hover:text-violet-300"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section with Blog Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-violet-600 transition-all"
        >
          <IconArrowLeft size={20} />
          Back to Blog
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isSaved ? "bg-violet-600 text-white" : "bg-black/50 text-white hover:bg-violet-600"
            }`}
          >
            <IconBookmark size={20} />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-red-500"
            }`}
          >
            <IconHeart size={20} />
          </button>
          <button
            onClick={() => {
              navigator.share ? navigator.share({ title: blog.title, url: window.location.href }) : alert("Share this article!");
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-violet-600 transition-all"
          >
            <IconShare size={20} />
          </button>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category */}
          <div className="mb-4">
            <span className="text-violet-400 font-mono text-sm uppercase tracking-wider">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-800">
            <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
              <img
                src={`https://i.pravatar.cc/150?u=${blog.author}`}
                className="w-full h-full object-cover"
                alt={blog.author}
              />
            </div>
            <div>
              <div className="font-semibold text-white">{blog.author}</div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>{blog.date}</span>
                <span>•</span>
                <IconClock size={14} />
                <span>{blog.timeToRead}</span>
              </div>
            </div>
          </div>

          {/* Blog Content with HTML */}
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold prose-headings:font-orbitron
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold
              prose-ul:text-zinc-300 prose-li:text-zinc-300
              prose-blockquote:border-l-violet-500 prose-blockquote:text-zinc-400"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags / Related Content */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.category && (
                <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                  {blog.category}
                </span>
              )}
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                Personal Finance
              </span>
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                Tips & Tricks
              </span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between">
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 text-zinc-400 hover:text-violet-400 transition-colors"
            >
              <IconArrowLeft size={20} />
              All Articles
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-zinc-400 hover:text-violet-400 transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}