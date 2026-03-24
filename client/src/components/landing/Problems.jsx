import React from 'react';

const Problems = () => {
  return (
    <section className="w-full bg-[#18181A] py-24 px-6 md:px-12 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-16 max-w-lg">
        Masalah finansial yang kita hadapi bersama
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-6xl w-full">
        {/* Card 1 */}
        <div className="bg-[#2A2A2E] rounded-3xl p-3 w-72 h-80 flex flex-col relative shadow-xl border border-white/5">
          <div className="h-1/2 w-full rounded-2xl bg-gradient-to-br from-orange-400 to-purple-600 overflow-hidden relative">
            {/* Placeholder for image */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="h-1/2 w-full bg-white rounded-2xl -mt-6 relative z-10 flex items-center justify-center p-4">
               <div className="w-3/4 h-6 bg-purple-200 rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#2A2A2E] rounded-3xl p-3 w-72 h-80 flex flex-col relative shadow-xl border border-white/5">
          <div className="h-1/2 w-full rounded-2xl bg-gradient-to-br from-orange-400 to-purple-600 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="h-1/2 w-full bg-white rounded-2xl -mt-6 relative z-10 flex items-center justify-center p-4">
               <div className="w-3/4 h-6 bg-purple-200 rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#2A2A2E] rounded-3xl p-3 w-72 h-80 flex flex-col relative shadow-xl border border-white/5">
          <div className="h-1/2 w-full rounded-2xl bg-gradient-to-br from-orange-400 to-purple-600 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="h-1/2 w-full bg-white rounded-2xl -mt-6 relative z-10 flex items-center justify-center p-4">
               <div className="w-3/4 h-6 bg-purple-200 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
