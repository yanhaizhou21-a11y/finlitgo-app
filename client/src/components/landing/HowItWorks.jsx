import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      num: '1',
      title: 'Sign Up',
      desc: 'Buat akun gratis, pakai email atau sosial media.',
      href: '/replace-with-url-sign-up'
    },
    {
      num: '2',
      title: 'Take Financial Survey',
      desc: 'Kenali level literasimu dengan asesmen singkat.',
      href: '/replace-with-url-survey'
    },
    {
      num: '3',
      title: 'Learn & Practice',
      desc: 'Ikuti kelas dan belajar uang langsung di dashboard.',
      href: '/replace-with-url-learn-practice'
    },
    {
      num: '4',
      title: 'Track Your Progress',
      desc: 'Lihat grafik perkembangan finansialmu.',
      href: '/replace-with-url-track-progress'
    }
  ];

  return (
    <section className="w-full py-24 px-6 md:px-12 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
        How FinLitGo Works
      </h2>
      <p className="text-gray-400 text-sm md:text-base text-center mb-16">
        Dari daftar sampai jadi master keuangan cuma <span className="font-bold text-white">4 langkah</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {steps.map((step, idx) => (
          <a
            key={idx} 
            href={step.href}
            className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
            aria-label={`Buka halaman ${step.title}`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-6 shadow-inner">
              {step.num}
            </div>
            <h3 className="text-[#1a1a24] font-bold text-xl mb-3">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
