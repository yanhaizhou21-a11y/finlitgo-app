import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function BlogPage() {
  return (
    <div className="site-mockup-bg w-full min-h-screen text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Placeholder content that is tall enough to scroll */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[150vh]">
        <h1 className="text-white text-3xl font-light tracking-widest opacity-20 uppercase">
          Blog Page Placeholder
        </h1>
      </div>

      <Footer />
    </div>
  );
}
