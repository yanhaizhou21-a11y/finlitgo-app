import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Class', href: '/class' },
    { name: 'Blog', href: '/blog' },
    { name: 'Ai assist', href: '/ai-assist' },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-4 lg:py-6 transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl w-full mx-auto px-6 md:px-8">
        
        {/* Logo - Hidden on mobile because StaggeredMenu has its own logo in the header */}
        <div className="hidden md:block text-2xl font-normal text-white tracking-wide cursor-pointer z-50">
          FINLITGO
        </div>

        {/* Hamburger Menu (Mobile) */}
        <HamburgerMenu navLinks={navLinks} />

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
    </nav>
  );
};

export default Navbar;