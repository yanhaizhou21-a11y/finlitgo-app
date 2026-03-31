import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function BlogPage() {
  const [openArticle, setOpenArticle] = useState(false);

  // HALAMAN ARTIKEL
  if (openArticle) {
    return (
      <div className="bg-black min-h-screen flex flex-col font-sans text-white">
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-20">
          <button
            onClick={() => setOpenArticle(false)}
            className="mb-8 text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </button>

          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gaji Habis Tanpa Sadar? Ini Kesalahan Finansial yang Sering Terjadi
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-800">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>March 2026</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
            </div>
          </div>

          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Pernah merasa gaji baru masuk tapi tiba-tiba sudah habis?
              Banyak orang mengalami hal ini karena kurangnya perencanaan
              dan kontrol dalam mengatur keuangan.
            </p>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500 p-6 rounded-r-xl my-8">
              <p className="text-gray-300 italic text-lg">
                "Kesadaran adalah langkah pertama menuju kebebasan finansial. Mulailah mencatat setiap pengeluaranmu."
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              Mulai dari pengeluaran kecil seperti jajan harian, langganan
              aplikasi, hingga gaya hidup yang tidak disadari, semuanya bisa
              menjadi penyebab utama keuangan menjadi tidak sehat.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Solusinya adalah mulai mencatat pengeluaran, membuat anggaran,
              serta membedakan antara kebutuhan dan keinginan.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section dengan Gradient */}
      <div className="relative bg-gradient-to-b from-purple-900/20 via-black to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f')] bg-cover bg-center opacity-5 blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-xs font-medium text-purple-400">Financial Blog</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Blog & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Articles</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover insights and strategies for better financial management
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-12">

            {/* Featured Article Card */}
            <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
                alt="finance"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="text-xs text-gray-400">March 2026</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors">
                  Gaji Habis Tanpa Sadar? Ini Kesalahan Finansial yang Sering Terjadi
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Admin</p>
                    <p className="text-xs text-gray-400">8 min read</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <div className="prose prose-invert prose-purple max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  Pernah merasa gaji baru masuk, tapi tiba-tiba sudah habis tanpa tahu ke mana perginya?
                  Tenang, kamu tidak sendiri. Banyak orang mengalami hal yang sama karena kurangnya
                  perencanaan dan kontrol dalam mengatur keuangan.
                </p>

                <p className="text-gray-400 leading-relaxed mt-4">
                  Mulai dari pengeluaran kecil seperti jajan harian, langganan aplikasi, hingga gaya hidup
                  yang tidak disadari, semuanya bisa jadi penyebab utama keuangan jadi tidak sehat.
                </p>

                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500 p-6 rounded-r-xl my-8">
                  <p className="text-gray-300 italic text-lg">
                    "Kesadaran adalah langkah pertama menuju kebebasan finansial. Mulailah mencatat setiap pengeluaranmu."
                  </p>
                </div>

                <button
                  onClick={() => setOpenArticle(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all hover:gap-3 shadow-lg hover:shadow-purple-500/25"
                >
                  <span>Continue Reading</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* More Articles Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                  More Articles
                </h2>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="grid gap-6">
                {[
                  {
                    title: "Kenapa Nabung Itu Susah? Ini Jawaban Jujurnya",
                    img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6",
                    desc: "Banyak orang gagal menabung bukan karena tidak punya uang, tapi karena tidak punya strategi yang jelas.",
                    date: "Mar 20, 2026"
                  },
                  {
                    title: "5 Cara Mengatur Uang Biar Gak Bokek di Akhir Bulan",
                    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
                    desc: "Mulai dari budgeting sederhana sampai teknik 50/30/20 yang bisa kamu terapkan langsung.",
                    date: "Mar 18, 2026"
                  },
                  {
                    title: "Gaya Hidup vs Kebutuhan: Mana yang Harus Didahulukan?",
                    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
                    desc: "Seringkali kita terjebak antara ingin terlihat keren atau hidup lebih stabil secara finansial.",
                    date: "Mar 15, 2026"
                  },
                  {
                    title: "Tips Menabung untuk Pelajar dan Mahasiswa",
                    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
                    desc: "Walaupun uang saku terbatas, kamu tetap bisa mulai menabung dengan cara yang realistis.",
                    date: "Mar 12, 2026"
                  },
                  {
                    title: "Utang Itu Boleh, Tapi Jangan Sampai Menghancurkan Hidup",
                    img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1",
                    desc: "Belajar membedakan utang produktif dan konsumtif agar tidak terjebak masalah finansial.",
                    date: "Mar 10, 2026"
                  },
                  {
                    title: "Investasi untuk Pemula: Mulai dari Mana?",
                    img: "https://images.unsplash.com/photo-1569025690938-a00729c9e1b9",
                    desc: "Tidak perlu langsung besar, yang penting konsisten dan paham risikonya.",
                    date: "Mar 8, 2026"
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex flex-col md:flex-row gap-6 p-6 bg-gray-900/30 hover:bg-gray-900/60 rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02] border border-gray-800 hover:border-purple-500/50"
                  >
                    <div className="md:w-1/3 overflow-hidden rounded-xl">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-48 md:h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="md:w-2/3 space-y-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-purple-400">Finance</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500">{item.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                      <button
                        onClick={() => setOpenArticle(true)}
                        className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition"
                      >
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR - Enhanced */}
          <div className="space-y-8">
            
            {/* Author Card with Animation */}
            <div className="sticky top-24 space-y-8">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-purple-500/25">
                    A
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">About The Author</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    Financial writer dengan passion membantu millennial mencapai kebebasan finansial melalui edukasi dan tips praktis.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-500">✍️ 150+ Articles</span>
                    <span className="text-xs text-gray-500">👥 10k+ Readers</span>
                  </div>
                </div>
              </div>

              {/* Social Links - Glassmorphism */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Connect With Us
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: "fab fa-instagram", name: "Instagram", color: "hover:bg-gradient-to-br from-purple-500 to-pink-500" },
                    { icon: "fab fa-facebook", name: "Facebook", color: "hover:bg-blue-600" },
                    { icon: "fab fa-twitter", name: "Twitter", color: "hover:bg-blue-400" },
                    { icon: "fab fa-youtube", name: "YouTube", color: "hover:bg-red-600" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href="#"
                      className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    >
                      <i className={`${social.icon} text-xl text-gray-400 group-hover:text-white transition-colors`}></i>
                      <span className="text-xs text-gray-500 group-hover:text-gray-300">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Latest Articles with Counter */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Latest Articles
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Cara Mengatur Gaji Pertama dengan Bijak",
                      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
                      date: "Mar 25, 2026",
                      readTime: "5 min"
                    },
                    {
                      title: "5 Kesalahan Finansial yang Sering Dilakukan Anak Muda",
                      img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
                      date: "Mar 22, 2026",
                      readTime: "7 min"
                    },
                    {
                      title: "Tips Hidup Hemat Tanpa Tersiksa: Panduan Praktis",
                      img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
                      date: "Mar 19, 2026",
                      readTime: "6 min"
                    },
                    {
                      title: "Mengenal Investasi Reksadana untuk Pemula",
                      img: "https://images.unsplash.com/photo-1569025690938-a00729c9e1b9",
                      date: "Mar 16, 2026",
                      readTime: "8 min"
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => setOpenArticle(true)}
                      className="group flex gap-4 items-start cursor-pointer p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 relative">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors line-clamp-2 mb-1">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.readTime} read</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}