// MODULE 1: FINANCIAL FOUNDATION & MINDSET (/class/1)
// ═══════════════════════════════════════════════════════════════
const CLASS_1_LEVELS = [
  // ── LEVEL 1: MINDSET & FONDASI DASAR ──
  {
    id: 'level-1',
    title: 'Mindset & Fondasi Dasar',
    description: 'Ubah cara pandangmu terhadap uang dan bangun fondasi finansial yang kokoh.',
    items: [
      {
        id: 'c1-l1-video', type: 'video', title: 'Video: Psikologi Uang & Mindset Kaya', duration: '10 menit',
        videoId: 'p7HKvqRI_Bo',
        description: 'Belajar bagaimana mindset mempengaruhi keputusan finansialmu dan cara membangun kebiasaan uang yang sehat.',
        transcript: [
          { time: '00:00', text: 'Selamat datang di FinLitGo! Hari ini kita akan membahas hal yang paling krusial: Mindset.' },
          { time: '02:30', text: 'Banyak orang gagal bukan karena kurang ilmu, tapi karena mindset yang salah tentang uang.' },
          { time: '05:00', text: 'Uang itu alat, bukan tujuan akhir. Kita harus mengendalikan uang, bukan sebaliknya.' },
          { time: '08:00', text: 'Langkah pertama adalah menyadari kebiasaan belanja impulsif kita.' },
        ],
      },
      {
        id: 'c1-l1-1', type: 'lesson', title: 'Kenapa Literasi Keuangan Penting?', duration: '8 menit',
        content: {
          heading: 'Literasi Keuangan: Skill Bertahan Hidup Abad 21',
          body: [
            'Literasi keuangan bukan cuma soal menghitung uang, tapi memahami bagaimana uang bekerja di dunia nyata.',
            'Tanpa literasi keuangan, sebesar apapun gaji kamu, uang itu akan selalu terasa kurang.',
          ],
        },
      },
      {
        id: 'c1-l1-2', type: 'lesson', title: 'Mengenal Kebutuhan vs Keinginan', duration: '7 menit',
        content: {
          heading: 'Kebutuhan vs Keinginan: Mana yang Harus Didahului?',
          body: [
            'Kebutuhan adalah hal-hal esensial untuk hidup (makan, tempat tinggal, kesehatan).',
            'Keinginan adalah hal-hal yang membuat hidup lebih nyaman tapi tidak esensial (gadget baru, kopi kekinian).',
          ],
        },
      },
      {
        id: 'c1-l1-quiz', type: 'in-lesson-quiz', title: 'Quiz Mindset Dasar',
        questions: [
          { question: 'Apa itu uang menurut mindset finansial yang benar?', options: ['Tujuan hidup', 'Alat untuk mencapai tujuan', 'Sumber kejahatan', 'Kertas biasa'], correctAnswer: 1 },
          { question: 'Manakah yang termasuk kebutuhan esensial?', options: ['Netflix subscription', 'Beli kopi tiap hari', 'Biaya kesehatan/asuransi', 'Skin game terbaru'], correctAnswer: 2 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c1-l1-checkpoint', title: 'Checkpoint Level 1: Mindset', questionCount: 5, duration: '5 menit',
      description: 'Tes pemahamanmu tentang mindset dan dasar keuangan.',
      questions: [
        { question: 'Financial freedom artinya...', options: ['Punya banyak hutang', 'Passive income > Biaya hidup', 'Gaji 100 juta', 'Bisa beli apa saja'], correctAnswer: 1 },
        { question: 'Langkah awal mengatur keuangan adalah...', options: ['Investasi saham', 'Mencatat pengeluaran', 'Beli mobil', 'Ganti HP'], correctAnswer: 1 },
        { question: 'Bedanya aset dan liabilitas adalah...', options: ['Aset bikin kaya, liabilitas bikin miskin', 'Aset kasih uang masuk, liabilitas narik uang keluar', 'Tidak ada bedanya', 'Aset itu rumah, liabilitas itu mobil'], correctAnswer: 1 },
        { question: 'Kenapa Gen Z sulit menabung?', options: ['Gaji kecil', 'Gaya hidup/FOMO', 'Inflasi', 'Semua benar'], correctAnswer: 3 },
        { question: 'Uang dingin adalah...', options: ['Uang dari kulkas', 'Uang yang tidak digunakan dalam waktu dekat', 'Uang koin', 'Uang sisa kembalian'], correctAnswer: 1 },
      ],
    },
  },
  // ── LEVEL 2: MONEY MANAGEMENT BASICS ──
  {
    id: 'level-2',
    title: 'Money Management Basics',
    description: 'Kuasai seni mengalokasikan uang dengan metode yang sudah terbukti.',
    items: [
      {
        id: 'c1-l2-1', type: 'lesson', title: 'Metode Budgeting 50/30/20', duration: '9 menit',
        content: {
          heading: 'Alokasi Gaji yang Ideal',
          body: [
            '50% untuk Kebutuhan Pokok (Needs).',
            '30% untuk Keinginan/Gaya Hidup (Wants).',
            '20% untuk Tabungan dan Investasi (Savings).',
          ],
        },
      },
      {
        id: 'c1-l2-2', type: 'lesson', title: 'Cara Membuat Laporan Keuangan Simple', duration: '10 menit',
        content: {
          heading: 'Tracking Uang Keluar',
          body: [
            'Gunakan aplikasi atau spreadsheet untuk mencatat setiap rupiah yang keluar.',
            'Evaluasi mingguan untuk melihat kebocoran anggaran.',
          ],
        },
      },
      {
        id: 'c1-l2-3', type: 'lesson', title: 'The Power of Small Habit (Latte Factor)', duration: '8 menit',
        content: {
          heading: 'Latte Factor: Pengeluaran Kecil yang Mematikan',
          body: [
            'Kopi Rp 40rb/hari x 30 hari = Rp 1.2 juta/bulan.',
            'Bayangkan jika uang itu diinvestasikan selama 10 tahun.',
          ],
        },
      },
      {
        id: 'c1-l2-quiz', type: 'in-lesson-quiz', title: 'Quiz Budgeting',
        questions: [
          { question: 'Dalam metode 50/30/20, berapa persen untuk keinginan?', options: ['50%', '30%', '20%', '10%'], correctAnswer: 1 },
          { question: 'Apa yang dimaksud Latte Factor?', options: ['Hobi minum kopi', 'Pengeluaran kecil rutin yang tidak disadari', 'Pajak minuman', 'Gaya hidup mewah'], correctAnswer: 1 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c1-l2-checkpoint', title: 'Checkpoint Level 2: Management', questionCount: 5, duration: '5 menit',
      description: 'Tes kemampuan mengelola anggaran.',
      questions: [
        { question: 'Prinsip utama menabung yang benar adalah...', options: ['Sisa belanja baru nabung', 'Nabung dulu baru belanja (Pay Yourself First)', 'Nabung kalau ingat', 'Nabung uang koin saja'], correctAnswer: 1 },
        { question: 'Contoh kebocoran halus (Latte Factor) adalah...', options: ['Biaya admin bank & subscription yang tidak dipakai', 'Beli beras', 'Bayar kos', 'Beli bensin'], correctAnswer: 0 },
        { question: 'Needs (50%) meliputi...', options: ['Nonton konser', 'Makan & Transportasi kerja', 'Beli sepatu basket', 'Top up game'], correctAnswer: 1 },
        { question: 'Budgeting membantu kita untuk...', options: ['Pelit', 'Tahu ke mana uang pergi, bukan bertanya ke mana uangnya', 'Membatasi kebahagiaan', 'Jadi kaya dalam semalam'], correctAnswer: 1 },
        { question: 'Aplikasi pencatat keuangan berguna untuk...', options: ['Pajangan', 'Melihat histori pengeluaran secara real-time', 'Dapat uang gratis', 'Meminjam uang'], correctAnswer: 1 },
      ],
    },
  },
  // ── LEVEL 3: PROTEKSI & DANA DARURAT ──
  {
    id: 'level-3',
    title: 'Proteksi & Dana Darurat',
    description: 'Siapkan jaring pengaman agar rencana finansialmu tidak berantakan saat badai datang.',
    items: [
      {
        id: 'c1-l3-1', type: 'lesson', title: 'Dana Darurat: Fondasi Anti Panik', duration: '9 menit',
        content: {
          heading: 'Emergency Fund: Kenapa Kamu Butuh?',
          body: [
            'Dana darurat adalah uang yang disisihkan khusus untuk kejadian tak terduga (sakit, PHK, motor rusak).',
            'Minimal 3-6 kali pengeluaran bulanan untuk yang masih single.',
          ],
        },
      },
      {
        id: 'c1-l3-2', type: 'lesson', title: 'Asuransi & BPJS 101', duration: '8 menit',
        content: {
          heading: 'Transfer Risiko: Kenapa Kita Perlu Proteksi?',
          body: [
            'Asuransi bukan investasi, asuransi adalah biaya untuk melindungi aset kamu.',
            'Minimal memiliki BPJS Kesehatan agar tabungan tidak habis saat sakit keras.',
          ],
        },
      },
      {
        id: 'c1-l3-3', type: 'lesson', title: 'Menjaga Cashflow Tetap Positif', duration: '10 menit',
        content: {
          heading: 'Positive Cashflow: Income > Spending',
          body: [
            'Fokus meningkatkan income atau memangkas spending untuk menjaga surplus.',
            'Surplus inilah yang nantinya akan digunakan untuk berinvestasi.',
          ],
        },
      },
    ],
    finalQuiz: {
      id: 'c1-checkpoint', title: 'Final Quiz Modul 1: Foundation Complete', questionCount: 10, duration: '10 menit',
      description: 'Uji semua pemahamanmu di Modul 1!',
      questions: [
        { question: 'Langkah pertama menabung adalah...', options: ['Beli saham', 'Pay yourself first', 'Belanja dulu', 'Tunggu sisa'], correctAnswer: 1 },
        { question: 'Dana darurat single minimal...', options: ['1x pengeluaran', '3-6x pengeluaran', '12x pengeluaran', '0'], correctAnswer: 1 },
        { question: 'Latte factor adalah pengeluaran...', options: ['Besar sekali-kali', 'Kecil rutin tanpa sadar', 'Kebutuhan pokok', 'Pajak'], correctAnswer: 1 },
        { question: 'Asuransi berfungsi untuk...', options: ['Kaya cepat', 'Transfer risiko keuangan', 'Main saham', 'Dapat undian'], correctAnswer: 1 },
        { question: 'Metode 50/30/20 membagi untuk savings sebesar...', options: ['50%', '30%', '20%', '10%'], correctAnswer: 2 },
        { question: 'Yang termasuk aset adalah...', options: ['Mobil pribadi (biaya bensin)', 'Saham/Emas', 'Baju branded', 'HP terbaru'], correctAnswer: 1 },
        { question: 'Inflasi adalah...', options: ['Kenaikan harga barang secara umum', 'Turunnya harga', 'Uang bertambah', 'Diskon besar'], correctAnswer: 0 },
        { question: 'Financial freedom level 1 adalah...', options: ['Bisa beli Ferrari', 'Bebas hutang konsumtif', 'Punya pesawat', 'Keliling dunia'], correctAnswer: 1 },
        { question: 'BPJS Kesehatan termasuk...', options: ['Investasi', 'Proteksi dasar', 'Tabungan', 'Keinginan'], correctAnswer: 1 },
        { question: 'Nabung yang paling efektif adalah...', options: ['Di celengan ayam', 'Auto-debet saat gajian', 'Kalau ada sisa', 'Uang koin'], correctAnswer: 1 },
      ],
    },
  },
];

// MODULE 2: NAVIGASI HUTANG & KREDIT DIGITAL (/class/2)
// ═══════════════════════════════════════════════════════════════
const CLASS_2_LEVELS = [
  {
    id: 'level-1',
    title: 'Fondasi Hutang & Psikolgi Fintech',
    description: 'Pahami kenapa kita berhutang dan bagaimana ekosistem fintech bekerja.',
    items: [
      {
        id: 'c2-l1-video', type: 'video', title: 'Video: Bahaya Paylater yang Nggak Kamu Sadari', duration: '10 menit',
        videoId: 'xDxKg3B1MeU',
        description: 'Simak penjelasan lengkap tentang cara kerja Paylater, potensi jebakan hutang, dan bagaimana menghindarinya.',
        transcript: [
          { time: '00:00', text: 'Siapa di sini yang pernah pakai Paylater? Mari kita bongkar sisi gelap Paylater.' },
          { time: '02:30', text: 'Perusahaan fintech untung dari bunga 2-5% per bulan. Denda harian bisa 1%.' },
          { time: '05:00', text: 'Paylater menghilangkan "Pain of Paying", membuat otak tidak merasa kehilangan uang saat checkout.' },
          { time: '09:00', text: 'Solusinya: hapus fitur Paylater dan gunakan metode Snowball/Avalanche.' },
        ],
      },
      {
        id: 'c2-l1-1', type: 'lesson', title: 'Apa itu Hutang? (Good vs Bad Debt)', duration: '8 menit',
        content: {
          heading: 'Hutang: Alat atau Beban?',
          body: [
            'Good Debt: Pinjaman untuk aset produktif (KPR, Modal Usaha).',
            'Bad Debt: Pinjaman untuk konsumsi/gaya hidup (Paylater nongkrong).',
          ],
        },
      },
      {
        id: 'c2-l1-quiz', type: 'in-lesson-quiz', title: 'Quiz Dasar Hutang',
        questions: [
          { question: 'Hutang produktif disebut...', options: ['Bad Debt', 'Good Debt', 'Social Debt', 'Quick Debt'], correctAnswer: 1 },
          { question: 'Denda harian fintech legal rata-rata...', options: ['0.01%', '1%', '10%', '50%'], correctAnswer: 1 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c2-l1-checkpoint', title: 'Checkpoint Level 1: Fondasi Hutang', questionCount: 5, duration: '5 menit',
      description: 'Tes pemahaman dasar tentang jenis hutang dan bahaya pinjol.',
      questions: [
        { question: 'Manakah yang termasuk Good Debt?', options: ['Paylater skincare', 'KPR Rumah', 'Cicilan HP', 'Kasbon jajan'], correctAnswer: 1 },
        { question: 'Fintech legal diawasi oleh...', options: ['OJK', 'WHO', 'KPK', 'PBB'], correctAnswer: 0 },
        { question: 'Pain of Paying adalah...', options: ['Rasa sakit saat denda', 'Rasa sakit saat mengeluarkan uang', 'Rasa lapar', 'Rasa malas'], correctAnswer: 1 },
        { question: 'Batas aman cicilan bulanan adalah...', options: ['10%', '30%', '50%', '70%'], correctAnswer: 1 },
        { question: 'Langkah pertama menghindari jebakan Paylater...', options: ['Pinjam lagi', 'Hapus fitur di aplikasi', 'Ganti HP', 'Abaikan'], correctAnswer: 1 },
      ],
    },
  },
  {
    id: 'level-2',
    title: 'Manajemen & Strategi Pelunasan',
    description: 'Kelola hutangmu dan temukan jalan keluar tercepat untuk bebas hutang.',
    items: [
      {
        id: 'c2-l2-1', type: 'lesson', title: 'Batas Aman Hutang (DSR)', duration: '7 menit',
        content: {
          heading: 'Debt Service Ratio (DSR)',
          body: [
            'Maksimal total cicilan adalah 30% dari pemasukan.',
            'Gaji Rp 5jt? Max cicilan Rp 1.5jt.',
          ],
        },
      },
      {
        id: 'c2-l2-2', type: 'lesson', title: 'Strategi Snowball & Avalanche', duration: '9 menit',
        content: {
          heading: 'Dua Strategi Pelunasan',
          body: [
            'Snowball: Fokus hutang terkecil (psikologis).',
            'Avalanche: Fokus bunga tertinggi (matematis).',
          ],
        },
      },
      {
        id: 'c2-l2-quiz', type: 'in-lesson-quiz', title: 'Quiz Pelunasan',
        questions: [
          { question: 'Metode fokus bunga tertinggi adalah...', options: ['Snowball', 'Avalanche', 'Waterfall', 'Lightning'], correctAnswer: 1 },
          { question: 'DSR aman maksimal adalah...', options: ['10%', '30%', '50%', '80%'], correctAnswer: 1 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c2-l2-checkpoint', title: 'Checkpoint Level 2: Manajemen Hutang', questionCount: 5, duration: '5 menit',
      description: 'Gunakan strategi Snowball atau Avalanche untuk keluar dari hutang.',
      questions: [
        { question: 'Keunggulan Snowball adalah...', options: ['Hemat bunga', 'Momentum psikologis', 'Paling cepat', 'Gratis pajak'], correctAnswer: 1 },
        { question: 'Avalanche fokus pada...', options: ['Hutang lama', 'Bunga tinggi', 'Bank galak', 'Hutang kecil'], correctAnswer: 1 },
        { question: 'Apa itu DSR?', options: ['Bunga bank', 'Rasio cicilan vs pendapatan', 'Pajak fintech', 'Simpanan'], correctAnswer: 1 },
        { question: 'Gaji Rp 10jt, max cicilan aman?', options: ['Rp 1jt', 'Rp 3jt', 'Rp 5jt', 'Rp 7jt'], correctAnswer: 1 },
        { question: 'Kenapa "gali lubang tutup lubang" bahaya?', options: ['Capek', 'Spiral bunga menumpuk', 'Dilarang', 'Pusing'], correctAnswer: 1 },
      ],
    },
  },
  {
    id: 'level-3',
    title: 'Reputasi Finansial (Skor Kredit)',
    description: 'Jaga rapot keuanganmu agar masa depanmu (KPR, dll) terjamin.',
    items: [
      {
        id: 'c2-l3-1', type: 'lesson', title: 'Memahami SLIK OJK (BI Checking)', duration: '8 menit',
        content: {
          heading: 'Rapot Keuanganmu',
          body: [
            'Catatan seluruh riwayat kreditmu di lembaga keuangan.',
            'Kol-1 (Lancar) sampai Kol-5 (Macet).',
          ],
        },
      },
      {
        id: 'c2-l3-2', type: 'lesson', title: 'Dampak Telat Bayar Paylater', duration: '7 menit',
        content: {
          heading: 'Paylater Tercatat di OJK',
          body: [
            'Catatan buruk di OJK bisa menghalangi KPR.',
            'Satu-satunya cara pulih: Lunasi dan tunggu 1-2 tahun.',
          ],
        },
      },
    ],
    finalQuiz: {
      id: 'c2-checkpoint', title: 'Final Quiz Modul 2: Hutang & Kredit', questionCount: 10, duration: '10 menit',
      description: 'Uji pemahaman akhir tentang hutang, manajemen, dan reputasi kreditmu.',
      questions: [
        { question: 'Hutang konsumsi disebut...', options: ['Good Debt', 'Bad Debt', 'Easy Debt', 'No Debt'], correctAnswer: 1 },
        { question: 'Data SLIK dikelola oleh...', options: ['BI', 'OJK', 'KPK', 'Polisi'], correctAnswer: 1 },
        { question: 'Avalanche fokus pada...', options: ['Hutang kecil', 'Bunga tinggi', 'Tempo', 'Bank'], correctAnswer: 1 },
        { question: 'Kol-5 berarti...', options: ['Lancar', 'Macet', 'Baru', 'Pending'], correctAnswer: 1 },
        { question: 'DSR aman adalah...', options: ['20%', '30%', '50%', '80%'], correctAnswer: 1 },
        { question: 'Paylater termasuk bad debt jika...', options: ['Untuk modal', 'Untuk tiket konser impulsif', 'Gratis', 'Bunga nol'], correctAnswer: 1 },
        { question: 'Snowball memberikan...', options: ['Hemat bunga', 'Momentum psikologis', 'Proses otomatis', 'Hadiah'], correctAnswer: 1 },
        { question: 'OJK mengawasi...', options: ['RT', 'Fintech & Bank', 'Pasar', 'Kantin'], correctAnswer: 1 },
        { question: 'Slik OJK mencatat...', options: ['Followers', 'Riwayat Kredit', 'Nilai Kuliah', 'Belanja'], correctAnswer: 1 },
        { question: 'Cara bebas hutang...', options: ['Boros', 'Pangkas gaya hidup & bayar', 'Abaikan', 'Ganti HP'], correctAnswer: 1 },
      ],
    },
  },
];

// MODULE 3: DASAR INVESTASI & WEALTH BUILDING (/class/3)
// ═══════════════════════════════════════════════════════════════
const CLASS_3_LEVELS = [
  {
    id: 'level-1',
    title: 'Persiapan & Mindset Investor',
    description: 'Kenali profil risikomu dan bangun fondasi sebelum berinvestasi.',
    items: [
      {
        id: 'c3-l1-video', type: 'video', title: 'Video: Mulai Investasi dari Nol', duration: '12 menit',
        videoId: 'p7HKvqRI_Bo',
        description: 'Panduan memulai investasi dengan aman dan memahami risiko.',
        transcript: [
          { time: '00:00', text: 'Investasi itu maraton, bukan sprint. Jangan tergiur kaya cepat.' },
          { time: '03:00', text: 'Tiga pilar sebelum invest: Bebas hutang konsumtif, Dana Darurat, dan BPJS.' },
          { time: '06:00', text: 'Pahami profil risikomu: Konservatif, Moderat, atau Agresif.' },
          { time: '10:00', text: 'Mulai dari nominal kecil, konsistensi adalah kunci.' },
        ],
      },
      {
        id: 'c3-l1-1', type: 'lesson', title: 'Menabung vs Investasi (Inflasi)', duration: '8 menit',
        content: {
          heading: 'Kenapa Harus Investasi?',
          body: [
            'Menabung saja tidak cukup karena ada inflasi (penurunan nilai mata uang).',
            'Investasi bertujuan mengejar return di atas inflasi agar kekayaan bertumbuh.',
          ],
        },
      },
      {
        id: 'c3-l1-quiz', type: 'in-lesson-quiz', title: 'Quiz Mindset',
        questions: [
          { question: 'Pilar pertama sebelum investasi adalah...', options: ['Beli saham', 'Dana Darurat', 'Cari pinjaman', 'Pamer'], correctAnswer: 1 },
          { question: 'Penurunan nilai mata uang disebut...', options: ['Deflasi', 'Inflasi', 'Investasi', 'Korupsi'], correctAnswer: 1 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c3-l1-checkpoint', title: 'Checkpoint Level 1: Persiapan', questionCount: 5, duration: '5 menit',
      description: 'Tes kesiapan investasimu.',
      questions: [
        { question: 'Investasi untuk pemula sebaiknya...', options: ['Pakai uang dapur', 'Pakai "uang dingin"', 'Berhutang', 'Jual rumah'], correctAnswer: 1 },
        { question: 'Profil risiko konservatif takut akan...', options: ['Keuntungan', 'Penurunan nilai (Drawdown)', 'Kenaikan harga', 'Dividen'], correctAnswer: 1 },
        { question: 'Tujuan utama investasi adalah...', options: ['Kaya instan', 'Melawan inflasi & masa depan', 'Buang uang', 'Cari teman'], correctAnswer: 1 },
        { question: 'BPJS penting karena...', options: ['Syarat investasi', 'Proteksi risiko kesehatan', 'Dapat uang', 'Wajib lapor'], correctAnswer: 1 },
        { question: 'Dana darurat minimal...', options: ['1 bulan', '3-6 bulan pengeluaran', '1 tahun', 'Nol'], correctAnswer: 1 },
      ],
    },
  },
  {
    id: 'level-2',
    title: 'Instrumen & Strategi Pertumbuhan',
    description: 'Pilih kendaraan investasimu: Reksadana, Emas, atau SBN.',
    items: [
      {
        id: 'c3-l2-1', type: 'lesson', title: 'Reksadana: Cara Mudah Diversifikasi', duration: '9 menit',
        content: {
          heading: 'Apa itu Reksadana?',
          body: [
            'Wadah untuk menghimpun dana investor yang dikelola Manajer Investasi.',
            'Cocok untuk pemula: Reksadana Pasar Uang (RDPU) sangat aman.',
          ],
        },
      },
      {
        id: 'c3-l2-2', type: 'lesson', title: 'Emas Digital: Pelindung Nilai', duration: '7 menit',
        content: {
          heading: 'Kenapa Emas?',
          body: [
            'Aset "Safe Haven" saat ekonomi tidak menentu.',
            'Bisa dibeli mulai Rp 10rb di aplikasi fintech.',
          ],
        },
      },
      {
        id: 'c3-l2-3', type: 'lesson', title: 'Strategi DCA (Dollar Cost Averaging)', duration: '8 menit',
        content: {
          heading: 'Investasi Rutin vs Sekaligus',
          body: [
            'DCA: Investasi rutin jumlah sama setiap bulan (Misal: 1jt/bulan).',
            'Tidak pusing timing pasar, rata-rata harga jadi lebih rendah.',
          ],
        },
      },
      {
        id: 'c3-l2-quiz', type: 'in-lesson-quiz', title: 'Quiz Instrumen',
        questions: [
          { question: 'Investasi rutin disebut metode...', options: ['DCA', 'Lump Sum', 'FOMO', 'Flash Sale'], correctAnswer: 0 },
          { question: 'Reksadana dikelola oleh...', options: ['RT', 'Manajer Investasi (MI)', 'Kasir', 'Dukun'], correctAnswer: 1 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c3-l2-checkpoint', title: 'Checkpoint Level 2: Instrumen', questionCount: 5, duration: '5 menit',
      description: 'Pilih instrumen yang tepat.',
      questions: [
        { question: 'RDPU kepanjangannya...', options: ['Pasar Uang', 'Pasti Untung', 'Pengen Untung', 'Pilih Utang'], correctAnswer: 0 },
        { question: 'Emas berfungsi sebagai...', options: ['Modal usaha', 'Lindung nilai (Hedging)', 'Hutang', 'Konsumsi'], correctAnswer: 1 },
        { question: 'Keunggulan DCA adalah...', options: ['Kaya cepat', 'Disiplin & meminimalisir risiko timing', 'Nggak bayar', 'Pasti cuan'], correctAnswer: 1 },
        { question: 'SBN adalah pinjaman ke...', options: ['Tetangga', 'Negara/Pemerintah', 'Bank Gelap', 'Teman'], correctAnswer: 1 },
        { question: 'Spread harga emas adalah...', options: ['Selisih beli-jual', 'Bonus', 'Pajak', 'Diskon'], correctAnswer: 0 },
      ],
    },
  },
  {
    id: 'level-3',
    title: 'Portfolio & Financial Freedom',
    description: 'Visualisasi masa depan dan kekuatan Compound Interest.',
    items: [
      {
        id: 'c3-l3-1', type: 'lesson', title: 'Keajaiban Compound Interest', duration: '10 menit',
        content: {
          heading: 'Bunga Berbunga',
          body: [
            'Uangmu menghasilkan untung, untungnya menghasilkan untung lagi.',
            'Waktu adalah faktor terpenting (Mulai sedini mungkin).',
          ],
        },
      },
      {
        id: 'c3-l3-2', type: 'lesson', title: 'Diversifikasi Portfolio', duration: '8 menit',
        content: {
          heading: "Don't Put All Eggs in One Basket",
          body: [
            'Sebarkan investasi di berbagai instrumen (Emas + Reksadana + Saham).',
            'Jika satu turun, yang lain bisa menyeimbangkan.',
          ],
        },
      },
    ],
    finalQuiz: {
      id: 'c3-checkpoint', title: 'Final Quiz Modul 3: Investasi Masa Depan', questionCount: 10, duration: '10 menit',
      description: 'Lulus level ini berarti kamu siap menjadi investor cerdas!',
      questions: [
        { question: 'Mulai investasi sebaiknya...', options: ['Setelah kaya', 'Sedini mungkin', 'Nunggu pensiun', 'Besok terus'], correctAnswer: 1 },
        { question: 'Compound interest akan maksimal jika...', options: ['Modalnya ditarik', 'Dibiarkan jangka panjang', 'Beli saat mahal', 'Investasi sekali'], correctAnswer: 1 },
        { question: 'Inflasi dilawan dengan...', options: ['Menabung di bawah kasur', 'Investasi yang return > inflasi', 'Beli baju baru', 'Kasbon'], correctAnswer: 1 },
        { question: 'Manakah investasi paling berisiko tinggi?', options: ['SBN', 'RDPU', 'Saham Individual', 'Emas'], correctAnswer: 2 },
        { question: 'Pentingnya diversifikasi adalah...', options: ['Biar kelihatan kaya', 'Mengurangi risiko total portfolio', 'Menambah hutang', 'Biar ribet'], correctAnswer: 1 },
        { question: 'Uang dingin adalah...', options: ['Uang dari kulkas', 'Uang yang tidak digunakan dalam waktu dekat', 'Uang pinjaman', 'Uang sisa jajan'], correctAnswer: 1 },
        { question: 'Minimal dana darurat single?', options: ['1x pengeluaran', '3-6x pengeluaran', '12x pengeluaran', '0'], correctAnswer: 1 },
        { question: 'Aset safe-haven tradisional?', options: ['Jam tangan', 'Emas', 'Tiket konser', 'Crypto micin'], correctAnswer: 1 },
        { question: 'DCA singkatan dari...', options: ['Dollar Cost Averaging', 'Direct Cash Action', 'Dana Cepat Aman', 'Daily Class Action'], correctAnswer: 0 },
        { question: 'Financial freedom tercapai saat...', options: ['Gaji naik', 'Passive income > Biaya hidup', 'Punya mobil', 'Liburan terus'], correctAnswer: 1 },
      ],
    },
  },
];

// DATA AGGREGATION & METADATA
// ═══════════════════════════════════════════════════════════════
export const CLASS_META = {
  1: {
    id: 1,
    title: 'Financial Foundation & Mindset',
    level: 'Beginner',
    duration: '120 menit',
    modules: 3,
    quizzes: 25,
    levels: CLASS_1_LEVELS,
  },
  2: {
    id: 2,
    title: 'Navigasi Hutang & Kredit Digital',
    level: 'Intermediate',
    duration: '110 menit',
    modules: 3,
    quizzes: 20,
    levels: CLASS_2_LEVELS,
  },
  3: {
    id: 3,
    title: 'Dasar Investasi & Wealth Building',
    level: 'Advanced',
    duration: '130 menit',
    modules: 3,
    quizzes: 20,
    levels: CLASS_3_LEVELS,
  },
};

export const CLASS_LEVELS = {
  1: CLASS_1_LEVELS,
  2: CLASS_2_LEVELS,
  3: CLASS_3_LEVELS,
};
