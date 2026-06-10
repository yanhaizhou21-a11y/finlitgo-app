import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sections = [
  {
    eyebrow: 'STEP 1',
    title: 'Daftar & Test Literasi Finansialmu',
    description:
      'Mulai perjalanan finansialmu dengan membuat akun gratis. Ikuti financial survey singkat untuk mengetahui level pemahaman keuanganmu saat ini.',
    bullets: ['Daftar mudah', 'Test literasi gratis', 'Hasil instan'],
    visualLabel: 'Assessment Result',
    visualTitle: 'Lihat analisis level keuanganmu',
    visualNote: 'Dashboard menampilkan skor literasi finansial dan rekomendasi topik untuk dipelajari.',
    imageSrc: '/assets/how-it-works/Step1.png',
    imageAlt: 'Step 1 preview',
    imagePosition: 'center center',
    ctaPath: '/class',
    ctaLabel: 'Mulai Kelas',
    theme: 'violet',
    reverse: false
  },
  {
    eyebrow: 'STEP 2',
    title: 'Belajar Sambil Bertransaksi',
    description:
      'Akses ribuan kelas, artikel, dan podcast tentang keuangan. Pelajari topik dari basic money management hingga investing strategy dengan materi yang fun dan mudah dipahami.',
    bullets: ['Materi interaktif', 'Video & podcast', 'Praktik langsung'],
    visualLabel: 'Learning Hub',
    visualTitle: 'Kelas & materi menarik menanti',
    visualNote: 'Pilih dari berbagai topik finansial dan pelajari dengan pace yang nyaman untuk kamu.',
    imageSrc: '/assets/how-it-works/Step2.png',
    imageAlt: 'Step 2 preview',
    imagePosition: 'center center',
    ctaPath: '/blog',
    ctaLabel: 'Baca Artikel',
    theme: 'amber',
    reverse: true
  },
  {
    eyebrow: 'STEP 3',
    title: 'Track Progress & Dapatkan Reward',
    description:
      'Monitor kemajuan belajarmu via dashboard yang detail. Ikuti quiz, selesaikan challenges, dan kumpulkan badge untuk unlock fitur premium.',
    bullets: ['Progress tracking realtime', 'Gamification rewards', 'Community competition'],
    visualLabel: 'Dashboard Analytics',
    visualTitle: 'Monitor financial journey-mu',
    visualNote: 'Lihat statistik pembelajaran, streak, dan achievement yang sudah diraih.',
    imageSrc: '/assets/how-it-works/Step3.png',
    imageAlt: 'Step 3 preview',
    imagePosition: 'center center',
    ctaPath: '/dashboard',
    ctaLabel: 'Buka Dashboard',
    theme: 'emerald',
    reverse: false
  },
  {
    eyebrow: 'STEP 4',
    title: 'Gunakan AI Assistant untuk bantu belajar',
    description:
      'Tanya apa saja soal budgeting, tabungan, investasi, atau keputusan finansial sehari-hari. AI Assistant siap bantu kamu lebih cepat paham dan ambil keputusan yang lebih baik.',
    bullets: ['Tanya jawab instan', 'Bantu budgeting', 'Saran finansial personal'],
    visualLabel: 'AI Assistant',
    visualTitle: 'Belajar lebih cepat dengan bantuan AI',
    visualNote: 'Masukkan screenshot AI Assistant di sini atau ganti dengan gambar baru saat sudah siap.',
    imageSrc: '/assets/how-it-works/Step4.png',
    imageAlt: 'Step 4 preview',
    imagePosition: 'center center',
    ctaPath: '/ai-assist',
    ctaLabel: 'Coba AI Assistant',
    theme: 'cyan',
    reverse: true
  }
];

function StepMedia({ section }) {
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    if (!section.imageSrc) {
      setHasImageError(true);
      return;
    }

    let isActive = true;
    const probe = new Image();

    probe.onload = () => {
      if (isActive) setHasImageError(false);
    };

    probe.onerror = () => {
      if (isActive) setHasImageError(true);
    };

    probe.src = `${section.imageSrc}?v=${Date.now()}`;

    return () => {
      isActive = false;
    };
  }, [section.imageSrc]);

  return (
    <div className="rounded-[28px] border border-zinc-200 dark:border-white/10 bg-zinc-50/90 dark:bg-[#0d0f16]/85 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
      <div className="overflow-hidden rounded-[22px] border border-zinc-100 dark:border-white/5 bg-white dark:bg-[#11131d]">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-[#0f1118] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-white/50">
            Preview
          </span>
        </div>

        <div className="relative h-[320px] overflow-hidden bg-zinc-100 dark:bg-[#05070d] sm:h-[360px]">
            {section.imageSrc && !hasImageError ? (
              <img
                src={section.imageSrc}
                alt={section.imageAlt}
                className="h-full w-full object-cover"
                style={{ objectPosition: section.imagePosition }}
                onError={() => setHasImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100 dark:from-[#0d1120] dark:via-[#14173a] dark:to-[#22164a] p-5 text-center">
                <div className="rounded-2xl border border-zinc-200 dark:border-white/20 bg-zinc-100 dark:bg-white/10 px-6 py-4 text-sm text-zinc-700 dark:text-white/80 backdrop-blur-sm">
                  Gambar untuk {section.eyebrow} belum tersedia.
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-transparent py-24 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-white/15 bg-zinc-100 dark:bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.28em] text-zinc-600 dark:text-white/70">
            HOW FINLITGO WORKS
          </p>
          <h2 className="mt-6 text-3xl md:text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight">
            Mulai Perjalanan Finansialmu Hari Ini
          </h2>
          <p className="mt-4 text-base md:text-lg text-zinc-600 dark:text-white/70 leading-relaxed">
            Empat langkah sederhana untuk memulai transformasi finansial. Dari assessment awal hingga AI Assistant, semuanya dirancang untuk Gen Z.
          </p>
        </div>

        <div className="space-y-14 md:space-y-20">
          {sections.map((section, index) => (
            <article
              key={`${section.title}-${index}`}
              className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center ${section.reverse ? 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1' : ''}`}
            >
              <div className={section.reverse ? 'lg:pl-6' : 'lg:pr-6'}>
                <p className="inline-flex rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/25 px-4 py-2 text-[10px] font-semibold tracking-[0.28em] text-zinc-500 dark:text-white/75 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                  {section.eyebrow}
                </p>

                <h3 className="mt-6 text-3xl md:text-4xl font-medium text-zinc-900 dark:text-white leading-tight max-w-xl">
                  {section.title}
                </h3>

                <p className="mt-5 max-w-xl text-base md:text-lg leading-8 text-zinc-600 dark:text-white/70">
                  {section.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {section.bullets.map((bullet) => (
                    <span
                      key={bullet}
                      className="rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-4 py-2 text-sm text-zinc-700 dark:text-white/80"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => navigate(section.ctaPath)}
                  className="mt-10 inline-flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white transition-transform duration-300 hover:translate-x-1"
                >
                  {section.ctaLabel}
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              <div className={section.reverse ? 'lg:pr-6' : 'lg:pl-6'}>
                <StepMedia section={section} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
