import React from 'react';
import GradientBlinds from '../Background/GradientBlinds';

const Hero = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#141414] via-[#6D28D9] to-[#A78BFA] pt-[120px] pb-10 px-6 relative overflow-hidden">

      {/* GradientBlinds Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-90">
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}s
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="screen"
        />
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative w-full max-w-[1139px] md:h-[399px] rounded-[50px] border-[1.5px] border-white/30 bg-white/10 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-between shadow-2xl z-10 transition-transform duration-500 hover:scale-[1.01]">

        {/* Subtle inner highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-40 pointer-events-none rounded-[50px]"></div>

        <div className="relative max-w-3xl z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[64px] leading-[1.1] font-bold text-white mb-4 drop-shadow-sm">
            Manage Money In The Most <br className="hidden md:block" /> Fun Way
          </h1>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between flex-1 items-start md:items-end gap-6 border-transparent mt-4 md:mt-0">
          <p className="text-base md:text-lg lg:text-[19px] text-white font-medium max-w-xl leading-snug drop-shadow-sm pb-2">
            Belajar literasi finansial sambil nge-track pemasukan,
            target, dan quiz seru — khusus Gen Z.
          </p>
          <div className="pb-2">
            <button className="whitespace-nowrap px-8 py-3 bg-white/10 border border-white/30 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl text-[17px] flex items-center gap-2">
              Click now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
