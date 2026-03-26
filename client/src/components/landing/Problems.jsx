import React from 'react';
import { Link } from 'react-router-dom';
import problemExpenseImage from '../../assets/landing/problem-expense.svg';
import problemSavingImage from '../../assets/landing/problem-saving.svg';
import problemPlanImage from '../../assets/landing/problem-plan.svg';

const Problems = () => {
  const problemCards = [
    {
      id: 'expense',
      image: problemExpenseImage,
      alt: 'Ilustrasi tantangan pengeluaran bulanan',
      title: 'Pengeluaran Sulit Dikontrol',
      description: 'Tagihan kecil yang berulang bikin uang cepat habis tanpa terasa.',
      href: '/blog?topic=expense',
    },
    {
      id: 'saving',
      image: problemSavingImage,
      alt: 'Ilustrasi progres kebiasaan menabung',
      title: 'Menabung Tidak Konsisten',
      description: 'Niat menabung sering kalah dengan kebutuhan mendadak dan impuls belanja.',
      href: '/blog?topic=saving',
    },
    {
      id: 'planning',
      image: problemPlanImage,
      alt: 'Ilustrasi rencana finansial jangka panjang',
      title: 'Belum Punya Rencana Jelas',
      description: 'Tujuan finansial jangka panjang terasa jauh karena belum ada roadmap.',
      href: '/blog?topic=planning',
    },
  ];

  return (
    <section className="w-full py-24 px-6 md:px-12 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-16 max-w-lg">
        Masalah finansial yang kita hadapi bersama
      </h2>

      <div className="relative rounded-[2rem] border border-white/20 bg-white/10 p-4 md:p-5 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/20 to-white/5"></div>
        <div className="relative flex flex-col md:flex-row gap-8 justify-center items-center max-w-6xl w-full">
          {problemCards.map((card) => {
            return (
              <Link
                key={card.id}
                to={card.href}
                className="group w-72 h-80 text-left rounded-3xl p-3 flex flex-col relative border transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 bg-[#2A2A2E] border-white/10 shadow-xl hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_10px_24px_rgba(0,0,0,0.5)]"
                aria-label={card.title}
              >
                <div className="h-1/2 w-full rounded-2xl overflow-hidden relative">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="h-1/2 w-full bg-white rounded-2xl -mt-6 relative z-10 flex flex-col items-start justify-center p-5">
                  <h3 className="text-[#1F1F24] font-semibold text-base">{card.title}</h3>
                  <p className="text-[#52525B] text-sm mt-2 leading-relaxed line-clamp-3">{card.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Problems;
