import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  IconArrowLeft,
  IconClock,
  IconBookmark,
  IconHeart,
  IconShare,
  IconEye,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
// import { supabase } from "@/services/supabase"; // DISABLING SUPABASE FOR NOW
import { getFallbackBlogs } from "../../data/fallbackBlogs";

export default function BlogPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const targetRef = useRef(null);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      // FORCE USE FALLBACK DATA ONLY
      // const { data, error } = await supabase
      //   .from("blogs")
      //   .select("*")
      //   .eq("id", postId)
      //   .single();

      // if (error || !data) {
        // Fallback to local data
        const fallbackId = parseInt(postId, 10);
        const fbData = getFallbackBlogs().find((b) => b.id === fallbackId);

        if (fbData) {
          setBlog(fbData);
        } else {
          setNotFound(true);
        }
      // } else {
      //   setBlog({
      //     ...data,
      //     image:
      //       data.image ||
      //       data.thumbnail_url ||
      //       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format",
      //     timeToRead: data.time_to_read || "5 min read",
      //     date: new Date(data.created_at).toLocaleDateString("en-US", {
      //       month: "long",
      //       day: "numeric",
      //       year: "numeric",
      //     }),
      //   });
      // }
      setLoading(false);
      window.scrollTo(0, 0);
    };
    fetchBlog();

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [postId]);

  // Loading State
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-2 border-t-violet-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-zinc-500 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  // Not Found
  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-4 opacity-50">404</div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Article Not Found
          </h2>
          <p className="text-zinc-500 text-sm mb-6">
            The article you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-violet-600 border border-white/10 rounded-lg text-white text-sm transition-all"
          >
            <IconArrowLeft size={16} /> Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // MAIN RETURN - TEKS DI TENGAH IMAGE
  return (
    <div ref={targetRef} className="min-h-screen bg-transparent text-white">
      {/* SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50">
        <div
          className="h-full bg-violet-500"
          style={{
            width: `${scrollProgress}%`,
            transition: "width 0.1s ease-out",
          }}
        />
      </div>

      {/* HERO SECTION - TEKS TENGAH */}
      <div className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">
        {/* BACKGROUND IMAGE dengan PARALLAX */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay untuk memastikan teks terbaca */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </motion.div>

        {/* BACK BUTTON - Posisi Absolute kiri atas */}
        <button
          onClick={() => navigate("/blog")}
          className="absolute top-12 left-6 z-30 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs hover:bg-violet-600/80 transition-all duration-300 border border-white/10"
        >
          <IconArrowLeft size={14} />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* ACTION BUTTONS - Posisi Absolute kanan atas */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10 ${
              isSaved ? "bg-violet-600" : "bg-black/50 hover:bg-violet-600/70"
            }`}
          >
            <IconBookmark size={14} />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10 ${
              isLiked ? "bg-red-500" : "bg-black/50 hover:bg-red-500/70"
            }`}
          >
            <IconHeart size={14} className={isLiked ? "fill-current" : ""} />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: blog.title,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied!");
              }
            }}
            className="p-1.5 rounded-full bg-black/50 backdrop-blur-md hover:bg-violet-600/70 transition-all duration-300 border border-white/10"
          >
            <IconShare size={14} />
          </button>
        </div>

        {/* 🎯 TEKS DI TENGAH-TENGAH IMAGE (CENTERED) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          {/* Category Badge - Di atas title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 bg-violet-600/90 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider text-white mb-4 shadow-lg">
              {blog.category || "FOUNDATION"}
            </span>
          </motion.div>

          {/* Title - Besar, Bold, Center */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto"
          >
            {blog.title}
          </motion.h1>

          {/* Optional: Metadata kecil di bawah title (bisa diaktifkan jika perlu) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-4 text-sm text-white/70"
          >
            <div className="flex items-center gap-2">
              <IconUser size={14} />
              <span>{blog.author || "FinLitGo"}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/30"></span>
            <div className="flex items-center gap-2">
              <IconClock size={14} />
              <span>{blog.timeToRead}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <article className="relative z-20 -mt-10 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* MAIN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0f0f0f]/80 backdrop-blur-sm rounded-2xl border border-white/5 shadow-xl overflow-hidden"
          >
            <div className="p-6 md:p-8 lg:p-10">
              {/* AUTHOR & METADATA DETAIL */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                    <IconUser size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">
                      {blog.author || "FinLitGo"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                      <span>{blog.date}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                      <div className="flex items-center gap-1">
                        <IconClock size={12} className="text-zinc-500" />
                        <span>{blog.timeToRead}</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                      <div className="flex items-center gap-1">
                        <IconEye size={12} className="text-zinc-500" />
                        <span>1.2k views</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <IconMessage size={12} className="text-zinc-500" />
                  <span className="text-xs text-zinc-400">Discuss</span>
                </div>
              </div>

              {/* BLOG CONTENT */}
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-semibold prose-headings:mt-8 prose-headings:mb-4
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                  prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base
                  prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-code:text-violet-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                  prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                  prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-white/5 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-blockquote:italic
                  prose-img:rounded-xl prose-img:my-6
                  prose-ul:text-zinc-300 prose-ul:list-disc prose-ul:pl-5
                  prose-ol:text-zinc-300 prose-ol:list-decimal prose-ol:pl-5
                  prose-li:text-zinc-300
                  prose-table:w-full prose-table:text-sm
                  prose-th:border prose-th:border-white/10 prose-th:p-2 prose-th:bg-white/5
                  prose-td:border prose-td:border-white/10 prose-td:p-2
                "
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* FOOTER */}
              <div className="mt-10 pt-6 text-center border-t border-white/10">
                <p className="text-zinc-600 text-xs">
                  © 2026 FinLitGo — All rights reserved
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}