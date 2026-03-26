import React from 'react';

const Hero = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center pt-[120px] pb-10 px-6 relative overflow-hidden">
      
      {/* Search Bar - aligned right above the hero card */}
      <div className="w-full max-w-[1139px] flex justify-end mb-6 z-10">
        <div className="relative w-[280px]">
          <input 
            type="text"   
            placeholder="search" 
            className="w-full bg-white/40 backdrop-blur-md rounded-full py-2.5 px-6 pr-10 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 shadow-inner"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
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
