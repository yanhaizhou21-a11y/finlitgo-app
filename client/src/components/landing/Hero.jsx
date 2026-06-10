import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import GradientBlinds from '../Background/GradientBlinds';
import GlassSurface from '../ui/GlassSurface';
import VariableProximity from '../ui/VariableProximity';
import { useAuth } from '../../store/AuthContext';
import { useTheme } from '../../store/ThemeContext';

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const heroContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
      );
      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleClickNow = () => {
    if (user) {
      navigate('/dashboard');
      return;
    }
    navigate('/login?redirect=/dashboard');
  };

  // Use the same gradient colors in both modes — only opacity differs
  const gradientColors = ['#FF9FFC', '#5227FF'];

  return (
    <main ref={heroContainerRef} className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-gradient-to-br dark:from-[#141414] dark:via-[#6D28D9] dark:to-[#A78BFA] pt-[120px] pb-10 px-6 relative overflow-hidden transition-colors duration-500">

      {/* GradientBlinds Background — same visual in both modes */}
      <div className={`absolute inset-0 z-0 pointer-events-none ${isDarkMode ? 'opacity-90' : 'opacity-70'}`}>
        <GradientBlinds
          gradientColors={gradientColors}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="screen"
        />
      </div>

      {/* Main GlassSurface Card */}
      <div className="relative w-full max-w-[1139px] z-10">
        <GlassSurface
          width="100%"
          height="auto"
          className="min-h-[399px] p-8 md:p-12 shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
          borderRadius={50}
          borderWidth={0.05}
          opacity={isDarkMode ? 0.9 : 0.95}
          backgroundOpacity={isDarkMode ? 0.05 : 0.15}
        >
          <div className="flex flex-col justify-between w-full h-full min-h-[300px]">
            <div className="relative max-w-3xl z-10" ref={titleRef}>
              <h1 className="text-4xl md:text-5xl lg:text-[64px] leading-[1.1] font-bold text-zinc-900 dark:text-white mb-4 drop-shadow-sm" style={{ fontFamily: '"Roboto Flex", sans-serif' }}>
                <VariableProximity
                  label="Manage Money In The Most Fun Way"
                  className="text-4xl md:text-5xl lg:text-[64px] leading-[1.1] font-bold text-zinc-900 dark:text-white"
                  fromFontVariationSettings="'wght' 400, 'wdth' 100"
                  toFontVariationSettings="'wght' 900, 'wdth' 125"
                  containerRef={heroContainerRef}
                  radius={100}
                  falloff="gaussian"
                />
              </h1>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between flex-1 items-start md:items-end gap-6 border-transparent mt-4 md:mt-0">
              <p ref={subtitleRef} className="text-base md:text-lg lg:text-[19px] text-zinc-700 dark:text-white font-medium max-w-xl leading-snug drop-shadow-sm pb-2">
                Belajar literasi finansial sambil nge-track pemasukan,
                target, dan quiz seru — khusus Gen Z.
              </p>
              <div className="pb-2" ref={buttonRef}>
                <button
                  type="button"
                  onClick={handleClickNow}
                  className="whitespace-nowrap px-8 py-3 bg-zinc-900 dark:bg-white/10 border border-zinc-800 dark:border-white/30 backdrop-blur-md rounded-full text-white font-medium hover:bg-zinc-800 dark:hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl text-[17px] flex items-center gap-2"
                >
                  Click now
                </button>
              </div>
            </div>
          </div>
        </GlassSurface>
      </div>
    </main>
  );
};

export default Hero;
