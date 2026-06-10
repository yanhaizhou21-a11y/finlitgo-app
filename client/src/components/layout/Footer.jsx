import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Footer = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

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

      {/* Top Heading */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-24 relative z-10" ref={titleRef}>
        <div className="flex flex-col">
          <p className="text-[10px] md:text-xs text-zinc-400 tracking-[0.2em] uppercase mb-6 md:mb-8 font-medium">
            Let's build work that inspires.
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[72px] font-medium leading-[1.05] tracking-tight text-white max-w-2xl mb-12 md:mb-0">
            Ready to build <br /> something bold?
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <a href="/class" className="group flex items-center gap-4 text-xs font-medium tracking-widest uppercase border-b border-zinc-700 pb-2 hover:border-white transition-colors duration-300 mt-8 md:mt-24">
            Explore Classes
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>

      {/* Grid Content */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10" ref={contentRef}>

        {/* Column 1: Copyright */}
        <div className="col-span-1 flex flex-col">
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase">©FINLITGO 2026</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="col-span-1 flex flex-col">
          <h3 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm text-zinc-300">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/class" className="hover:text-white transition-colors">Classes</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div className="col-span-1 flex flex-col">
          <h3 className="text-[10px] text-zinc-500 tracking-widest uppercase mb-6">Social</h3>
          <ul className="flex flex-col gap-3 text-sm text-zinc-300">
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
