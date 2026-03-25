import React from 'react';
import PrismaticBurst from '../../components/Background/PrismaticBurst';
import AuthContainer from '../../components/Auth/AuthContainer';

const AuthPage = () => {
  return (
    <div className="flex min-h-screen bg-white text-black font-sans lg:p-4">
      {/* Left Column (Image/Animated Background Area) - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-black text-white rounded-[40px] shadow-2xl z-10 w-full">
        <div className="absolute inset-0 z-0 opacity-90">
          <PrismaticBurst
            animationType="rotate3d"
            intensity={2}
            speed={0.5}
            distort={0}
            paused={false}
            offset={{ x: 0, y: 0 }}
            hoverDampness={0.25}
            rayCount={0}
            mixBlendMode="lighten"
            colors={['#ff007a', '#4d3dff', '#ffffff']}
          />
        </div>
        
        {/* Top left text */}
        <div className="relative z-10 text-sm font-semibold tracking-widest uppercase flex items-center gap-4">
          A WISE QUOTE <div className="h-px bg-white/40 w-16"></div>
        </div>

        {/* Bottom left text */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-[3.5rem] leading-[1.1] font-serif mb-6 drop-shadow-lg">
            Get<br/>
            Everything<br/>
            You Want
          </h1>
          <p className="text-gray-300 text-base font-light leading-relaxed">
            You can get everything you want if you work hard, trust the process, and stick to the plan.
          </p>
        </div>
      </div>

      {/* Right Column (Form Area) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative overflow-y-auto">
        
        {/* Logo/Brand at top-center */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2 text-xl font-semibold">
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           Cogie
        </div>

        <div className="w-full max-w-md mt-16 lg:mt-0">
          <AuthContainer />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
