/**
 * FinLitGo — Class Content Data
 * 3 Modules, each with 4 lessons + micro-quizzes + checkpoint
 * Gaya bahasa: Semi-Formal, Adaptif, Relatable bagi Gen Z
 */

// ═══════════════════════════════════════════════════════════════
// MODULE 1: FINANCIAL FOUNDATION & MINDSET (/class/1)
// ═══════════════════════════════════════════════════════════════
const CLASS_1_LEVELS = [
  {
    id: 'level-1',
    title: 'Financial Foundation & Mindset',
    description: 'Bangun pondasi keuangan dan mindset finansial yang sehat sebagai Gen Z.',
    items: [
      // ── Video Intro Modul 1 ──
      {
        id: 'c1-video', type: 'video', title: 'Video: Kenapa Gen Z Harus Melek Keuangan?', duration: '12 menit',
        videoId: 'SqyD3JBVeio',
        description: 'Tonton video pengantar ini untuk memahami mengapa literasi keuangan sangat penting di era digital, terutama bagi generasi muda.',
        transcript: [
          { time: '00:00', text: 'Halo semuanya! Hari ini kita mau bahas sesuatu yang mungkin jarang dibicarakan di sekolah maupun kampus, tapi dampaknya besar banget buat masa depan kalian: literasi keuangan.' },
          { time: '01:15', text: 'Jadi gini, menurut survei OJK tahun 2024, tingkat literasi keuangan di Indonesia baru di angka 65%. Artinya, dari 10 orang, hampir 4 orang masih belum paham cara mengelola uangnya sendiri. Dan kalau kita zoom in ke Gen Z? Angkanya bahkan lebih rendah.' },
          { time: '02:30', text: 'Kenapa ini penting buat Gen Z? Karena generasi ini tumbuh di era digital di mana akses ke produk keuangan itu sangat mudah. Paylater tinggal klik, investasi bisa dari HP, crypto bisa dibeli jam 3 pagi. Tapi kemudahan tanpa pemahaman itu berbahaya, guys.' },
          { time: '04:00', text: 'Bayangin kamu dikasih mobil Ferrari tapi nggak pernah diajarin nyetir. Apa yang terjadi? Kecelakaan. Nah, sama halnya dengan uang. Kamu punya akses ke berbagai instrumen keuangan, tapi tanpa pemahaman dasar, bisa-bisa kamu malah rugi.' },
          { time: '05:30', text: 'Ada tiga pilar utama literasi keuangan yang wajib kalian kuasai. Pertama: Mindset — gimana cara kamu BERPIKIR tentang uang. Kedua: Management — gimana cara kamu MENGELOLA uang. Ketiga: Multiplication — gimana cara kamu MENGEMBANGKAN uang.' },
          { time: '07:00', text: 'Banyak dari kita yang terjebak di "Latte Factor" — pengeluaran kecil yang kalau ditotal ternyata besar banget. Kopi 25 ribu sehari, itu 9 juta setahun, guys! Itu bisa jadi dana darurat 3 bulan.' },
          { time: '08:45', text: 'Yang bikin Gen Z unik adalah tantangan-tantangan baru yang nggak dihadapi generasi sebelumnya: FOMO investing (ikut-ikutan beli crypto karena viral), doom spending (belanja impulsif karena stres), dan pressure dari media sosial yang bikin kita selalu merasa kurang.' },
          { time: '10:00', text: 'Tapi kabar baiknya, Gen Z juga punya keunggulan: akses informasi yang luas, tools digital yang canggih, dan WAKTU. Kamu masih muda, dan waktu adalah aset paling berharga dalam membangun kekayaan lewat compound interest.' },
          { time: '11:30', text: 'Jadi, takeaway hari ini: mulailah dari memahami ke mana uangmu pergi, sisihkan minimal 20% untuk masa depan, dan jangan pernah berhenti belajar. Financial literacy bukan privilege — ini survival skill. Sampai jumpa di materi berikutnya!' },
        ],
      },

      // ── 1.1 Psikologi Uang & Gen Z Culture ──
      {
        id: 'c1-lesson1', type: 'lesson', title: '1.1 Psikologi Uang & Gen Z Culture', duration: '10 menit',
        content: {
          heading: 'Psikologi Uang & Gen Z Culture',
          body: [
            'Pernah nggak sih, gajian tanggal 25 tapi tanggal 28 udah bokek? Atau scroll TikTok terus checkout barang yang sebenernya nggak butuh? Tenang, kamu nggak sendirian. Fenomena ini punya nama: Doom Spending — belanja impulsif yang didorong rasa cemas atau stres, seolah-olah "sekarang aja deh, besok belum tentu bisa."',
            'Menurut survei Jakpat 2024, 68% Gen Z Indonesia mengaku pernah membeli barang yang tidak direncanakan saat scrolling media sosial. Fenomena ini diperkuat oleh algoritma yang secara cerdas menampilkan produk sesuai ketertarikanmu — membuat "dinding" antara keinginan dan kebutuhan makin tipis. Platform e-commerce bahkan menyediakan fitur Paylater tepat di halaman checkout, menghilangkan friction terakhir sebelum kamu mengambil keputusan.',
            'FOMO (Fear of Missing Out) juga jadi musuh besar. Lihat teman liburan ke Bali, langsung buka Traveloka. Teman beli iPhone baru, langsung browsing cicilan. Masalahnya, kita sering membandingkan "highlight reel" orang lain dengan "behind the scenes" kita sendiri. Padahal, bisa jadi teman yang flexing itu juga lagi ngutang.',
            'Ada juga fenomena Soft Saving — tren di kalangan Gen Z yang lebih memprioritaskan pengalaman hidup (traveling, dining, self-care) dibanding target keuangan tradisional seperti beli rumah. Ini bukan sepenuhnya salah, tapi tanpa fondasi keuangan yang kuat, soft saving bisa berubah jadi soft sinking.',
            'Solusinya? "Pay Yourself First" — konsep legendaris dari George S. Clason dalam buku The Richest Man in Babylon. Begitu dapet penghasilan, sisihkan DULUAN untuk tabungan atau investasi sebelum belanja apapun. Bukan nabung dari sisa, tapi belanja dari sisa setelah nabung. Mindset-shift kecil ini bisa mengubah seluruh financial trajectory kamu.',
            'Coba ini: setiap kali mau belanja impulsif, terapkan aturan 24 jam. Tunggu 24 jam sebelum checkout. Kalau besoknya masih butuh, silakan beli. Tapi 80% kemungkinan, kamu udah lupa atau nggak jadi pengen. Trik lain: unsubscribe dari email promo, matikan notifikasi marketplace, dan unfollow akun-akun yang bikin kamu FOMO belanja.',
          ],
          quote: '"Do not save what is left after spending, but spend what is left after saving." — Warren Buffett',
        },
      },
      {
        id: 'c1-quiz1', type: 'in-lesson-quiz', title: 'Micro-Quiz: Psikologi Uang',
        questions: [
          { question: 'Apa yang dimaksud dengan "Doom Spending"?', options: ['Belanja untuk kebutuhan pokok', 'Belanja impulsif yang didorong rasa cemas atau stres', 'Menghemat uang secara berlebihan', 'Investasi jangka panjang'], correctAnswer: 1 },
          { question: 'Konsep "Pay Yourself First" artinya...', options: ['Belanja dulu baru sisakan untuk tabungan', 'Sisihkan tabungan/investasi DULUAN sebelum belanja', 'Bayar hutang orang lain dulu', 'Beli kebutuhan primer dulu'], correctAnswer: 1 },
          { question: 'Aturan 24 jam berguna untuk...', options: ['Menunggu promo diskon', 'Menghindari belanja impulsif', 'Menambah limit kartu kredit', 'Menunda bayar tagihan'], correctAnswer: 1 },
        ],
      },

      // ── 1.2 Anatomi Keuangan Pribadi ──
      {
        id: 'c1-lesson2', type: 'lesson', title: '1.2 Anatomi Keuangan Pribadi', duration: '10 menit',
        content: {
          heading: 'Anatomi Keuangan Pribadi',
          body: [
            'Sebelum bisa "memperbaiki" keuangan, kamu harus paham dulu anatominya. Ada tiga konsep yang wajib Gen Z kuasai: Cash Flow, Net Worth, dan jenis pemasukan.',
            'Cash Flow itu sederhana: uang masuk dikurangi uang keluar. Kalau hasilnya positif (pemasukan > pengeluaran), selamat — kamu punya ruang untuk nabung dan investasi. Kalau negatif? Itu artinya kamu literally "hidup di atas kemampuan." Langkah pertama: track pengeluaranmu selama 30 hari. Nggak perlu aplikasi mahal — Notes di HP pun cukup.',
            'Kenapa tracking itu penting? Karena kebanyakan orang nggak sadar ke mana uangnya pergi. Kopi susu Rp 25 ribu sehari = Rp 750 ribu/bulan = Rp 9 juta/tahun. Ini bukan berarti kamu nggak boleh ngopi — tapi kamu harus SADAR bahwa itu pengeluaran senilai Rp 9 juta per tahun. Kesadaran ini yang jadi fondasi keputusan keuangan yang lebih baik.',
            'Net Worth = Total Aset dikurangi Total Hutang. Aset itu tabungan, investasi, properti, bahkan saldo e-wallet kamu. Hutang itu pinjaman, cicilan, Paylater. Kalau net worth kamu negatif di usia 20-an, jangan panik — yang penting trennya naik setiap bulan.',
            'Fun fact: rata-rata orang Indonesia usia 25-34 punya net worth negatif karena hutang konsumtif (cicilan motor, Paylater, dll). Tapi kabar baiknya, kamu punya waktu di sisimu. Usia 20-an adalah waktu terbaik untuk mulai memperbaiki, karena compound effect-nya masih sangat panjang.',
            'Soal pemasukan: ada dua jenis. Pemasukan Aktif — uang yang kamu dapat karena kerja (gaji, freelance, jualan). Kamu tukar waktu dan tenaga untuk uang. Pemasukan Pasif — uang yang masuk meskipun kamu tidur. Contoh: dividen saham, bunga deposito, royalti konten, atau sewa kos-kosan.',
            'Tujuan akhirnya? Pemasukan pasif > pengeluaran bulanan. Itu definisi "Financial Freedom." Tapi nggak perlu langsung kesana — mulai dari langkah kecil: pastikan cash flow kamu positif setiap bulan, dan net worth-mu terus naik meski pelan.',
          ],
          quote: '"Wealth is not about having a lot of money; it is about having a lot of options." — Chris Rock',
        },
      },
      {
        id: 'c1-quiz2', type: 'in-lesson-quiz', title: 'Micro-Quiz: Anatomi Keuangan',
        questions: [
          { question: 'Cash Flow positif artinya...', options: ['Pengeluaran lebih besar dari pemasukan', 'Pemasukan lebih besar dari pengeluaran', 'Tidak punya hutang sama sekali', 'Punya banyak kartu kredit'], correctAnswer: 1 },
          { question: 'Cara menghitung Net Worth adalah...', options: ['Gaji dikurangi pajak', 'Total Aset dikurangi Total Hutang', 'Pemasukan dikali 12 bulan', 'Tabungan ditambah investasi'], correctAnswer: 1 },
          { question: 'Contoh pemasukan pasif adalah...', options: ['Gaji bulanan dari kantor', 'Upah freelance', 'Dividen saham', 'Bonus kinerja'], correctAnswer: 2 },
        ],
      },

      // ── 1.3 Budgeting Rules ──
      {
        id: 'c1-lesson3', type: 'lesson', title: '1.3 Budgeting Rules (50/30/20 & Zero-Based)', duration: '10 menit',
        content: {
          heading: 'Budgeting Rules: 50/30/20 & Zero-Based',
          body: [
            'Budgeting bukan berarti nggak boleh senang-senang. Budgeting itu memberi IZIN pada dirimu untuk menikmati uang tanpa rasa bersalah, karena kamu tahu semua sudah teralokasi dengan benar.',
            'Metode 50/30/20 dari Senator Elizabeth Warren dipopulerkan di bukunya "All Your Worth": 50% untuk Kebutuhan (kos, makan, transportasi, listrik), 30% untuk Keinginan (nongkrong, streaming, skincare, jajan), 20% untuk Tabungan & Investasi. Contoh: gaji Rp 5 juta → Rp 2,5 juta kebutuhan, Rp 1,5 juta keinginan, Rp 1 juta tabungan/investasi.',
            'Tapi hati-hati — membedakan "kebutuhan" dan "keinginan" itu tricky. WiFi untuk kerja remote = kebutuhan. Netflix? Keinginan. Makan siang? Kebutuhan. Tapi makan di restoran fancy? Keinginan. Biasakan tanya pada diri sendiri: "Apakah aku benar-benar BUTUH ini, atau aku INGIN ini?"',
            'Kalau merasa 50/30/20 terlalu "longgar" dan kamu mau lebih disiplin, coba Zero-Based Budgeting. Konsepnya: setiap rupiah punya tugas. Pemasukan dikurangi semua alokasi harus = Rp 0. Bukan berarti duitmu habis, tapi setiap rupiah sudah "ditugaskan" — entah untuk makan, nabung, bayar kos, atau investasi.',
            'Contoh Zero-Based untuk gaji Rp 4 juta: Kos Rp 1.200.000 + Makan Rp 900.000 + Transport Rp 400.000 + Internet/HP Rp 150.000 + Tabungan Rp 500.000 + Investasi Rp 300.000 + Lifestyle Rp 350.000 + Darurat Rp 200.000 = Rp 4.000.000. Pas. Setiap rupiah punya nama.',
            'Tips praktis: gunakan aplikasi seperti Money Manager, Finansialku, atau bahkan spreadsheet sederhana. Yang penting: catat, evaluasi tiap minggu, dan jangan terlalu keras pada diri sendiri. Budgeting itu skill — makin sering latihan, makin jago. Kalau minggu pertama gagal, itu normal. Adjust dan coba lagi.',
            'Pro tip: set auto-transfer di M-Banking setiap tanggal gajian. Otomatiskan tabungan dan investasi supaya kamu nggak perlu bergantung pada willpower. "Set it and forget it" — metode terbaik untuk orang yang sibuk.',
          ],
          quote: '"A budget is telling your money where to go instead of wondering where it went." — Dave Ramsey',
        },
      },
      {
        id: 'c1-quiz3', type: 'in-lesson-quiz', title: 'Micro-Quiz: Budgeting',
        questions: [
          { question: 'Dalam aturan 50/30/20, alokasi 30% digunakan untuk...', options: ['Tabungan dan investasi', 'Kebutuhan pokok', 'Keinginan (wants)', 'Bayar hutang'], correctAnswer: 2 },
          { question: 'Prinsip utama Zero-Based Budgeting adalah...', options: ['Tidak boleh punya pengeluaran', 'Setiap rupiah dialokasikan sehingga sisa = 0', 'Hanya boleh belanja kebutuhan', 'Semua uang harus diinvestasikan'], correctAnswer: 1 },
          { question: 'Dengan gaji Rp 5 juta dan aturan 50/30/20, berapa alokasi tabungan/investasi?', options: ['Rp 500 ribu', 'Rp 1 juta', 'Rp 1,5 juta', 'Rp 2,5 juta'], correctAnswer: 1 },
        ],
      },

      // ── 1.4 Dana Darurat ──
      {
        id: 'c1-lesson4', type: 'lesson', title: '1.4 Dana Darurat', duration: '10 menit',
        content: {
          heading: 'Dana Darurat: Safety Net Keuanganmu',
          body: [
            'Bayangkan: kamu tiba-tiba di-PHK, HP rusak dan harus ganti, atau keluarga ada yang sakit. Tanpa dana darurat, kamu pasti langsung buka Paylater atau pinjol. Dan dari situlah spiral hutang dimulai.',
            'Dana darurat adalah uang yang KHUSUS disiapkan untuk kejadian tak terduga. Bukan untuk liburan. Bukan untuk beli gadget. Murni untuk emergency. Target idealnya: Lajang → 3-6 bulan pengeluaran. Sudah menikah → 6-9 bulan pengeluaran. Punya tanggungan/freelancer → 9-12 bulan pengeluaran.',
            'Kenapa freelancer/pekerja gig economy butuh lebih banyak? Karena penghasilanmu nggak stabil. Bulan ini project banyak, bulan depan bisa sepi. Dana darurat yang lebih tebal jadi buffer selama masa "kering." Ini bukan soal paranoid — ini soal realistis.',
            'Contoh: pengeluaran bulananmu Rp 3 juta. Target dana darurat Rp 9-18 juta. Kedengeran banyak? Mulai dari target 1 bulan dulu (Rp 3 juta). Sisihkan Rp 500 ribu/bulan, dalam 6 bulan udah tercapai. Kuncinya: konsistensi dan otomasi.',
            'Simpan di mana? BUKAN di saham atau reksadana saham — terlalu fluktuatif. Simpan di tempat yang likuid (mudah dicairkan) dan rendah risiko: Rekening tabungan terpisah (beda bank dari rekening utama supaya nggak gampang dipakai), Reksadana Pasar Uang (bisa dicairkan T+1), atau Deposito dengan tenor pendek.',
            'Satu hal yang sering diabaikan: JANGAN campur dana darurat dengan tabungan biasa. Pisahkan rekeningnya. Kalau digabung, kamu pasti akan "minjam" dari dana darurat untuk hal non-emergency. "Diskon 50%" bukan emergency, ya!',
          ],
          quote: '"An emergency fund turns a crisis into an inconvenience." — Dave Ramsey',
        },
      },
      {
        id: 'c1-quiz4', type: 'in-lesson-quiz', title: 'Micro-Quiz: Dana Darurat',
        questions: [
          { question: 'Target dana darurat untuk lajang adalah...', options: ['1-2 bulan pengeluaran', '3-6 bulan pengeluaran', '12-24 bulan pengeluaran', 'Tidak perlu dana darurat'], correctAnswer: 1 },
          { question: 'Tempat terbaik menyimpan dana darurat adalah...', options: ['Saham blue chip', 'Crypto (Bitcoin)', 'Rekening tabungan terpisah atau Reksadana Pasar Uang', 'Dompet tunai di rumah'], correctAnswer: 2 },
          { question: 'Fungsi utama dana darurat adalah...', options: ['Modal investasi saham', 'Dana liburan tahunan', 'Jaring pengaman untuk kejadian tak terduga', 'Tabungan pensiun'], correctAnswer: 2 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c1-checkpoint', title: 'Checkpoint Modul 1: Financial Foundation', questionCount: 10, duration: '10 menit',
      description: 'Uji pemahamanmu tentang seluruh materi Financial Foundation & Mindset. Kamu butuh skor minimal 60% untuk lulus.',
      questions: [
        { question: 'Doom Spending paling sering dipicu oleh...', options: ['Perencanaan keuangan yang matang', 'Rasa cemas, stres, atau tekanan sosial', 'Kebutuhan pokok yang mendesak', 'Kenaikan gaji'], correctAnswer: 1 },
        { question: 'Prinsip "Pay Yourself First" mengajarkan untuk...', options: ['Membayar hutang terlebih dahulu', 'Menyisihkan tabungan/investasi sebelum belanja', 'Membelanjakan uang untuk diri sendiri dulu', 'Menambah sumber pemasukan aktif'], correctAnswer: 1 },
        { question: 'Net Worth dihitung dengan rumus...', options: ['Pemasukan - Pengeluaran', 'Total Aset - Total Hutang', 'Gaji x 12 bulan', 'Tabungan + Investasi + Gaji'], correctAnswer: 1 },
        { question: 'Yang termasuk pemasukan pasif adalah...', options: ['Gaji kerja kantoran', 'Upah project freelance', 'Bunga deposito dan dividen saham', 'Uang lembur'], correctAnswer: 2 },
        { question: 'Dalam aturan 50/30/20, porsi terbesar dialokasikan untuk...', options: ['Tabungan dan investasi (20%)', 'Keinginan/wants (30%)', 'Kebutuhan pokok/needs (50%)', 'Cicilan hutang'], correctAnswer: 2 },
        { question: 'Zero-Based Budgeting berarti...', options: ['Tidak boleh punya uang sisa', 'Setiap rupiah dialokasikan sehingga sisa = 0', 'Tidak boleh punya pengeluaran', 'Harus hidup tanpa belanja'], correctAnswer: 1 },
        { question: 'Freelancer disarankan punya dana darurat sebesar...', options: ['1-3 bulan pengeluaran', '3-6 bulan pengeluaran', '9-12 bulan pengeluaran', 'Tidak perlu dana darurat'], correctAnswer: 2 },
        { question: 'Dana darurat TIDAK boleh disimpan di...', options: ['Reksadana Pasar Uang', 'Rekening tabungan terpisah', 'Saham individual yang volatil', 'Deposito tenor pendek'], correctAnswer: 2 },
        { question: 'FOMO dalam konteks keuangan sering menyebabkan...', options: ['Investasi yang terencana', 'Belanja impulsif karena ikut-ikutan', 'Peningkatan tabungan', 'Financial freedom'], correctAnswer: 1 },
        { question: 'Cash Flow positif menandakan bahwa...', options: ['Kamu punya banyak hutang', 'Pemasukanmu lebih besar dari pengeluaran', 'Kamu tidak punya pengeluaran', 'Investasimu selalu untung'], correctAnswer: 1 },
      ],
    },
  },
];

// ═══════════════════════════════════════════════════════════════
// MODULE 2: NAVIGASI HUTANG & KREDIT DIGITAL (/class/2)
// ═══════════════════════════════════════════════════════════════
const CLASS_2_LEVELS = [
  {
    id: 'level-1',
    title: 'Navigasi Hutang & Kredit Digital',
    description: 'Pahami ekosistem fintech, bedakan hutang baik vs buruk, dan kelola kredit digitalmu.',
    items: [
      // ── Video Intro Modul 2 ──
      {
        id: 'c2-video', type: 'video', title: 'Video: Bahaya Paylater yang Nggak Kamu Sadari', duration: '10 menit',
        videoId: 'HMCwBTpAFP8',
        description: 'Simak penjelasan lengkap tentang cara kerja Paylater, potensi jebakan hutang, dan bagaimana menghindarinya.',
        transcript: [
          { time: '00:00', text: 'Siapa di sini yang pernah pakai Paylater? Pasti banyak ya. Fitur ini emang convenient banget, tinggal klik langsung bisa checkout. Tapi hari ini, kita mau bongkar sisi gelap Paylater yang jarang dibahas.' },
          { time: '01:00', text: 'Pertama, mari kita pahami bisnis model-nya. Paylater itu adalah pinjaman konsumtif. Perusahaan fintech nggak rugi nawarin kamu beli sekarang bayar nanti, karena mereka untung dari bunga yang bisa 2-5% PER BULAN. Coba hitung: 5% per bulan itu 60% per tahun! Lebih tinggi dari return saham.' },
          { time: '02:30', text: 'Denda keterlambatan itu game changer yang bikin hutang Paylater jadi monster. Rata-rata dendanya 1% per hari. Bayangin, kamu telat bayar Rp 500 ribu selama sebulan, dendanya Rp 150 ribu. Itu 30% dari hutang asli!' },
          { time: '03:45', text: 'Ada yang namanya "Pain of Paying" dalam behavioral economics. Saat kamu bayar cash, otakmu merasakan "sakit" karena kamu melihat uangnya keluar. Tapi Paylater menghapus rasa sakit itu — kamu nggak merasa kehilangan apa-apa saat checkout. Itulah kenapa rata-rata orang belanja 40% lebih banyak pakai Paylater.' },
          { time: '05:00', text: 'Siklus hutang Paylater biasanya begini: checkout impulsif, tagihan datang, nggak bisa bayar penuh, bayar minimum, bunga numpuk, stres, doom spending karena stres, checkout lagi. Loop ini bisa berlangsung berbulan-bulan bahkan bertahun-tahun.' },
          { time: '06:30', text: 'Yang paling bahaya dan jarang orang tahu: Paylater itu DILAPORKAN ke SLIK OJK, sama seperti kartu kredit dan KPR. Jadi kalau kamu telat bayar Paylater Rp 100 ribu, catatan itu akan membekas di riwayat kreditmu dan bisa menghalangimu dapat KPR di masa depan.' },
          { time: '08:00', text: 'Solusinya gimana? Pertama, hapus semua fitur Paylater dari aplikasi e-commerce. Kedua, kalau sudah terlanjur punya hutang, gunakan metode Snowball atau Avalanche untuk melunasi. Ketiga, kalau memang butuh cicilan, gunakan kartu kredit bank yang bunganya lebih rendah dan regulasinya lebih ketat.' },
          { time: '09:30', text: 'Intinya, Paylater itu alat, dan alat itu netral. Tapi kalau alatnya dirancang untuk melemahkan self-control kamu, dan kamu nggak punya financial literacy yang cukup, hasilnya bisa sangat merugikan. Bijak menggunakan Paylater itu bukan cuma soal disiplin, tapi soal paham gimana sistemnya bekerja.' },
        ],
      },

      // ── 2.1 Ekosistem Fintech & Paylater ──
      {
        id: 'c2-lesson1', type: 'lesson', title: '2.1 Ekosistem Fintech & Paylater', duration: '10 menit',
        content: {
          heading: 'Ekosistem Fintech & Paylater',
          body: [
            'Paylater itu bukan "uang gratis." Saat kamu checkout pakai Paylater, kamu literally lagi ngutang ke perusahaan fintech. Mereka untung dari bunga dan denda keterlambatan — yang sering kali JAUH lebih tinggi dari bunga bank konvensional.',
            'Data OJK 2024 menunjukkan bahwa pengguna Paylater di Indonesia sudah menembus 35 juta orang, mayoritas dari kalangan Gen Z dan Milenial. Dari jumlah itu, 15% mengalami masalah pembayaran (NPL/Non-Performing Loan). Artinya, jutaan orang sedang terjebak dalam spiral hutang digital.',
            'Cara kerja bunga Paylater: Misalnya, beli barang Rp 1 juta dengan cicilan 3 bulan, bunga 2,95%/bulan. Total yang kamu bayar: Rp 1.088.500. "Cuma" Rp 88 ribu? Sekarang kalau kamu punya 5 cicilan Paylater sekaligus, itu bisa ratusan ribu per bulan hanya untuk bunga.',
            'Denda keterlambatan bisa 1%-5% per hari. Telat bayar Rp 500 ribu selama 30 hari dengan denda 1%/hari? Kamu kena denda Rp 150 ribu — 30% dari nominal hutang! Ini yang bikin spiral hutang: hutang numpuk, denda numpuk, stres, doom spending lagi, hutang lagi.',
            'Psikologi hutang instan: Paylater di-design untuk menghilangkan "pain of paying." Saat bayar cash atau debit, otakmu merasakan "sakit." Tapi Paylater menunda rasa sakit itu, jadi kamu belanja lebih banyak. Ini bukan kelemahan kamu — ini by design.',
            'Yang bisa kamu lakukan: HAPUS Paylater dari semua aplikasi e-commerce. Serius. Out of sight, out of mind. Kalau memang butuh cicilan, gunakan kartu kredit dari bank (bunga lebih rendah, regulasi lebih ketat) atau KTA (Kredit Tanpa Agunan) untuk kebutuhan produktif.',
          ],
          quote: '"Debt is normal. Be weird." — Dave Ramsey',
        },
      },
      {
        id: 'c2-quiz1', type: 'in-lesson-quiz', title: 'Micro-Quiz: Fintech & Paylater',
        questions: [
          { question: 'Perusahaan Paylater mendapatkan keuntungan utama dari...', options: ['Donasi pengguna', 'Bunga cicilan dan denda keterlambatan', 'Pajak pemerintah', 'Iklan di aplikasi'], correctAnswer: 1 },
          { question: 'Paylater di-design untuk menghilangkan...', options: ['Rasa lapar', 'Pain of paying (rasa sakit saat membayar)', 'Kebutuhan menabung', 'Keinginan investasi'], correctAnswer: 1 },
          { question: 'Jika telat bayar Rp 500 ribu selama 30 hari dengan denda 1%/hari, total denda yang harus dibayar adalah...', options: ['Rp 5.000', 'Rp 50.000', 'Rp 150.000', 'Rp 500.000'], correctAnswer: 2 },
        ],
      },

      // ── 2.2 Good Debt vs Bad Debt ──
      {
        id: 'c2-lesson2', type: 'lesson', title: '2.2 Good Debt vs Bad Debt', duration: '9 menit',
        content: {
          heading: 'Good Debt vs Bad Debt',
          body: [
            'Plot twist: nggak semua hutang itu jahat. Yang membedakan "good debt" dan "bad debt" adalah satu pertanyaan sederhana — apakah hutang ini menghasilkan nilai yang LEBIH BESAR dari bunganya?',
            'Good Debt (Hutang Produktif): KPR untuk rumah yang nilainya naik seiring waktu. Pinjaman pendidikan yang meningkatkan earning power. Modal usaha yang menghasilkan profit lebih besar dari bunga pinjaman. Ciri khasnya: aset di balik hutang ini nilainya NAIK atau menghasilkan pemasukan.',
            'Contoh real: kamu pinjam Rp 50 juta untuk modal usaha coffee shop. Kalau usahamu menghasilkan profit bersih Rp 5 juta/bulan sementara cicilan pinjaman Rp 2 juta/bulan — ini good debt. Hutangmu MENGHASILKAN lebih dari bunganya.',
            'Bad Debt (Hutang Konsumtif): Paylater untuk beli baju branded. Cicilan HP terbaru padahal HP lama masih oke. Kasbon untuk healing ke luar kota. Ciri khasnya: barang yang dibeli nilainya TURUN begitu kamu beli, dan nggak menghasilkan pemasukan apapun.',
            'Test sederhana: sebelum ngutang, tanya "Apakah barang ini akan menghasilkan uang atau bertambah nilainya dalam 5 tahun?" Kalau jawabannya tidak — jangan berhutang untuk itu. Nabung dulu, beli cash. Atau lebih baik — tanya lagi, "Apa aku BENAR-BENAR butuh ini?"',
            'Aturan emas: total cicilan hutang TIDAK BOLEH lebih dari 30% penghasilan bulanan. Kalau gajimu Rp 5 juta, total semua cicilan (KPR + motor + Paylater + dll) maksimal Rp 1,5 juta. Lebih dari itu? Red flag. Kamu sedang menuju debt trap.',
          ],
          quote: '"There are two types of people: those who earn interest and those who pay it." — Unknown',
        },
      },
      {
        id: 'c2-quiz2', type: 'in-lesson-quiz', title: 'Micro-Quiz: Good vs Bad Debt',
        questions: [
          { question: 'Yang termasuk "Good Debt" adalah...', options: ['Cicilan HP terbaru', 'Paylater untuk beli skincare', 'Pinjaman modal usaha yang menghasilkan profit', 'Kasbon untuk nongkrong'], correctAnswer: 2 },
          { question: 'Batas maksimal rasio cicilan hutang terhadap penghasilan adalah...', options: ['10%', '30%', '50%', '80%'], correctAnswer: 1 },
          { question: 'Cara membedakan good debt dan bad debt adalah...', options: ['Dilihat dari jumlah nominanya', 'Apakah hutang menghasilkan nilai lebih besar dari bunganya', 'Dilihat dari nama perusahaan pemberi pinjaman', 'Semua hutang itu bad debt'], correctAnswer: 1 },
        ],
      },

      // ── 2.3 Strategi Pelunasan ──
      {
        id: 'c2-lesson3', type: 'lesson', title: '2.3 Strategi Pelunasan (Snowball vs Avalanche)', duration: '8 menit',
        content: {
          heading: 'Strategi Pelunasan: Snowball vs Avalanche',
          body: [
            'Kalau kamu punya beberapa hutang sekaligus, JANGAN bayar semuanya sama rata. Itu cara paling lambat untuk bebas hutang. Ada dua strategi yang proven: Snowball dan Avalanche.',
            'Metode Snowball (oleh Dave Ramsey): Urutkan hutang dari TERKECIL ke terbesar. Bayar minimum semua hutang, tapi fokuskan dana ekstra ke hutang terkecil. Begitu hutang terkecil lunas, dana ekstranya "menggelinding" ke hutang berikutnya — seperti bola salju yang makin besar. Keunggulan: quick wins! Secara psikologis, melunaskan satu hutang memberikan dopamine hit yang memotivasi kamu untuk terus melunasi yang lain.',
            'Metode Avalanche: Urutkan hutang dari BUNGA TERTINGGI ke terendah. Bayar minimum semua, fokuskan dana ekstra ke hutang dengan bunga tertinggi. Secara matematis, ini cara PALING HEMAT karena kamu mengurangi total bunga yang dibayar. Cocok untuk kamu yang logical dan sabar.',
            'Mana yang lebih baik? Secara matematik: Avalanche. Secara psikologis: Snowball. Pilih yang paling bisa kamu KONSISTEN jalankan. Strategi terbaik adalah yang benar-benar kamu eksekusi, bukan yang paling sempurna di atas kertas.',
          ],
          quote: '"The secret to getting ahead is getting started." — Mark Twain',
        },
      },
      {
        id: 'c2-quiz3', type: 'in-lesson-quiz', title: 'Micro-Quiz: Strategi Pelunasan',
        questions: [
          { question: 'Metode Snowball mengurutkan hutang berdasarkan...', options: ['Bunga tertinggi ke terendah', 'Nominal terkecil ke terbesar', 'Tanggal jatuh tempo terdekat', 'Nama kreditur A-Z'], correctAnswer: 1 },
          { question: 'Keunggulan metode Avalanche adalah...', options: ['Memberikan quick wins secara psikologis', 'Paling hemat secara matematika karena mengurangi total bunga', 'Paling mudah dilakukan', 'Tidak perlu bayar minimum hutang lain'], correctAnswer: 1 },
          { question: 'Strategi pelunasan terbaik adalah...', options: ['Selalu Snowball', 'Selalu Avalanche', 'Yang paling konsisten bisa dijalankan', 'Bayar semua hutang sama rata'], correctAnswer: 2 },
        ],
      },

      // ── 2.4 Skor Kredit ──
      {
        id: 'c2-lesson4', type: 'lesson', title: '2.4 Skor Kredit (BI Checking / SLIK)', duration: '7 menit',
        content: {
          heading: 'Skor Kredit: Reputasi Keuanganmu',
          body: [
            'BI Checking (sekarang namanya SLIK OJK — Sistem Layanan Informasi Keuangan) adalah "rapor keuangan" yang mencatat seluruh riwayat kreditmu. Setiap kali kamu pinjam uang dari bank, fintech, atau bahkan Paylater — semuanya tercatat di sini.',
            'Skor kredit kamu punya 5 level: Kolektibilitas 1 (Lancar) — bayar tepat waktu. Kol 2 (Dalam Perhatian Khusus) — telat 1-90 hari. Kol 3 (Kurang Lancar) — telat 91-120 hari. Kol 4 (Diragukan) — telat 121-180 hari. Kol 5 (Macet) — telat lebih dari 180 hari. Yang ideal? Kol 1. Kalau sudah Kol 3 ke atas, kamu akan sangat sulit dapat pinjaman atau KPR di masa depan.',
            'Kenapa ini penting untuk Gen Z? Karena banyak yang nggak sadar: Paylater yang telat bayar Rp 50 ribu bisa merusak skor kreditmu untuk BERTAHUN-TAHUN. Dampaknya: ditolak KPR saat mau beli rumah, ditolak kredit kendaraan, bahkan ditolak kartu kredit. Satu kesalahan kecil bisa berdampak besar.',
            'Cara cek skor kredit: akses iDebku di website OJK (gratis). Cara memperbaiki: Lunasi semua keterlambatan. Bayar selalu tepat waktu minimal 12-24 bulan berturut-turut. Kurangi jumlah pinjaman aktif. Catatan buruk akan hilang setelah 24 bulan sejak pelunasan terakhir.',
          ],
          quote: '"Your credit score is a reflection of your financial decisions. Make them wisely."',
        },
      },
      {
        id: 'c2-quiz4', type: 'in-lesson-quiz', title: 'Micro-Quiz: Skor Kredit',
        questions: [
          { question: 'SLIK OJK (BI Checking) mencatat...', options: ['Jumlah followers media sosial', 'Seluruh riwayat kredit dan pinjaman', 'Nilai akademik di kampus', 'Riwayat belanja online'], correctAnswer: 1 },
          { question: 'Kolektibilitas 1 artinya...', options: ['Kredit macet total', 'Pembayaran lancar dan tepat waktu', 'Dalam proses penagihan', 'Pinjaman diragukan'], correctAnswer: 1 },
          { question: 'Catatan buruk di SLIK akan hilang setelah...', options: ['1 bulan', '6 bulan', '24 bulan sejak pelunasan', 'Tidak pernah hilang selamanya'], correctAnswer: 2 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c2-checkpoint', title: 'Checkpoint Modul 2: Hutang & Kredit Digital', questionCount: 10, duration: '10 menit',
      description: 'Uji pemahamanmu tentang seluruh materi Navigasi Hutang & Kredit Digital. Skor minimal 60% untuk lulus.',
      questions: [
        { question: 'Paylater mendapatkan keuntungan utama dari...', options: ['Donasi sukarela pengguna', 'Bunga dan denda keterlambatan', 'Subsidi pemerintah', 'Biaya pendaftaran akun'], correctAnswer: 1 },
        { question: 'Fenomena "Pain of Paying" dihilangkan oleh Paylater karena...', options: ['Diskon besar-besaran', 'Pembayaran ditunda sehingga otak tidak merasakan pengeluaran saat itu', 'Bunga 0%', 'Cashback langsung'], correctAnswer: 1 },
        { question: 'KPR untuk rumah termasuk "Good Debt" karena...', options: ['Cicilannya murah', 'Nilai aset (rumah) cenderung naik seiring waktu', 'Semua hutang di bank itu baik', 'Tidak ada bunganya'], correctAnswer: 1 },
        { question: 'Rasio cicilan hutang terhadap penghasilan idealnya tidak lebih dari...', options: ['10%', '30%', '50%', '75%'], correctAnswer: 1 },
        { question: 'Perbedaan utama Snowball dan Avalanche adalah...', options: ['Snowball tidak perlu bayar minimum', 'Snowball fokus hutang terkecil, Avalanche fokus bunga tertinggi', 'Avalanche lebih cepat secara psikologis', 'Tidak ada perbedaan'], correctAnswer: 1 },
        { question: 'Metode yang paling hemat secara matematis adalah...', options: ['Snowball', 'Avalanche', 'Bayar semua sama rata', 'Tidak membayar'], correctAnswer: 1 },
        { question: 'SLIK OJK mencatat riwayat kredit dari...', options: ['Hanya bank konvensional', 'Bank, fintech, dan semua lembaga keuangan', 'Hanya Paylater', 'Hanya kartu kredit'], correctAnswer: 1 },
        { question: 'Kolektibilitas 5 artinya...', options: ['Kredit lancar dan terpercaya', 'Kredit macet (telat >180 hari)', 'Kredit baru diajukan', 'Kredit sudah lunas'], correctAnswer: 1 },
        { question: 'Dampak skor kredit buruk bagi Gen Z adalah...', options: ['Tidak ada dampak signifikan', 'Ditolak KPR, kredit kendaraan, dan kartu kredit di masa depan', 'Hanya dikenakan denda kecil', 'Akun media sosial diblokir'], correctAnswer: 1 },
        { question: 'Cara memperbaiki skor kredit yang buruk adalah...', options: ['Menghapus akun bank', 'Melunasi hutang dan bayar tepat waktu selama 12-24 bulan', 'Membuat hutang baru untuk menutupi yang lama', 'Mengabaikan tagihan yang ada'], correctAnswer: 1 },
      ],
    },
  },
];

// ═══════════════════════════════════════════════════════════════
// MODULE 3: DASAR INVESTASI & WEALTH BUILDING (/class/3)
// ═══════════════════════════════════════════════════════════════
const CLASS_3_LEVELS = [
  {
    id: 'level-1',
    title: 'Dasar Investasi & Wealth Building',
    description: 'Mulai perjalanan investasimu dengan pengetahuan yang tepat dan strategi terbukti.',
    items: [
      // ── Video Intro Modul 3 ──
      {
        id: 'c3-video', type: 'video', title: 'Video: Mulai Investasi dari Nol untuk Pemula', duration: '15 menit',
        videoId: 'p7HKvqRI_Bo',
        description: 'Panduan lengkap memulai investasi dari nol — mulai dari mengenali profil risiko, memilih instrumen, hingga strategi yang tepat untuk pemula.',
        transcript: [
          { time: '00:00', text: 'Banyak yang bilang "investasi itu susah" atau "investasi itu cuma buat orang kaya." Hari ini kita mau bantah semua itu. Investasi itu untuk SEMUA ORANG, dan kamu bisa mulai dengan modal Rp 10 ribu. Serius.' },
          { time: '01:30', text: 'Sebelum mulai, kamu harus tahu profil risikomu dulu. Ada tiga tipe: Konservatif, Moderat, dan Agresif. Masing-masing nggak ada yang salah — yang salah itu kalau kamu invest di instrumen yang nggak sesuai profil risikomu, terus panik pas harga turun.' },
          { time: '03:00', text: 'Tipe Konservatif cocok di Deposito, Reksadana Pasar Uang, atau SBN. Return-nya 4-7% per tahun, tapi tidur tenang. Moderat bisa coba Reksadana Campuran dengan target return 8-12%. Agresif? Saham dan Reksadana Saham dengan potensi 12-20% tapi siap lihat porto merah.' },
          { time: '05:00', text: 'Sekarang kita bahas instrumen yang cocok untuk pemula. Pertama, Reksadana — ini kayak patungan. Kamu setor uang, Manajer Investasi yang kelola. Mulai dari Rp 10 ribu di Bibit atau Bareksa. Kedua, SBN — kamu minjemin uang ke pemerintah, dijamin negara, bunga di atas deposito.' },
          { time: '07:00', text: 'Ketiga, Emas Digital — bisa dibeli mulai 0,01 gram. Ini instrument paling tua tapi terbukti jadi pelindung nilai terhadap inflasi. Harga emas cenderung naik dalam jangka panjang, meski bisa turun di jangka pendek.' },
          { time: '08:30', text: 'Sekarang strategi. Ada dua pendekatan utama: DCA (Dollar Cost Averaging) dan Lump Sum. DCA artinya invest rutin dengan jumlah tetap — misalnya Rp 500 ribu setiap bulan, nggak peduli harga lagi naik atau turun. Lump Sum artinya invest sekaligus dalam jumlah besar.' },
          { time: '10:00', text: 'Buat pemula, saya sangat rekomendasikan DCA. Kenapa? Karena kamu nggak perlu pusing timing pasar. Set auto-invest setiap tanggal gajian — selesai. Konsistensi mengalahkan timing.' },
          { time: '11:30', text: 'Nah ini bagian paling magical: Compound Interest. Albert Einstein bilang ini keajaiban dunia ke-8. Kalau kamu invest Rp 500 ribu per bulan dengan return 12% per tahun selama 20 tahun, kamu akan punya hampir Rp 500 juta. Padahal modal yang kamu keluarkan cuma Rp 120 juta. Sisanya — Rp 380 juta — itu uang yang BEKERJA untukmu.' },
          { time: '13:00', text: 'Tapi sebelum invest, pastikan kamu sudah punya: (1) BPJS Kesehatan, (2) Dana Darurat minimal 3 bulan pengeluaran, (3) Nol hutang konsumtif. Investasi tanpa proteksi itu seperti bangun rumah tanpa fondasi — satu guncangan bisa runtuh semua.' },
          { time: '14:30', text: 'Takeaway: kenali profilmu, mulai dari instrumen aman, gunakan DCA, dan manfaatkan kekuatan compound interest. Ingat: waktu terbaik untuk mulai investasi itu 10 tahun lalu. Waktu terbaik kedua? Hari ini. Yuk mulai!' },
        ],
      },

      // ── 3.1 Profil Risiko ──
      {
        id: 'c3-lesson1', type: 'lesson', title: '3.1 Profil Risiko Investor', duration: '9 menit',
        content: {
          heading: 'Profil Risiko: Kenali Dirimu Sebelum Investasi',
          body: [
            'Sebelum invest sepeser pun, kamu WAJIB tahu profil risikomu. Ini bukan soal benar atau salah — ini soal seberapa kuat mentalmu menghadapi fluktuasi nilai investasi.',
            'Konservatif: Kamu nggak sanggup lihat nilai investasi turun meski 5%. Tidurmu terganggu kalau porto merah. Cocok untuk: Deposito, Reksadana Pasar Uang, Obligasi Negara (ORI/SBR). Target return: 4-7% per tahun. Ini bukan "penakut" — ini bijaksana untuk profil kamu.',
            'Moderat: Kamu oke kalau investasi turun sementara, asal jangka panjang tetap naik. Bisa toleransi fluktuasi 10-20%. Cocok untuk: Reksadana Campuran, Reksadana Pendapatan Tetap, mix Saham + Obligasi. Target return: 8-12% per tahun.',
            'Agresif: Kamu siap melihat porto turun 30-50% tanpa panic selling. Punya horizon waktu panjang (5+ tahun). Cocok untuk: Saham individual, Reksadana Saham, Index Fund. Target return: 12-20% per tahun. Ingat: high return SELALU datang dengan high risk. Nggak ada free lunch di dunia investasi.',
            'Cara mengetahui profil risiko: hampir semua aplikasi investasi (Bibit, Bareksa, Stockbit) punya kuis profil risiko saat registrasi. Jawab sejujurnya — jangan memaksakan diri jadi "agresif" kalau sebenarnya kamu baru mulai. Profil risiko juga bisa berubah seiring waktu dan pengalaman.',
            'Satu kesalahan umum: memilih instrumen karena ikut-ikutan teman atau influencer, bukan karena sesuai profil risiko. "Tapi kan Kak A bilang saham ini pasti naik!" — itu bukan analisis, itu FOMO. Keputusan investasi harus berdasarkan data dan kecocokan profil, bukan endorse.',
          ],
          quote: '"Risk comes from not knowing what you are doing." — Warren Buffett',
        },
      },
      {
        id: 'c3-quiz1', type: 'in-lesson-quiz', title: 'Micro-Quiz: Profil Risiko',
        questions: [
          { question: 'Investor konservatif paling cocok berinvestasi di...', options: ['Saham individual', 'Crypto altcoin', 'Reksadana Pasar Uang dan Obligasi Negara', 'Forex trading'], correctAnswer: 2 },
          { question: 'Profil risiko moderat bisa mentoleransi fluktuasi sebesar...', options: ['0% (tidak boleh turun)', '10-20%', '50-70%', '100% (siap kehilangan semua)'], correctAnswer: 1 },
          { question: 'Prinsip "High Return = High Risk" artinya...', options: ['Investasi berisiko tinggi pasti untung besar', 'Potensi keuntungan besar selalu diiringi risiko kerugian besar', 'Risiko bisa dihilangkan sepenuhnya', 'Semua investasi punya return sama'], correctAnswer: 1 },
        ],
      },

      // ── 3.2 Instrumen Pemula ──
      {
        id: 'c3-lesson2', type: 'lesson', title: '3.2 Instrumen Pemula (Reksadana, SBN, Emas)', duration: '9 menit',
        content: {
          heading: 'Instrumen Investasi untuk Pemula',
          body: [
            'Reksadana: Kamu setor uang, dikelola Manajer Investasi (MI) profesional bersama ribuan investor lain. Ibarat patungan beli berbagai aset. Kelebihan: mulai dari Rp 10 ribu, diversifikasi otomatis, dikelola profesional. Kekurangan: ada biaya management fee (1-3%/tahun), return tidak dijamin, kamu nggak bisa pilih saham mana yang dibeli MI.',
            'Surat Berharga Negara (SBN): Kamu meminjamkan uang ke pemerintah Indonesia, dan pemerintah membayar bunga tetap. Jenis: ORI (Obligasi Ritel Indonesia), SBR (Savings Bond Ritel), ST (Sukuk Tabungan). Kelebihan: DIJAMIN NEGARA (super aman), bunga di atas deposito, mulai dari Rp 1 juta. Kekurangan: tenor terkunci (2-3 tahun), tidak bisa dicairkan kapan saja untuk sebagian jenis.',
            'Emas: Investasi paling old school tapi proven. Kelebihan: lindung nilai terhadap inflasi, mudah dicairkan, bisa dibeli mulai 0,01 gram di Tokopedia/Pluang. Kekurangan: harga bisa turun jangka pendek, tidak menghasilkan passive income (nggak ada bunga/dividen), ada spread harga beli-jual.',
            'Rekomendasi untuk pemula: Mulai dengan Reksadana Pasar Uang untuk belajar. Lalu coba SBN saat ada penawaran (biasanya 2-3 kali setahun). Emas sebagai diversifikasi 5-10% dari portofolio. Yang penting: MULAI dulu, sempurnakan sambil jalan.',
          ],
          quote: '"The best investment you can make is in yourself." — Warren Buffett',
        },
      },
      {
        id: 'c3-quiz2', type: 'in-lesson-quiz', title: 'Micro-Quiz: Instrumen Investasi',
        questions: [
          { question: 'Keunggulan utama SBN (Surat Berharga Negara) adalah...', options: ['Return tertinggi di pasar', 'Bisa dicairkan kapan saja', 'Dijamin oleh negara sehingga sangat aman', 'Tidak ada minimal pembelian'], correctAnswer: 2 },
          { question: 'Kekurangan emas sebagai investasi adalah...', options: ['Tidak bisa dibeli dalam jumlah kecil', 'Tidak menghasilkan passive income (bunga/dividen)', 'Harganya selalu turun', 'Hanya bisa dibeli di bank'], correctAnswer: 1 },
          { question: 'Reksadana cocok untuk pemula karena...', options: ['Dijamin pemerintah', 'Return selalu positif', 'Mulai dari nominal kecil dan dikelola profesional', 'Tidak ada risiko sama sekali'], correctAnswer: 2 },
        ],
      },

      // ── 3.3 Strategi Investasi ──
      {
        id: 'c3-lesson3', type: 'lesson', title: '3.3 Strategi Investasi (DCA vs Lump Sum)', duration: '8 menit',
        content: {
          heading: 'Strategi Investasi: DCA, Lump Sum & Compound Interest',
          body: [
            'DCA (Dollar Cost Averaging): Investasi rutin dengan jumlah tetap setiap periode (misal Rp 500 ribu/bulan). Saat harga turun, kamu dapat lebih banyak unit. Saat harga naik, unit yang sudah kamu punya jadi lebih mahal. Rata-rata harga belimu jadi lebih stabil. Cocok untuk: pemula, orang dengan gaji bulanan, yang nggak mau stres timing pasar.',
            'Lump Sum: Investasi sekaligus dalam jumlah besar pada satu waktu. Misal: dapat bonus Rp 10 juta, langsung invest semua. Secara statistik, Lump Sum mengalahkan DCA 67% dari waktu (karena pasar cenderung naik jangka panjang). Tapi secara psikologis? Brutal. Bayangkan invest Rp 10 juta, besoknya pasar turun 15%.',
            'Compound Interest — ini "cheat code" kekayaan. Compound artinya keuntunganmu diinvestasikan kembali, menghasilkan keuntungan atas keuntungan. Contoh: Rp 500 ribu/bulan dengan return 12%/tahun selama 20 tahun = Rp 499 juta. Modal yang kamu keluarkan? Hanya Rp 120 juta. Sisanya (Rp 379 juta) adalah "uang yang bekerja untukmu." Semakin cepat mulai, semakin dahsyat efek compounding.',
            'Rekomendasi untuk Gen Z: Gunakan DCA. Set auto-invest di aplikasi (Bibit, Bareksa, Stockbit) setiap tanggal gajian. Jangan coba timing the market — time IN the market beats timing the market. Konsistensi mengalahkan kesempurnaan.',
          ],
          quote: '"Compound interest is the eighth wonder of the world. He who understands it, earns it. He who doesn\'t, pays it." — Albert Einstein',
        },
      },
      {
        id: 'c3-quiz3', type: 'in-lesson-quiz', title: 'Micro-Quiz: Strategi Investasi',
        questions: [
          { question: 'DCA (Dollar Cost Averaging) artinya...', options: ['Investasi sekaligus dalam jumlah besar', 'Investasi rutin dengan jumlah tetap setiap periode', 'Menjual semua aset saat harga turun', 'Meminjam uang untuk investasi'], correctAnswer: 1 },
          { question: 'Keunggulan utama Compound Interest adalah...', options: ['Keuntungan dijamin oleh bank', 'Keuntungan diinvestasikan kembali sehingga menghasilkan keuntungan atas keuntungan', 'Tidak ada risiko kerugian', 'Hanya bisa didapat dari deposito'], correctAnswer: 1 },
          { question: 'Pernyataan "Time in the market beats timing the market" artinya...', options: ['Harus selalu beli di harga terendah', 'Konsistensi berinvestasi jangka panjang lebih penting dari menebak waktu terbaik', 'Pasar saham selalu naik setiap hari', 'Trading harian lebih menguntungkan'], correctAnswer: 1 },
        ],
      },

      // ── 3.4 Proteksi Keuangan ──
      {
        id: 'c3-lesson4', type: 'lesson', title: '3.4 Proteksi Keuangan (Asuransi)', duration: '7 menit',
        content: {
          heading: 'Proteksi Keuangan: Asuransi Sebelum Investasi',
          body: [
            'Hot take yang nggak populer: kamu HARUS punya asuransi SEBELUM mulai investasi. Kenapa? Karena satu kejadian medis bisa menghancurkan seluruh portfolio investasimu dalam sekejap. Operasi usus buntu saja bisa Rp 30-50 juta. Tanpa asuransi, uang investasimu yang sudah kamu bangun bertahun-tahun bisa lenyap dalam semalam.',
            'BPJS Kesehatan adalah WAJIB dan non-negotiable. Dengan iuran Rp 35-150 ribu/bulan, kamu mendapat perlindungan kesehatan dasar. Ini safety net paling murah yang tersedia. Kalau kamu belum daftar, daftarkan dirimu HARI INI.',
            'Asuransi Jiwa dibutuhkan kalau kamu punya TANGGUNGAN — pasangan, anak, atau orang tua yang bergantung secara finansial padamu. Pilih asuransi jiwa MURNI (term life), bukan unit link. Unit link menggabungkan asuransi + investasi, tapi hasilnya biasanya kalah di kedua sisi: proteksi kurang, return investasi rendah karena potongan biaya yang sangat tinggi.',
            'Urutan prioritas proteksi: (1) BPJS Kesehatan, (2) Dana Darurat, (3) Asuransi Kesehatan tambahan (kalau mampu), (4) Asuransi Jiwa (kalau punya tanggungan), (5) Baru mulai investasi. Jangan terbalik — investasi tanpa proteksi itu seperti menumpuk harta di rumah tanpa kunci pintu.',
          ],
          quote: '"Someone is sitting in the shade today because someone planted a tree a long time ago." — Warren Buffett',
        },
      },
      {
        id: 'c3-quiz4', type: 'in-lesson-quiz', title: 'Micro-Quiz: Proteksi Keuangan',
        questions: [
          { question: 'Mengapa asuransi harus dimiliki SEBELUM mulai investasi?', options: ['Karena asuransi lebih menguntungkan', 'Karena satu kejadian medis bisa menghancurkan seluruh portfolio', 'Karena investasi itu ilegal tanpa asuransi', 'Karena asuransi wajib dari pemerintah untuk investor'], correctAnswer: 1 },
          { question: 'Kenapa unit link TIDAK direkomendasikan?', options: ['Karena ilegal di Indonesia', 'Proteksi kurang dan return investasi rendah karena biaya tinggi', 'Karena hanya untuk orang kaya', 'Karena tidak dijual di Indonesia'], correctAnswer: 1 },
          { question: 'Urutan prioritas yang benar adalah...', options: ['Investasi → Dana Darurat → BPJS', 'BPJS → Dana Darurat → Asuransi → Investasi', 'Investasi → Asuransi → Dana Darurat', 'Saham → Crypto → Emas → BPJS'], correctAnswer: 1 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c3-checkpoint', title: 'Checkpoint Modul 3: Investasi & Wealth Building', questionCount: 10, duration: '10 menit',
      description: 'Uji pemahamanmu tentang seluruh materi Dasar Investasi & Wealth Building. Skor minimal 60% untuk lulus.',
      questions: [
        { question: 'Investor dengan profil risiko konservatif sebaiknya berinvestasi di...', options: ['Saham gorengan', 'Reksadana Pasar Uang dan Obligasi Negara', 'Forex leverage tinggi', 'Crypto altcoin'], correctAnswer: 1 },
        { question: 'Target return untuk profil risiko moderat adalah...', options: ['1-3% per tahun', '8-12% per tahun', '30-50% per tahun', '100% per tahun'], correctAnswer: 1 },
        { question: 'SBN (Surat Berharga Negara) dijamin oleh...', options: ['Bank swasta', 'Perusahaan asuransi', 'Negara Republik Indonesia', 'Manajer Investasi'], correctAnswer: 2 },
        { question: 'Kekurangan emas sebagai instrumen investasi adalah...', options: ['Harganya selalu turun', 'Tidak bisa dibeli dalam satuan kecil', 'Tidak menghasilkan passive income', 'Sangat sulit dijual kembali'], correctAnswer: 2 },
        { question: 'DCA lebih cocok untuk pemula karena...', options: ['Dijamin selalu profit', 'Mengurangi risiko timing dan cocok untuk gaji bulanan', 'Tidak ada biaya transaksi', 'Return lebih tinggi dari Lump Sum'], correctAnswer: 1 },
        { question: 'Compound Interest bekerja paling dahsyat karena faktor...', options: ['Bunga bank yang tinggi', 'Waktu yang panjang dan konsistensi', 'Inflasi yang rendah', 'Pajak yang kecil'], correctAnswer: 1 },
        { question: 'Asuransi harus dimiliki sebelum investasi karena...', options: ['Lebih menguntungkan', 'Satu kejadian medis bisa menghancurkan seluruh portfolio', 'Diwajibkan oleh OJK', 'Investasi butuh bukti asuransi'], correctAnswer: 1 },
        { question: 'Jenis asuransi jiwa yang direkomendasikan adalah...', options: ['Unit link', 'Term life (asuransi jiwa murni)', 'Asuransi endowment', 'Asuransi pendidikan'], correctAnswer: 1 },
        { question: 'BPJS Kesehatan bersifat...', options: ['Opsional dan sukarela', 'Wajib dan non-negotiable', 'Hanya untuk PNS', 'Hanya untuk lansia'], correctAnswer: 1 },
        { question: 'Urutan prioritas keuangan yang benar adalah...', options: ['Investasi → Asuransi → Dana Darurat', 'BPJS → Dana Darurat → Asuransi → Investasi', 'Saham → Crypto → Tabungan', 'Gadget baru → Liburan → Baru nabung'], correctAnswer: 1 },
      ],
    },
  },
];

// ── Metadata ──
export const CLASS_META = {
  1: { title: 'Financial Foundation & Mindset', category: 'Foundation', difficulty: 1, totalTime: '45 menit', description: 'Bangun pondasi keuangan dan mindset finansial yang sehat.' },
  2: { title: 'Navigasi Hutang & Kredit Digital', category: 'Intermediate', difficulty: 2, totalTime: '45 menit', description: 'Pahami ekosistem fintech, kelola hutang, dan jaga skor kreditmu.' },
  3: { title: 'Dasar Investasi & Wealth Building', category: 'Advanced', difficulty: 3, totalTime: '45 menit', description: 'Mulai perjalanan investasi dan bangun kekayaan jangka panjang.' },
};

export const CLASS_LEVELS = {
  1: CLASS_1_LEVELS,
  2: CLASS_2_LEVELS,
  3: CLASS_3_LEVELS,
};
