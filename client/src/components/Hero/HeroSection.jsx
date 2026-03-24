import { motion } from 'framer-motion';

const HeroSection = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 px-4 md:px-8 overflow-hidden">
      {/* Semi-transparent dark blur overlay covering the LiquidChrome background slightly */}
      <div className="absolute inset-0 z-0 backdrop-blur-md bg-black/30 pointer-events-none" />

      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-6xl">
        {/* Hero Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1 text-center lg:text-left text-white max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg leading-tight">
            Unlock the Future with <span className="text-[#0ea5a4]">Liquid Chrome</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-200 mb-8 drop-shadow-sm leading-relaxed">
            Experience next-generation authentication featuring seamless WebGL fluid backgrounds and modern glassmorphism design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="px-8 py-3.5 bg-[#0ea5a4] hover:bg-[#0c8f8e] transition-all rounded-full font-semibold shadow-lg hover:shadow-[0_10px_20px_rgba(14,165,164,0.3)] hover:-translate-y-0.5 duration-200">
              Get Started
            </button>
            <button className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all rounded-full font-semibold shadow-lg hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)] hover:-translate-y-0.5 duration-200">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Auth Card Overlay Area */}
        <div className="flex-1 w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
