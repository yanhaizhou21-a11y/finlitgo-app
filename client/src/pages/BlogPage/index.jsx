import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function BlogPage() {
  return (
    <div className="site-mockup-bg min-h-screen flex flex-col font-sans text-gray-300">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        
        {/* LEFT CONTENT */}
        <div className="md:col-span-2 space-y-8">
          
          <p className="text-xs tracking-widest text-purple-400 uppercase">
            Finansial
          </p>

          <h1 className="text-2xl md:text-3xl font-semibold text-white leading-snug">
            Gaji Habis Tanpa Sadar? Ini Kesalahan Finansial yang Sering Terjadi
          </h1>

          <p className="text-sm text-gray-400">
            Posted on March 2026 by Admin
          </p>

          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
            alt="finance"
            className="w-full rounded-xl shadow-lg"
          />

          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Pernah merasa gaji baru masuk, tapi tiba-tiba sudah habis tanpa tahu ke mana perginya?
            Tenang, kamu tidak sendiri. Banyak orang mengalami hal yang sama karena kurangnya
            perencanaan dan kontrol dalam mengatur keuangan.
          </p>

          <p className="text-gray-400 text-sm md:text-base">
            Mulai dari pengeluaran kecil seperti jajan harian, langganan aplikasi, hingga gaya hidup
            yang tidak disadari, semuanya bisa jadi penyebab utama keuangan jadi tidak sehat.
          </p>

          <button className="text-purple-400 text-sm hover:underline">
            Continue Reading →
          </button>

          {/* MORE ARTICLES */}
          <div className="mt-12 space-y-12">
            {[
              {
                title: "Kenapa Nabung Itu Susah? Ini Jawaban Jujurnya",
                img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6",
                desc: "Banyak orang gagal menabung bukan karena tidak punya uang, tapi karena tidak punya strategi yang jelas.",
              },
              {
                title: "5 Cara Mengatur Uang Biar Gak Bokek di Akhir Bulan",
                img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
                desc: "Mulai dari budgeting sederhana sampai teknik 50/30/20 yang bisa kamu terapkan langsung.",
              },
              {
                title: "Gaya Hidup vs Kebutuhan: Mana yang Harus Didahulukan?",
                img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
                desc: "Seringkali kita terjebak antara ingin terlihat keren atau hidup lebih stabil secara finansial.",
              },
              {
                title: "Tips Menabung untuk Pelajar dan Mahasiswa",
                img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
                desc: "Walaupun uang saku terbatas, kamu tetap bisa mulai menabung dengan cara yang realistis.",
              },
              {
                title: "Utang Itu Boleh, Tapi Jangan Sampai Menghancurkan Hidup",
                img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1",
                desc: "Belajar membedakan utang produktif dan konsumtif agar tidak terjebak masalah finansial.",
              },
              {
                title: "Investasi untuk Pemula: Mulai dari Mana?",
                img: "https://images.unsplash.com/photo-1569025690938-a00729c9e1b9",
                desc: "Tidak perlu langsung besar, yang penting konsisten dan paham risikonya.",
              },
            ].map((item, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-6 items-start">
                
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-xl"
                />

                <div className="md:col-span-2 space-y-3">
                  <h2 className="text-lg md:text-xl font-semibold text-white leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>

                  <button className="text-purple-400 text-sm hover:underline">
                    Continue Reading →
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-10">
          
          {/* FIND US */}
          <div>
           
            <div className="flex gap-4 text-purple-400 text-lg">
              <i className="fab fa-instagram hover:text-purple-300"></i>
              <i className="fab fa-facebook hover:text-purple-300"></i>
              <i className="fab fa-youtube hover:text-purple-300"></i>
            </div>
          </div>

          {/* LATEST ARTICLES */}
          <div>
           

            <div className="space-y-6">
              {[
                {
                  title: "Cara Mengatur Gaji Pertama",
                  img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
                },
                {
                  title: "Kesalahan Finansial Anak Muda",
                  img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
                },
                {
                  title: "Tips Hidup Hemat Tanpa Tersiksa",
                  img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center group cursor-pointer">
                  <img
                    src={item.img}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-sm text-gray-200 group-hover:text-purple-300 transition">
                      {item.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      2026
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}