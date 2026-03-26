import React from 'react';
import Navbar from '../../components/layout/Navbar';

export default function BlogPage() {
  return (
    <div className="site-mockup-bg min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-white text-3xl font-light">
        Blog Page
      </div>
    </div>
  );
}
