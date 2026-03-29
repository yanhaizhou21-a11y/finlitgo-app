import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const navType = useNavigationType();
  // Gunakan null agar kita bisa mendeteksi "First Mount" (Reload/Ketik URL manual)
  const [prevPath, setPrevPath] = useState(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const curtainRef = useRef(null);
  const textRef = useRef(null);
  const isAnimating = useRef(false);

  useLayoutEffect(() => {
    // 1. Handling untuk First Mount (Klik Link di browser atau ketik URL manual)
    if (prevPath === null) {
      isAnimating.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          setPrevPath(location.pathname);
        }
      });

      // Tirai sudah ada di 0 (menutupi), kita langsung mainkan reveal
      tl.set(curtainRef.current, { top: 0, height: '100%' });
      tl.set(textRef.current, { opacity: 0, y: 30 });

      // Munculkan teks sebentar saja untuk menyapa
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      tl.to({}, { duration: 0.3 }); // Jeda sangat singkat

      tl.to(textRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: 'power2.in'
      });

      // Tirai naik ke atas (Reveal)
      tl.to(curtainRef.current, {
        top: '-100%',
        duration: 0.8,
        ease: 'power3.in'
      });
      return;
    }

    // 2. Jika path sama, hanya update data
    if (location.pathname === prevPath) {
      if (!isAnimating.current) {
        setDisplayChildren(children);
      }
      return;
    }

    // 3. Matikan transisi jika 'POP' (Back button) atau jika ada state 'noTransition'
    if (navType === 'POP' || location.state?.noTransition) {
      setPrevPath(location.pathname);
      setDisplayChildren(children);
      return;
    }

    // 4. Jalankan Transisi Penuh untuk navigasi internal
    const startTransition = () => {
      isAnimating.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          setPrevPath(location.pathname);
        }
      });

      tl.set(curtainRef.current, { top: '100%', height: '100%' });
      tl.set(textRef.current, { opacity: 0, y: 30 });

      tl.to(curtainRef.current, {
        top: 0,
        duration: 0.5, 
        ease: 'power3.out'
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => {
          setDisplayChildren(children);
          window.scrollTo(0, 0);
        }
      }, "-=0.1");

      tl.to({}, { duration: 0.4 }); 

      tl.to(textRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: 'power2.in'
      });

      tl.to(curtainRef.current, {
        top: '-100%',
        duration: 0.7,
        ease: 'power3.in'
      });
    };

    startTransition();
  }, [location.pathname, navType]); 

  useEffect(() => {
    if (!isAnimating.current && location.pathname === prevPath) {
      setDisplayChildren(children);
    }
  }, [children, location.pathname, prevPath]);

  return (
    <>
      <div className="w-full h-full">
        {displayChildren}
      </div>

      <div 
        ref={curtainRef}
        className="fixed left-0 right-0 w-full h-full z-[99999] flex flex-col items-center justify-center pointer-events-none"
        style={{ 
          // Default start at 0 agar saat reload langsung tertutup tirai
          top: prevPath === null ? 0 : '100%', 
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(45px)',
          WebkitBackdropFilter: 'blur(45px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div ref={textRef} className="text-white text-5xl md:text-7xl font-black tracking-tighter opacity-0">
          FINLITGO
        </div>
      </div>
    </>
  );
};

export default PageTransition;
