import React from 'react';

const Hero = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#000000] via-[#7a46ff] to-[#9b51ff] pt-[100px] pb-8 relative">
      <div className="flex flex-col items-center text-center z-10 px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          Manage Money In The Most Fun Way
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-10">
          Belajar literasi finansial sambil nge-track pemasukan,
          target, dan quiz seru khusus Gen Z.
        </p>
        <button className="px-8 py-3 bg-white/20 border border-white/50 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/30 transition shadow-lg text-lg">
          Click now
        </button>
      </div>
    </main>
  );
};

export default Hero;
