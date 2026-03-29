import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Class', href: '/class' },
    { name: 'Blog', href: '/blog' },
    { name: 'Ai assist', href: '/ai-assist' },
  ];

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 py-4 lg:py-6 transition-all duration-300">
        <div className="flex justify-between items-center max-w-7xl w-full mx-auto px-6 md:px-8">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-normal text-white tracking-wide cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 z-[60]">
            FINLITGO
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? location.pathname === '/' : location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative overflow-hidden rounded-full px-5 py-2 text-white text-base font-normal transition-all duration-300 group ${
                    isActive
                      ? 'bg-white/20 border border-white/50 backdrop-blur-md shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:border-white/70 hover:bg-white/30'
                      : 'bg-transparent border border-transparent hover:bg-white/10'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-sweep pointer-events-none"></div>
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex gap-3 items-center">
            <Link to="/login" className="relative overflow-hidden bg-white/20 border border-white/50 backdrop-blur-md shadow-sm rounded-full px-5 py-2 text-white text-base font-normal transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-white/30 hover:border-white/70 group">
              <span className="relative z-10">Log In</span>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-sweep pointer-events-none"></div>
            </Link>
            
            <Link to="/register" className="relative overflow-hidden bg-white px-5 py-2 text-black text-base font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-200 active:scale-95">
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden z-[60] p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
              <span className={`w-full h-0.5 bg-white transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? 'translate-x-full opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop & Panel */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-500 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Blur Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" onClick={() => setIsOpen(false)}></div>
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 right-0 w-[80%] h-full bg-[#141414] border-l border-white/10 transition-transform duration-500 ease-out pt-32 px-10 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-8 text-2xl font-light">
            {navLinks.map((link, i) => {
              const isActive = link.href === '/' ? location.pathname === '/' : location.pathname.startsWith(link.href);
              return (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={`transition-colors duration-300 delay-[${i * 50}ms] ${
                    isActive ? 'text-purple-400 font-medium' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="absolute bottom-12 left-10 right-10 flex flex-col gap-4">
            <Link to="/login" className="w-full py-4 text-center border border-white/20 rounded-2xl text-white font-medium hover:bg-white/5 transition">
              Log In
            </Link>
            <Link to="/register" className="w-full py-4 text-center bg-white rounded-2xl text-black font-bold hover:bg-gray-200 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;