import React from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "finlitgo_blogs";

function getBlogs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("Blogs loaded successfully:", parsed);
      return parsed;
    }
    console.warn("No blogs found in localStorage");
    return [];
  } catch (error) {
    console.error("Error loading blogs from localStorage:", {
      message: error.message,
      key: STORAGE_KEY,
      savedData: localStorage.getItem(STORAGE_KEY),
    });
    return [];
  }
}

const Problems = () => {
  const navigate = useNavigate();
  const blogs = getBlogs().slice(0, 3);

  return (
    <section className="w-full bg-transparent py-24 px-6 md:px-12 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-white max-w-2xl">
          Transformasi Keuangan di Era Digital
        </h2>

        <button
          onClick={() => navigate("/blog")}
          className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Load More →
        </button>
      </div>

      {/* Card Container */}
      <div className="relative max-w-6xl w-full">
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-[#1a1b29]/55 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.35)]" />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 lg:gap-8 justify-center items-stretch px-6 py-8 md:px-8 md:py-10">
          
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.id}`)}
              className="group flex-1 bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="h-52 w-full overflow-hidden relative bg-gray-200">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="flex-1 p-5 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">
                    {blog.category}
                  </p>
                  <h3 className="text-base lg:text-lg font-bold text-gray-800 line-clamp-3">
                    {blog.title}
                  </h3>
                </div>
                
                <div className="pt-4 mt-2">
                  <span className="text-sm text-purple-600 font-semibold inline-flex items-center gap-1">
                    Baca selengkapnya →
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Problems;