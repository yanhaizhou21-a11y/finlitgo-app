import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconArrowLeft,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconCheck,
  IconMenu2,
  IconX,
  IconBookmark,
  IconClock,
  IconTrophy,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { recordStudyActivity } from '../../utils/streak';

// ─────────────────────────────────────────────
// Data kelas (3 kelas berbeda, masing-masing
// punya 5 chapter dengan materi dummy)
// ─────────────────────────────────────────────
const CLASS_META = {
  1: { title: 'Money Management Basics', category: 'Foundation' },
  2: { title: 'Investing for Beginners', category: 'Growth' },
  3: { title: 'Crypto & Digital Assets', category: 'Advanced' },
};

const CHAPTERS = [
  {
    id: 'ch1',
    groupTitle: 'Persiapan Belajar',
    lessons: [
      {
        id: 'ch1-l1',
        title: 'Pengenalan Class',
        duration: '3 menit',
        content: {
          heading: 'Pengenalan Class',
          body: [
            'Selamat datang di FinLitGo! Di sini kamu akan belajar tentang literasi keuangan secara menyenangkan, interaktif, dan praktis. Sebelum memulai, mari kita kenali dulu bagaimana sistem belajar di platform ini bekerja.',
            'Setiap kelas dibagi menjadi beberapa chapter. Setiap chapter berisi materi yang bisa kamu baca secara mandiri. Setelah menyelesaikan satu chapter, kamu tinggal klik "Selanjutnya" untuk maju ke chapter berikutnya.',
            'Progress belajarmu akan tersimpan otomatis, jadi kamu bisa pause kapan saja dan lanjutkan di sesi berikutnya. Badge progress di sidebar akan menunjukkan sudah seberapa jauh perjalananmu.',
            'Yuk mulai belajar dan tingkatkan literasi keuanganmu bersama FinLitGo! 🚀',
          ],
          quote: '"Pendidikan adalah investasi terbaik yang bisa kamu lakukan untuk dirimu sendiri."',
        },
      },
    ],
  },
  {
    id: 'ch2',
    groupTitle: 'Dasar-Dasar Keuangan',
    lessons: [
      {
        id: 'ch2-l1',
        title: 'Apa Itu Keuangan Pribadi?',
        duration: '5 menit',
        content: {
          heading: 'Apa Itu Keuangan Pribadi?',
          body: [
            'Keuangan pribadi adalah cara kamu mengelola uang yang kamu miliki — mulai dari cara mendapatkan, menyimpan, membelanjakan, hingga menginvestasikannya. Memahami keuangan pribadi adalah fondasi penting dalam membangun kehidupan finansial yang sehat.',
            'Banyak orang mengabaikan pentingnya literasi keuangan karena dianggap rumit atau hanya untuk orang kaya. Padahal, semakin cepat kamu memahami cara kerja uang, semakin besar peluang kamu untuk mencapai kebebasan finansial.',
            'Ada beberapa pilar utama dalam keuangan pribadi: pendapatan, pengeluaran, tabungan, investasi, dan proteksi (asuransi). Kelima pilar ini saling berkaitan dan perlu dijaga keseimbangannya.',
            'Di chapter berikutnya, kita akan membahas bagaimana cara mengelola pengeluaran agar keuanganmu tetap sehat dan tidak boros.',
          ],
          quote: '"Jangan cari uang, cari ilmu — uang akan mengikuti dengan sendirinya."',
        },
      },
    ],
  },
  {
    id: 'ch3',
    groupTitle: 'Mengelola Pengeluaran',
    lessons: [
      {
        id: 'ch3-l1',
        title: 'Budgeting 101',
        duration: '6 menit',
        content: {
          heading: 'Budgeting 101: Kelola Uangmu Lebih Cerdas',
          body: [
            'Budgeting atau penganggaran adalah proses merencanakan bagaimana kamu akan menggunakan uangmu dalam periode tertentu. Dengan membuat anggaran, kamu bisa memastikan pengeluaranmu tidak melebihi pemasukanmu.',
            'Salah satu metode budgeting yang paling populer adalah aturan 50/30/20. Caranya: alokasikan 50% penghasilanmu untuk kebutuhan pokok (makan, tempat tinggal, transportasi), 30% untuk keinginan (hiburan, makan di luar, hobi), dan 20% sisanya untuk tabungan atau pelunasan utang.',
            'Langkah pertama membuat budget adalah mencatat semua pengeluaranmu selama satu bulan. Kamu bisa pakai aplikasi, spreadsheet, atau buku catatan. Setelah tahu ke mana uangmu pergi, kamu bisa mulai menyesuaikan porsinya.',
            'Ingat: budget bukan berarti kamu tidak boleh bersenang-senang. Budget justru memberimu kebebasan untuk menikmati uang tanpa rasa bersalah karena kamu sudah merencanakan segalanya.',
          ],
          quote: '"Jangan simpan sisa uang setelah belanja — sisihkan dulu tabungan, baru belanjakan yang tersisa." — Warren Buffett',
        },
      },
    ],
  },
  {
    id: 'ch4',
    groupTitle: 'Menabung & Investasi',
    lessons: [
      {
        id: 'ch4-l1',
        title: 'Tips Menabung Efektif',
        duration: '5 menit',
        content: {
          heading: 'Tips Menabung Efektif di Era Modern',
          body: [
            'Menabung adalah kebiasaan finansial paling dasar yang perlu dimiliki setiap orang. Namun banyak orang kesulitan menabung karena tidak punya strategi yang tepat. Berikut beberapa tips yang bisa langsung kamu terapkan.',
            'Pertama, gunakan sistem "pay yourself first" — segera pisahkan uang untuk tabungan begitu menerima gaji, sebelum membayar tagihan atau belanja apapun. Ini mengubah tabungan dari "sisa uang" menjadi prioritas utama.',
            'Kedua, buat rekening tabungan terpisah dari rekening sehari-hari. Ini membuat kamu tidak tergoda untuk menggunakan uang tabungan untuk pengeluaran rutin. Pilih rekening tabungan dengan bunga kompetitif dan tanpa biaya admin.',
            'Ketiga, manfaatkan teknologi. Banyak aplikasi perbankan sekarang punya fitur autosave atau round-up — setiap transaksi dibulatkan ke atas dan selisihnya masuk ke tabungan. Kecil-kecil tapi lama-lama jadi bukit!',
          ],
          quote: '"Sedikit demi sedikit, lama-lama menjadi bukit. Konsistensi adalah kunci dalam menabung."',
        },
      },
    ],
  },
  {
    id: 'ch5',
    groupTitle: 'Perencanaan Masa Depan',
    lessons: [
      {
        id: 'ch5-l1',
        title: 'Mulai Investasi Pertamamu',
        duration: '7 menit',
        content: {
          heading: 'Mulai Investasi Pertamamu Sekarang',
          body: [
            'Investasi adalah cara membuat uangmu bekerja untukmu. Berbeda dengan menabung yang hanya menyimpan uang, investasi menempatkan uangmu pada instrumen tertentu dengan harapan mendapatkan keuntungan di masa depan.',
            'Untuk pemula, ada beberapa instrumen investasi yang relatif aman dan mudah: reksa dana pasar uang (risiko rendah), obligasi pemerintah (ORI/SBR), reksa dana saham, dan saham langsung. Pilih yang sesuai dengan profil risiko dan tujuan keuanganmu.',
            'Konsep compounding atau bunga berbunga adalah alasan mengapa semakin cepat kamu mulai berinvestasi, semakin besar hasilnya. Contoh: investasi Rp 500.000/bulan dengan return 12% per tahun selama 20 tahun akan menghasilkan lebih dari Rp 450 juta.',
            'Mulailah dengan nominal kecil — bahkan Rp 10.000 sudah bisa dipakai untuk membeli reksa dana. Yang terpenting adalah konsistensi dan disiplin. Ingat: waktu di pasar jauh lebih penting daripada menunggu waktu yang tepat.',
          ],
          quote: '"Investasi terbaik adalah yang kamu mulai hari ini, bukan yang kamu rencanakan besok."',
        },
      },
    ],
  },
];

