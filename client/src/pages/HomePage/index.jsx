import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Hero from '../../components/landing/Hero';
import Description from '../../components/landing/Description';
import Problems from '../../components/landing/Problems';
import HowItWorks from '../../components/landing/HowItWorks';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <Navbar />

      {/* Landing Background From Hero To Footer */}
      <div className="relative flex flex-col w-full overflow-hidden bg-[#070910]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#06070c_0%,#080a12_38%,#090b14_64%,#1a1540_84%,#5e2bd6_100%)]" />
          <div className="absolute bottom-[-260px] left-1/2 h-[680px] w-[1600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,72,255,0.85)_0%,rgba(124,72,255,0.48)_42%,rgba(12,10,24,0)_80%)] blur-3xl" />
          <div className="absolute bottom-[-80px] left-1/2 h-[240px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(190,165,255,0.35)_0%,rgba(190,165,255,0)_75%)] blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col w-full">
          <Hero />
          <div className="pointer-events-none -mt-14 h-24 bg-[linear-gradient(to_bottom,rgba(10,10,10,0)_0%,rgba(62,38,140,0.34)_50%,rgba(10,10,10,0)_100%)]" />
          <Description />
          <Problems />
          <HowItWorks />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
