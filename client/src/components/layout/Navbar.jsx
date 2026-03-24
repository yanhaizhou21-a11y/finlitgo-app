import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Class', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Ai assist', href: '#' },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-4 lg:py-6 transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl w-full mx-auto px-6 md:px-8">
        
        {/* Logo */}
        <div className="text-2xl font-normal text-white tracking-wide cursor-pointer z-50">
          FINLITGO
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden z-50 flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative overflow-hidden rounded-full px-5 py-2 text-white text-base font-normal transition-all duration-300 group ${
                  isActive
                    ? 'bg-white/20 border border-white/50 backdrop-blur-md shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:border-white/70 hover:bg-white/30'
                    : 'bg-transparent border border-transparent hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-sweep pointer-events-none"></div>
              </a>
            );
          })}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex gap-3 items-center">
          <a href="#" className="relative overflow-hidden bg-white/20 border border-white/50 backdrop-blur-md shadow-sm rounded-full px-5 py-2 text-white text-base font-normal transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-white/30 hover:border-white/70 group">
            <span className="relative z-10">Log In</span>
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-sweep pointer-events-none"></div>
          </a>
          
          <a href="#" className="relative overflow-hidden bg-white/20 border border-white/50 backdrop-blur-md shadow-sm rounded-full px-5 py-2 text-white text-base font-normal transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-white/30 hover:border-white/70 group">
            <span className="relative z-10">Sign Up</span>
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-sweep pointer-events-none"></div>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-[#6d28d9]/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out flex flex-col justify-center items-center gap-6 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => {
              setActiveTab(link.name);
              setIsOpen(false);
            }}
            className={`text-white text-2xl font-light hover:bg-white/20 px-8 py-3 rounded-full transition-colors w-64 text-center ${
              activeTab === link.name ? 'bg-white/20' : ''
            }`}
          >
            {link.name}
          </a>
        ))}
        
        <div className="mt-8 flex flex-col gap-4 w-64">
          <a href="#" className="flex items-center justify-center bg-white/20 border border-white/50 rounded-full px-6 py-4 text-white text-xl shadow-lg transition-colors hover:bg-white/30 w-full" onClick={() => setIsOpen(false)}>Log In</a>
          <a href="#" className="flex items-center justify-center bg-white/20 border border-white/50 rounded-full px-6 py-4 text-white text-xl shadow-lg transition-colors hover:bg-white/30 w-full" onClick={() => setIsOpen(false)}>Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;