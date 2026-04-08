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
  const { postId } = useParams(); // Ambil ID dari URL
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
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
              isSaved
                ? "bg-violet-600 text-white"
                : "bg-black/50 text-white hover:bg-violet-600"
            }`}
          >
            <IconBookmark size={20} />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-black/50 text-white hover:bg-red-500"
            }`}
          >
            <IconHeart size={20} />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: blog.title, url: window.location.href });
              } else {
                alert("Share this article!");
              }
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-violet-600 transition-all"
          >
            <IconShare size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
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

          {/* Blog Content */}
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

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                {blog.category}
              </span>
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                Personal Finance
              </span>
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                Tips & Tricks
              </span>
            </div>
          </div>

          {/* Navigation */}
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