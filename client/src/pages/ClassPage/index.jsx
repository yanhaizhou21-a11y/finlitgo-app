import React from 'react';
import Navbar from '../../components/layout/Navbar';

export default function ClassPage() {
  return (
    <div className="min-h-screen bg-[#1b0b3b] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-white text-3xl font-light">
        Class Page
      </div>
    </div>
  );
}
