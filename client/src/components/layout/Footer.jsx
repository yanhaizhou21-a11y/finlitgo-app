import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#111111] text-white py-12 px-6 md:px-12 lg:px-24 font-inter">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

        {/* Column 1: Copyright */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
          <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">©FINLITGO 2026</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="col-span-1 flex flex-col">
          <h3 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm text-zinc-300">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/class" className="hover:text-white transition-colors">Classes</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div className="col-span-1 flex flex-col">
          <h3 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-4">Social</h3>
          <ul className="flex flex-col gap-2 text-sm text-zinc-300">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
