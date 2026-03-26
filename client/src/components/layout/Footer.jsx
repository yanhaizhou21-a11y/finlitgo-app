import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-mockup-bg w-full text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Brand Area */}
        <div className="flex flex-col max-w-xs">
          <h2 className="text-2xl font-bold mb-2">FINLITGO</h2>
          <p className="text-sm text-gray-300 font-light italic mb-6">Invest step learning.</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-8">
            Platform belajar keuangan dengan 3 metode: Visual, Audio, dan Text. 
            Telah membantu 250,000+ orang mengelola uang lebih baik.
          </p>
          {/* Socials */}
          <div className="flex gap-4 mb-8">
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.88 2.12a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M21.58 7.19a2.95 2.95 0 0 0-2.08-2.08C17.75 4.6 12 4.6 12 4.6s-5.75 0-7.5.51A2.95 2.95 0 0 0 2.42 7.2C1.9 8.95 1.9 12 1.9 12s0 3.05.52 4.8a2.95 2.95 0 0 0 2.08 2.08c1.75.51 7.5.51 7.5.51s5.75 0 7.5-.51a2.95 2.95 0 0 0 2.08-2.08c.52-1.75.52-4.8.52-4.8s0-3.05-.52-4.81ZM10.2 15.01V8.99L15.4 12l-5.2 3.01Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M13.5 21.5v-8h2.7l.4-3h-3.1V8.6c0-.87.24-1.46 1.5-1.46h1.7V4.46c-.3-.04-1.33-.12-2.54-.12-2.51 0-4.23 1.53-4.23 4.34v1.82H7v3h2.87v8h3.63Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="X"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M18.9 3h2.98l-6.5 7.42L23 21h-5.93l-4.64-6.08L7.1 21H4.1l6.95-7.94L1 3h6.08l4.19 5.54L18.9 3Zm-1.04 16.2h1.65L6.18 4.7H4.4L17.86 19.2Z" />
              </svg>
            </a>
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
