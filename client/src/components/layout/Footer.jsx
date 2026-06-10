import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Footer = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const hugeTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.fromTo(titleRef.current, 
              { opacity: 0, y: 40 }, 
              { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );
            gsap.fromTo(contentRef.current.children, 
              { opacity: 0, y: 20 }, 
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
            );
            gsap.fromTo(hugeTextRef.current, 
              { opacity: 0, scale: 0.95, y: 50 }, 
              { opacity: 0.05, scale: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
            );
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      return () => observer.disconnect();
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="w-full bg-[#111111] text-white pt-24 pb-8 px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col font-inter">
      
      {/* Top Text / Tagline */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-24 relative z-10" ref={titleRef}>
        <div className="flex flex-col">
          <p className="text-[10px] md:text-xs text-zinc-400 tracking-[0.2em] uppercase mb-6 md:mb-8 font-medium">
            Let's build work that inspires.
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[72px] font-medium leading-[1.05] tracking-tight text-white max-w-2xl mb-12 md:mb-0">
            Ready to build <br/> something bold?
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <p className="hidden md:block text-[10px] text-zinc-500 tracking-widest uppercase mb-auto">IDT → 20:03</p>
          <a href="#contact" className="group flex items-center gap-4 text-xs font-medium tracking-widest uppercase border-b border-zinc-700 pb-2 hover:border-white transition-colors duration-300 mt-8 md:mt-24">
            Start a collaboration
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>

      {/* Grid Content */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24 relative z-10" ref={contentRef}>
        
        {/* Column 1: Info */}
        <div className="col-span-1 md:col-span-2 flex flex-col">
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase mb-4">©FINLITGO 2026</p>
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase">SOUND ON ♪ HOVER THE LINES.</p>
        </div>

        {/* Column 2: Business */}
        <div className="col-span-1 flex flex-col">
          <h3 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-6">Business Enquiry</h3>
          <p className="text-sm text-zinc-300 mb-2">E: hello@finlitgo.com</p>
          <p className="text-sm text-zinc-300">P: +62 812-3456-7890</p>
        </div>

        {/* Column 3: Quick Links & Socials */}
        <div className="col-span-1 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <h3 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/class" className="hover:text-white transition-colors">Classes</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-6">Social</h3>
            <ul className="flex flex-col gap-3 text-sm text-zinc-300">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Huge Background Text */}
      <div className="w-full flex justify-center items-center pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden">
        <h1 
          ref={hugeTextRef} 
          className="text-[15vw] md:text-[18vw] leading-none font-bold text-white tracking-tighter opacity-5 select-none"
          style={{ marginBottom: '-3vw' }}
        >
          FINLITGO
        </h1>
      </div>
      
    </footer>
  );
};

export default Footer;