import React from 'react';
import ScrambledText from './ScrambledText';

const Description = () => {
  return (
    <section className="w-full bg-transparent py-20 px-6 sm:px-12 lg:px-24 flex justify-center">
      <div className="w-full max-w-6xl px-0 sm:px-2">
        <ScrambledText
          className="m-0 text-gray-300 text-base md:text-lg lg:text-xl font-medium leading-relaxed text-left md:text-center"
          radius={100}
          duration={1.2}
          speed={0.5}
          scrambleChars=".:"
        >
          selamat datang di FINLITGO, platform belajar keuangan yang seru dan interaktif! Di sini, kamu bisa belajar literasi finansial dengan cara yang menyenangkan, mulai dari video animasi, podcast, hingga artikel yang mudah dipahami. Kami percaya bahwa belajar tentang uang tidak harus membosankan, dan dengan pendekatan kami yang unik, kamu akan merasa seperti sedang bermain sambil belajar. Bergabunglah dengan komunitas kami dan mulailah perjalananmu menuju kebebasan finansial hari ini!
        </ScrambledText>

        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          <div className="text-left md:text-center">
            <p className="text-3xl sm:text-4xl font-bold text-white">700%</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-400">Peningkatan Motivasi Belajar</p>
          </div>
          <div className="text-left md:text-center">
            <p className="text-3xl sm:text-4xl font-bold text-white">200+</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-400">Materi Interaktif</p>
          </div>
          <div className="text-left md:text-center">
            <p className="text-3xl sm:text-4xl font-bold text-white">50+</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-400">Podcast & Video</p>
          </div>
          <div className="text-left md:text-center">
            <p className="text-3xl sm:text-4xl font-bold text-white">10K+</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-400">Komunitas Pembelajar</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
