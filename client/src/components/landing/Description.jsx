import React from 'react';
import ScrambledText from './ScrambledText';

const Description = () => {
  return (
    <section className="w-full bg-transparent py-20 px-6 sm:px-12 lg:px-24 flex justify-center text-left md:text-center">
      <ScrambledText
        className="m-0 max-w-4xl text-gray-300 text-base md:text-lg lg:text-xl font-medium leading-relaxed"
        radius={100}
        duration={1.2}
        speed={0.5}
        scrambleChars=".:"
      >
        selamat datang di FINLITGO, platform belajar keuangan yang seru dan interaktif! Di sini, kamu bisa belajar literasi finansial dengan cara yang menyenangkan, mulai dari video animasi, podcast, hingga artikel yang mudah dipahami. Kami percaya bahwa belajar tentang uang tidak harus membosankan, dan dengan pendekatan kami yang unik, kamu akan merasa seperti sedang bermain sambil belajar. Bergabunglah dengan komunitas kami dan mulailah perjalananmu menuju kebebasan finansial hari ini!
      </ScrambledText>
    </section>
  );
};

export default Description;