// Flatten semua lessons untuk navigasi prev/next
const ALL_LESSONS = CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, chapterId: ch.id }))
);

function getProgressKey(moduleId) {
  return `finlitgo_progress_class_${moduleId}`;
}

function loadProgress(moduleId) {
  try {
    const raw = localStorage.getItem(getProgressKey(moduleId));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveProgress(moduleId, completed) {
  localStorage.setItem(getProgressKey(moduleId), JSON.stringify([...completed]));
}

// ─────────────────────────────────────────────
// Komponen Utama
// ─────────────────────────────────────────────
export default function ClassDetailPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const classMeta = CLASS_META[moduleId] || CLASS_META[1];

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openChapters, setOpenChapters] = useState({ ch1: true }); // chapter pertama terbuka by default
  const [activeLessonId, setActiveLessonId] = useState('ch1-l1');
  const [completed, setCompleted] = useState(() => loadProgress(moduleId));

  useEffect(() => {
    recordStudyActivity();
  }, []);

  // Jika moduleId berubah (misal navigasi antar kelas), reload progress
  useEffect(() => {
    setCompleted(loadProgress(moduleId));
  }, [moduleId]);

  const activeLesson = ALL_LESSONS.find((l) => l.id === activeLessonId) || ALL_LESSONS[0];
  const activeLessonIndex = ALL_LESSONS.findIndex((l) => l.id === activeLessonId);
  const hasPrev = activeLessonIndex > 0;
  const hasNext = activeLessonIndex < ALL_LESSONS.length - 1;

  const progressCount = completed.size;
  const totalLessons = ALL_LESSONS.length;
  const progressPercent = Math.round((progressCount / totalLessons) * 100);

  const toggleChapter = (chId) => {
    setOpenChapters((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  const selectLesson = (lesson, chapterId) => {
    setActiveLessonId(lesson.id);
    // Pastikan chapter terbuka
    setOpenChapters((prev) => ({ ...prev, [chapterId]: true }));
  };

  const markCompleteAndNavigate = useCallback(
    (direction) => {
      // Tandai lesson saat ini sebagai selesai
      const newCompleted = new Set(completed);
      newCompleted.add(activeLessonId);
      setCompleted(newCompleted);
      saveProgress(moduleId, newCompleted);

      if (direction === 'next' && hasNext) {
        const nextLesson = ALL_LESSONS[activeLessonIndex + 1];
        setActiveLessonId(nextLesson.id);
        setOpenChapters((prev) => ({ ...prev, [nextLesson.chapterId]: true }));
      } else if (direction === 'prev' && hasPrev) {
        const prevLesson = ALL_LESSONS[activeLessonIndex - 1];
        setActiveLessonId(prevLesson.id);
        setOpenChapters((prev) => ({ ...prev, [prevLesson.chapterId]: true }));
      }
    },
    [activeLessonId, activeLessonIndex, completed, hasNext, hasPrev, moduleId]
  );

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#0a0a0a] text-white relative">

      {/* ── SIDEBAR ── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="shrink-0 overflow-hidden border-r border-zinc-800 bg-[#111111] flex flex-col"
            style={{ minHeight: '100%' }}
          >
            <div className="w-[320px] flex flex-col h-full">
              {/* Header Sidebar */}
              <div className="p-5 border-b border-zinc-800">
                <button
                  onClick={() => navigate('/class')}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 text-sm"
                >
                  <IconArrowLeft size={16} /> Kembali ke Kelas
                </button>
                <h2 className="text-sm font-bold text-white font-orbitron leading-snug mb-4">
                  {classMeta.title}
                </h2>

                {/* Progress Badge */}
                <div className="bg-[#1a1a2e] border border-violet-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconTrophy size={16} className="text-yellow-400" />
                      <span className="text-xs text-zinc-400 font-medium">Progress Belajar</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-violet-300">
                      {progressCount} / {totalLessons}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">{progressPercent}% selesai</p>
                </div>
              </div>

              {/* Daftar Chapter (Accordion) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {CHAPTERS.map((chapter, ci) => {
                  const isOpen = !!openChapters[chapter.id];
                  const allLessonsInChapter = chapter.lessons;
                  const allDone = allLessonsInChapter.every((l) => completed.has(l.id));

                  return (
                    <div key={chapter.id} className="rounded-xl overflow-hidden border border-zinc-800/80">
                      {/* Chapter Header (Dropdown Toggle) */}
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-800/80 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          {/* Nomor / Centang Chapter */}
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              allDone
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                            }`}
                          >
                            {allDone ? <IconCheck size={14} /> : ci + 1}
                          </div>
                          <span className="text-sm font-semibold text-white leading-tight">
                            {chapter.groupTitle}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconChevronDown size={16} className="text-zinc-500" />
                        </motion.div>
                      </button>

                      {/* Lesson Items */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="lessons"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            {allLessonsInChapter.map((lesson) => {
                              const isActive = activeLessonId === lesson.id;
                              const isDone = completed.has(lesson.id);

                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => selectLesson(lesson, chapter.id)}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-t border-zinc-800/60 transition-all ${
                                    isActive
                                      ? 'bg-violet-600/20 border-l-2 border-l-violet-500'
                                      : 'hover:bg-zinc-800/50'
                                  }`}
                                >
                                  {/* Status Icon */}
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                      isDone
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : isActive
                                        ? 'bg-violet-500/30 border border-violet-500/50'
                                        : 'bg-zinc-800 border border-zinc-700'
                                    }`}
                                  >
                                    {isDone ? (
                                      <IconCheck size={11} />
                                    ) : isActive ? (
                                      <div className="w-2 h-2 rounded-full bg-violet-400" />
                                    ) : null}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-xs font-medium truncate ${
                                        isActive
                                          ? 'text-violet-300'
                                          : isDone
                                          ? 'text-zinc-300'
                                          : 'text-zinc-400'
                                      }`}
                                    >
                                      {lesson.title}
                                    </p>
                                    <p className="text-[10px] text-zinc-600 mt-0.5 flex items-center gap-1">
                                      <IconClock size={10} /> {lesson.duration}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── KONTEN UTAMA ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Bar */}
        <div className="h-14 px-6 border-b border-zinc-800 bg-[#0f0f0f] flex items-center gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title={sidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
          >
            {sidebarOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </button>
          <div className="h-4 w-px bg-zinc-700" />
          <span className="text-xs text-zinc-500 font-mono">
            {classMeta.category} · {classMeta.title}
          </span>
        </div>

        {/* Artikel / Materi */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLessonId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto px-6 py-12"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-6">
                <IconBookmark size={12} className="text-violet-400" />
                <span>{CHAPTERS.find((c) => c.lessons.some((l) => l.id === activeLessonId))?.groupTitle}</span>
                <IconChevronRight size={12} />
                <span className="text-violet-300">{activeLesson.title}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-3 leading-tight">
                {activeLesson.content.heading}
              </h1>
              <p className="text-zinc-500 text-sm font-mono mb-10 flex items-center gap-2">
                <IconClock size={14} /> Estimasi baca: {activeLesson.duration}
              </p>

              <div className="space-y-6 text-zinc-300 text-base leading-relaxed">
                {activeLesson.content.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Quote Block */}
              <div className="my-10 bg-zinc-900 border-l-4 border-violet-500 p-6 rounded-r-xl">
                <p className="text-white italic text-base">{activeLesson.content.quote}</p>
              </div>

              {/* Status completion hint */}
              {completed.has(activeLessonId) && (
                <div className="flex items-center gap-3 mt-6 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                  <IconCheck size={18} className="text-green-400 shrink-0" />
                  <span className="text-sm text-green-300 font-medium">Materi ini sudah kamu selesaikan!</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="h-20 border-t border-zinc-800 bg-[#0f0f0f] px-6 flex items-center justify-between shrink-0">
          <button
            onClick={() => markCompleteAndNavigate('prev')}
            disabled={!hasPrev}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              hasPrev
                ? 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                : 'text-zinc-700 cursor-not-allowed'
            }`}
          >
            <IconChevronLeft size={18} />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          {/* Center: lesson tracker */}
          <span className="text-xs text-zinc-500 font-mono hidden sm:block">
            {activeLessonIndex + 1} / {ALL_LESSONS.length} materi
          </span>

          {hasNext ? (
            <button
              onClick={() => markCompleteAndNavigate('next')}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5"
            >
              <span>Selanjutnya</span>
              <IconChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => markCompleteAndNavigate('next')}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(34,197,94,0.4)] transition-all hover:-translate-y-0.5"
            >
              <IconCheck size={18} />
              <span>Selesai</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
