import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase";

const Problems = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setBlogs(data.map(b => ({
          ...b,
          image: b.image || b.thumbnail_url || '',
          timeToRead: b.time_to_read || '5 min read',
        })));
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <section className="w-full bg-transparent py-24 px-6 md:px-12 flex flex-col items-center">

      {/* Header */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white max-w-2xl">
          Transformasi Keuangan di Era Digital
        </h2>
        <button
          onClick={() => navigate("/blog")}
          className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-zinc-900 dark:text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Load More →
        </button>
      </div>

      {/* Card Container */}
      <div className="relative max-w-6xl w-full">
        <div className="absolute inset-0 rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-100/80 dark:bg-[#1a1b29]/55 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.35)]" />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 lg:gap-8 justify-center items-stretch px-6 py-8 md:px-8 md:py-10">

          {loading ? (
            // Skeleton loading
            [...Array(3)].map((_, i) => (
              <div key={i} className="flex-1 bg-white dark:bg-[#11131d] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/8 animate-pulse">
                <div className="h-52 w-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-zinc-300 dark:bg-zinc-700 rounded w-1/3" />
                  <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-full" />
                  <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-2/3" />
                </div>
              </div>
            ))
          ) : blogs.length === 0 ? (
            <p className="text-zinc-500 text-center py-12 w-full">Belum ada artikel.</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="group flex-1 bg-white dark:bg-[#11131d] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col border border-zinc-200 dark:border-white/8"
              >
                <div className="h-52 w-full overflow-hidden relative bg-zinc-100 dark:bg-[#0d0f16]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#11131d] via-transparent to-transparent" />
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between bg-gradient-to-b from-white to-zinc-50 dark:from-[#11131d] dark:to-[#0d0f16]">
                  <div className="space-y-2">
                    <p className="text-xs text-violet-600 dark:text-violet-300 font-bold uppercase tracking-wider">
                      {blog.category}
                    </p>
                    <h3 className="text-base lg:text-lg font-bold text-zinc-900 dark:text-white line-clamp-3">
                      {blog.title}
                    </h3>
                  </div>
                  <div className="pt-4 mt-2">
                    <span className="text-sm text-violet-600 dark:text-violet-300 font-semibold inline-flex items-center gap-1">
                      Baca selengkapnya →
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </section>
  );
};

export default Problems;