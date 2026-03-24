import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#200A4C] text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Brand Area */}
        <div className="flex flex-col max-w-xs">
          <h2 className="text-2xl font-bold mb-2">FINLITGO</h2>
          <p className="text-sm text-gray-300 font-light italic mb-6">Invest step learning.</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-8">
            Platform belajar keuangan dengan 3 metode: Visual, Audio, dan Text. 
            Telah membantu 250,000+ orang mengelola uang lebih baik.
          </p>
          {/* Socials Placeholder */}
          <div className="flex gap-4 mb-8">
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition">IG</div>
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition">YT</div>
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition">IN</div>
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition">FB</div>
          </div>
        </div>

        {/* Links Area */}
        <div className="flex gap-16 flex-wrap">
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-xs text-gray-300">
              <li className="hover:text-white cursor-pointer transition">› Home</li>
              <li className="hover:text-white cursor-pointer transition">› Semua Kelas</li>
              <li className="hover:text-white cursor-pointer transition">› Blog</li>
              <li className="hover:text-white cursor-pointer transition">› Tentang Kami</li>
              <li className="hover:text-white cursor-pointer transition">› Karir</li>
              <li className="hover:text-white cursor-pointer transition">› FAQ</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm mb-4">Kategori Kelas</h3>
            <ul className="flex flex-col gap-3 text-xs text-gray-300">
              <li className="hover:text-white cursor-pointer transition">› Manajemen Keuangan</li>
              <li className="hover:text-white cursor-pointer transition">› Dana Darurat</li>
              <li className="hover:text-white cursor-pointer transition">› Debt Principal</li>
              <li className="hover:text-white cursor-pointer transition">› Perencanaan Pensiun</li>
              <li className="hover:text-white cursor-pointer transition">› Manajemen Hutang</li>
              <li className="hover:text-white cursor-pointer transition">› Financial Planning</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm mb-4">Hubungi Kami</h3>
            <ul className="flex flex-col gap-4 text-xs text-gray-300">
              <li className="flex items-center gap-2"><span>✉</span> hello@finlitgo.com</li>
              <li className="flex items-center gap-2"><span>📞</span> +62 812-3456-7890</li>
              <li className="flex items-center gap-2"><span>📍</span> Jakarta, Indonesia</li>
              <li className="flex items-center gap-2"><span>🕒</span> Senin - Jumat, 09:00 - 17:00</li>
            </ul>
            
            <div className="flex items-center gap-6 mt-8">
              <div className="flex flex-col text-center"><span className="font-bold text-xl text-white">250K+</span><span className="text-[10px] text-gray-400">Users</span></div>
              <div className="flex flex-col text-center"><span className="font-bold text-xl text-white">15+</span><span className="text-[10px] text-gray-400">Kelas</span></div>
              <div className="flex flex-col text-center"><span className="font-bold text-xl text-white">4.8</span><span className="text-[10px] text-gray-400">Rating</span></div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
