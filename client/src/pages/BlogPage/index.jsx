import React, { useState, useEffect } from "react";
import {
  IconArrowRight,
  IconSearch,
  IconClock,
  IconBookmark,
  IconFlame,
  IconBook2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { supabase } from "../../services/supabase";
import { getFallbackBlogs } from "../../data/fallbackBlogs";
import Footer from "../../components/layout/Footer";

const BLOG_IMG_FALLBACK =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

export default function BlogPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const streak = profile?.streak_count || 0;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error || !data || data.length === 0) {
          if (error) {
            setLoadError(error.message || "Gagal memuat artikel dari database.");
          }
          // Fallback to local/mock data
          const fbData = getFallbackBlogs().map((b) => ({
            ...b,
            image: (b.image || b.thumbnail_url || "").trim() || BLOG_IMG_FALLBACK,
            timeToRead: b.timeToRead || b.time_to_read || "5 min read",
            date: b.date || new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }),
          }));
          setBlogs(fbData);
        } else {
          setBlogs(
            data.map((b) => ({
              ...b,
              image: (b.image || b.thumbnail_url || "").trim() || BLOG_IMG_FALLBACK,
              timeToRead: b.time_to_read || "5 min read",
              date: new Date(b.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              }),
            })),
          );
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setLoadError("Terjadi kesalahan saat memuat artikel.");
        const fbData = getFallbackBlogs().map((b) => ({
          ...b,
          image: (b.image || b.thumbnail_url || "").trim() || BLOG_IMG_FALLBACK,
          timeToRead: b.timeToRead || b.time_to_read || "5 min read",
          date: b.date || new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          }),
        }));
        setBlogs(fbData);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()),
  );

  const featured = filteredBlogs[0];
  const restPosts = filteredBlogs.slice(1, 1 + visibleCount);
  const remainingPosts = Math.max(0, filteredBlogs.length - 1 - visibleCount);

  // Get streak message (same as ClassPage)
  const streakMessage = (() => {
    if (streak === 0) return "Start your streak!";
    if (streak < 3) return "Good start!";
    if (streak < 7) return "Keep it up!";
    if (streak < 14) return "On fire!";
    if (streak < 30) return "Incredible streak!";
    return "Legendary!";
  })();

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent text-zinc-900 dark:text-white flex items-center justify-center">
        <p className="text-zinc-650 dark:text-zinc-300 text-base">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-transparent text-zinc-900 dark:text-white flex flex-col font-sans">
      <div className="relative flex flex-col w-full overflow-hidden bg-transparent">
        <div className="relative z-10 flex flex-col w-full">
          {loadError && (
            <div className="relative z-20 mx-auto max-w-3xl px-4 pt-6">
              <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                <strong className="font-semibold">Gagal memuat blog:</strong> {loadError}
                <span className="block mt-1 text-sm text-amber-50/90">
                  Jika Anda admin: cek Supabase → Table Editor → blogs (RLS harus mengizinkan SELECT untuk role yang dipakai).
                </span>
              </div>
            </div>
          )}
          {/* Hero Section - identical to ClassPage */}
          <section className="relative z-10 w-full overflow-hidden bg-transparent px-6 py-24">
            <div className="relative z-10 max-w-6xl mx-auto text-center">
              <div>
                <span className="text-violet-600 dark:text-violet-300 font-mono text-sm uppercase tracking-[0.3em] block mb-4">
                  FinLitGo Blog
                </span>
                <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-zinc-900 dark:text-white mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-650 to-purple-550 dark:from-violet-400 dark:to-purple-300">
                    Knowledge
                  </span>{" "}
                  Base
                </h1>
                <p className="text-zinc-600 dark:text-zinc-200 max-w-2xl mx-auto text-xl leading-relaxed mb-10">
                  Deep dives, guides, and insights to help you navigate the
                  complex world of personal finance, tailored for the younger
                  generation.
                </p>
              </div>

              {/* Search Bar - identical to ClassPage */}
              <div className="max-w-xl mx-auto relative">
                <IconSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-450 dark:text-zinc-350"
                  size={20}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(3);
                  }}
                  placeholder="Search articles..."
                  className="w-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-zinc-250 dark:border-white/20 rounded-2xl py-4 px-12 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all text-lg"
                />
              </div>

              {/* Streak Badge — only show when logged in (same as ClassPage) */}
              {user && (
                <div className="inline-flex items-center gap-3 mt-8 bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-violet-300/40 dark:border-violet-500/30 px-6 py-3 rounded-2xl shadow-sm dark:shadow-none">
                  <IconFlame
                    size={24}
                    className={`${streak > 0 ? "text-orange-500 dark:text-orange-400 animate-pulse" : "text-zinc-400"}`}
                  />
                  <div className="text-left">
                    <span className="text-2xl font-bold font-orbitron text-zinc-900 dark:text-white">
                      {streak}
                    </span>
                    <span className="text-sm text-zinc-650 dark:text-zinc-200 ml-2">
                      Day Streak
                    </span>
                  </div>
                  <span className="text-sm text-violet-650 dark:text-violet-200 font-mono ml-2">
                    {streakMessage}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Gradient divider - same as ClassPage */}
          <div className="pointer-events-none relative z-10 h-20 bg-[linear-gradient(to_bottom,rgba(250,250,250,0)_0%,rgba(124,58,237,0.1)_52%,rgba(250,250,250,0)_100%)] dark:bg-[linear-gradient(to_bottom,rgba(10,10,10,0)_0%,rgba(62,38,140,0.34)_52%,rgba(10,10,10,0)_100%)]" />

          {/* Featured Post - with ClassPage card styling */}
          {featured && (
            <section className="relative z-10 max-w-6xl mx-auto px-6 pb-8 pt-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-orbitron text-zinc-900 dark:text-white flex items-center gap-3">
                  <IconBook2 className="text-violet-600 dark:text-violet-400" /> Featured Article
                </h2>
              </div>

              <div
                onClick={() => navigate(`/blog/${featured.id}`)}
                className="group cursor-pointer bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 hover:border-violet-500 dark:hover:border-violet-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-md dark:shadow-none hover:shadow-xl hover:shadow-violet-500/10 flex flex-col md:flex-row h-auto md:h-96 w-full"
              >
                <div className="w-full md:w-1/2 h-64 md:h-full overflow-hidden relative">
                  <img
                    src={featured.image || BLOG_IMG_FALLBACK}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 dark:opacity-70 group-hover:opacity-95 dark:group-hover:opacity-90"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-violet-300 border border-violet-500/30">
                    Featured
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-violet-600 dark:text-violet-400 font-mono text-sm uppercase mb-3">
                    {featured.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-350 mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/150?u=${featured.author}`}
                          className="w-full h-full object-cover"
                          alt="Author"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-zinc-900 dark:text-white font-medium">
                          {featured.author}
                        </span>
                        <span className="text-sm text-zinc-550 dark:text-zinc-300 flex items-center gap-1">
                          <IconClock size={12} /> {featured.date} ·{" "}
                          {featured.timeToRead}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 group-hover:text-violet-750 dark:group-hover:text-violet-300 transition-colors">
                      Read More
                      <IconArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Recent Articles Section */}
          <section className="relative z-9 max-w-6xl mx-auto px-6 py-8 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h2 className="text-2xl font-bold font-orbitron text-zinc-900 dark:text-white flex items-center gap-3">
                <IconBook2 className="text-violet-600 dark:text-violet-400" /> Recent Articles
              </h2>
              <div className="flex gap-3">
                {remainingPosts > 0 && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="px-4 py-2 bg-gradient-to-r from-violet-650 to-purple-550 dark:from-violet-600 dark:to-purple-400 text-white text-sm rounded-lg font-semibold hover:shadow-md hover:brightness-105 transition-all shadow-sm cursor-pointer"
                  >
                    Load More
                  </button>
                )}
                {visibleCount > 3 && (
                  <button
                    onClick={() => setVisibleCount(3)}
                    className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-white text-sm rounded-lg font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                  >
                    Show Less
                  </button>
                )}
              </div>
            </div>

            {/* Blog Grid - with ClassPage card styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 hover:border-violet-500 dark:hover:border-violet-500/40 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-md dark:shadow-none hover:shadow-xl hover:shadow-violet-500/10 flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="h-48 w-full relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 dark:opacity-70 group-hover:opacity-95 dark:group-hover:opacity-90"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-violet-300 border border-violet-500/30">
                      {post.category}
                    </div>
                    <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full text-zinc-400 hover:text-violet-400 transition-colors">
                      <IconBookmark size={16} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-base text-zinc-600 dark:text-zinc-350 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 mt-auto pt-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/150?u=${post.author}`}
                          className="w-full h-full object-cover"
                          alt="Author"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                          {post.author}
                        </span>
                        <span className="text-xs text-zinc-550 dark:text-zinc-400 font-mono flex items-center gap-1">
                          <IconClock size={10} /> {post.date} ·{" "}
                          {post.timeToRead}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div
                className="text-center py-16 text-zinc-500 dark:text-zinc-350"
              >
                <IconSearch size={48} className="mx-auto mb-4 text-zinc-450 dark:text-zinc-350" />
                <p className="text-xl text-zinc-800 dark:text-white font-medium">
                  {!loadError && blogs.length === 0 && !search.trim()
                    ? "Belum ada artikel. Tambahkan dari Dashboard → Manage Blog."
                    : "Tidak ada artikel yang cocok dengan pencarian."}
                </p>
              </div>
            )}
          </section>

          {/* CTA Section for non-logged in users - same as ClassPage */}
          {!user && (
            <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
              <div className="bg-gradient-to-br from-zinc-100 via-violet-100 to-zinc-100 dark:from-[#1A1A2E] dark:via-[#2D1B69] dark:to-[#1A1A2E] border border-zinc-200 dark:border-violet-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="text-4xl font-bold font-orbitron text-zinc-900 dark:text-white mb-4">
                    Stay Updated
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-200 text-lg max-w-lg mx-auto mb-8">
                    Get the latest financial insights delivered to your inbox.
                    Sign up now and never miss an article.
                  </p>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            </section>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
}
