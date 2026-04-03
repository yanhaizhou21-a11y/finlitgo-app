import React from 'react';

const Problems = () => {
  return (
    <section className="w-full bg-transparent py-24 px-6 md:px-12 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-16 max-w-lg">
        Masalah finansial yang kita hadapi bersama
      </h2>
      
      <div className="relative max-w-6xl w-full">
        {/* Shared glass panel behind all cards */}
        <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[#1a1b29]/55 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.35)]" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-center items-center px-6 py-8 md:px-8 md:py-10">
          {/* Card 1 */}
          <div className="group w-72 h-80 flex flex-col relative cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]">
            <div className="h-1/2 w-full rounded-2xl bg-gradient-to-br from-orange-400 to-purple-600 overflow-hidden relative transition-all duration-500 group-hover:brightness-110 group-hover:saturate-110">
              {/* Placeholder for image */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="h-1/2 w-full bg-white rounded-2xl -mt-6 relative z-10 flex items-center justify-center p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(16,16,32,0.35)]">
                 <div className="w-3/4 h-6 bg-purple-200 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group w-72 h-80 flex flex-col relative cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]">
            <div className="h-1/2 w-full rounded-2xl bg-gradient-to-br from-orange-400 to-purple-600 overflow-hidden relative transition-all duration-500 group-hover:brightness-110 group-hover:saturate-110">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="h-1/2 w-full bg-white rounded-2xl -mt-6 relative z-10 flex items-center justify-center p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(16,16,32,0.35)]">
                 <div className="w-3/4 h-6 bg-purple-200 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group w-72 h-80 flex flex-col relative cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]">
            <div className="h-1/2 w-full rounded-2xl bg-gradient-to-br from-orange-400 to-purple-600 overflow-hidden relative transition-all duration-500 group-hover:brightness-110 group-hover:saturate-110">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="h-1/2 w-full bg-white rounded-2xl -mt-6 relative z-10 flex items-center justify-center p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(16,16,32,0.35)]">
                 <div className="w-3/4 h-6 bg-purple-200 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
