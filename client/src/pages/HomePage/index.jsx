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
      
      {/* Landing Page Content */}
      <div className="flex flex-col w-full">
        <Hero />
        <Description />
        <Problems />
        <HowItWorks />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
