// MODULE 1: FINANCIAL FOUNDATION & MINDSET (/class/1)
// ═══════════════════════════════════════════════════════════════
const CLASS_1_LEVELS = [
  // ── LEVEL 0: PENGANTAR MODUL ──
  {
    id: 'level-0',
    title: 'Pengantar Modul',
    description: 'Selamat datang di langkah pertama menuju kebebasan finansial. Sebelum kita menyentuh angka, grafik, atau aplikasi investasi, kita harus memperbaiki "mesin" utama dalam keuangan: Pola Pikir (Mindset). Tanpa fondasi yang kuat, berapa pun uang yang kamu hasilkan akan habis tanpa jejak.',
    items: [
      {
        id: 'c1-l0-1', type: 'lesson', title: 'Selamat Datang', duration: '2 menit',
        content: {
          heading: 'Pengantar Modul 1',
          body: [
            'Selamat datang di langkah pertama menuju kebebasan finansial. Sebelum kita menyentuh angka, grafik, atau aplikasi investasi, kita harus memperbaiki "mesin" utama dalam keuangan: Pola Pikir (Mindset). Tanpa fondasi yang kuat, berapa pun uang yang kamu hasilkan akan habis tanpa jejak.',
          ],
        },
      },
    ],
    finalQuiz: {
      id: 'c1-l0-checkpoint', title: 'Siap Lanjut?', questionCount: 1, duration: '1 menit',
      description: 'Konfirmasi pemahaman.',
      questions: [
        { question: 'Apakah kamu siap mengubah mindset?', options: ['Belum', 'Siap!', 'Mungkin', 'Tidak Tahu'], correctAnswer: 1 }
      ]
    }
  },
  // ── LEVEL 1: MINDSET & FONDASI DASAR ──
  {
  

    id: 'level-1',
    title: 'Mindset & Fondasi Dasar',
    description: 'Selamat datang di langkah pertama menuju kebebasan finansial. Sebelum kita menyentuh angka, grafik, atau aplikasi investasi, kita harus memperbaiki "mesin" utama dalam keuangan: Pola Pikir (Mindset). Tanpa fondasi yang kuat, berapa pun uang yang kamu hasilkan akan habis tanpa jejak.',
    items: [
      {
        id: 'c1-l1-video', type: 'video', title: 'Video: Psikologi Uang & Mindset Kaya', duration: '10 menit',
        videoId: 'mj2Kk4FVN40',
        description: 'Belajar bagaimana mindset mempengaruhi keputusan finansialmu dan cara membangun kebiasaan uang yang sehat.',
        transcript: [
          { time: '00:00', text: 'Selamat datang di FinLitGo! Hari ini kita akan membahas hal yang paling krusial: Mindset.' },
          { time: '02:30', text: 'Banyak orang gagal bukan karena kurang ilmu, tapi karena mindset yang salah tentang uang.' },
          { time: '05:00', text: 'Uang itu alat, bukan tujuan akhir. Kita harus mengendalikan uang, bukan sebaliknya.' },
          { time: '08:00', text: 'Langkah pertama adalah menyadari kebiasaan belanja impulsif kita.' },
        ],
      },
      {
        id: 'c1-l1-1', type: 'lesson', title: 'Melawan "LIFESTYLE CREEP"', duration: '10 menit',
        content: {
          heading: 'Jebakan Lifestyle Creep & Kebutuhan vs Keinginan',
          body: [
            'Pernahkah kamu merasa gajimu naik, tapi tabunganmu tetap saja tidak bertambah? Itulah yang disebut dengan Lifestyle Creep.',
            'Lifestyle Creep adalah fenomena di mana standar hidup dan pengeluaran tidak wajibmu (diskresioner) meningkat sejalan dengan peningkatan penghasilan. Apa yang dulunya dianggap sebagai kemewahan, pelan-pelan berubah menjadi "kebutuhan" sehari-hari.',
            'Contoh sederhananya: Saat bergaji UMR, kamu biasa makan siang bawa bekal atau di warteg. Setelah gajimu naik jadi dua kali lipat, kamu mulai merasa "butuh" makan siang di kafe atau pesan makanan lewat ojol setiap hari. Inilah alasan mengapa orang bergaji Rp20 juta bisa merasa sama "miskinnya" dengan saat ia bergaji Rp5 juta.',
            'Teknik Membedakan: Jebakan "Self-Reward"',
            'Media sosial sering membuat kita membungkus Keinginan (Wants) dengan label Kebutuhan (Needs) berkedok self-reward. Mari kita luruskan batasannya:',
            '1. Kebutuhan (Needs): Hal-hal esensial untuk hidup. Jika tidak dipenuhi, hidup atau pekerjaanmu akan terganggu (Makan bergizi, tempat tinggal, transportasi kerja, listrik, asuransi dasar).',
            '2. Keinginan (Wants): Ekstra yang membuat hidup lebih nyaman secara emosional. Jika tidak dipenuhi, kamu hanya merasa kurang puas sementara (Kopi kekinian tiap pagi, gadget terbaru, langganan 5 platform streaming, baju baru tiap bulan).',
            'Waspadai "Jebakan Upgrade": Makan adalah kebutuhan, tapi makan di restoran mewah adalah keinginan. Pakaian adalah kebutuhan, tapi tas branded adalah keinginan.',
            'Strategi Melawan Lifestyle Creep',
            '1. The 72-Hour Rule (Aturan 3 Hari): Jika ingin membeli barang non-pokok (misal di atas Rp200.000), masukkan ke keranjang belanja tapi jangan langsung bayar. Tunggu 72 jam. Biasanya emosi impulsif hilang di 24 jam pertama. Jika setelah 3 hari kamu masih merasa barang itu berdampak positif dan sesuai budget, silakan beli.',
            '2. Pay Yourself First (Gaji Dirimu Sendiri): Begitu gajian turun, transfer 20% langsung ke rekening tabungan atau investasi. Hadapi bulan tersebut dengan 80% sisanya. Jangan pernah menabung dari sisa uang di akhir bulan, karena uang memiliki sifat akan selalu habis jika ada di dompet.',
            '3. Hitung Harga dengan "Jam Kerja": Jika gajimu Rp5 juta per bulan (160 jam kerja), berart upahmu sekitar Rp31.250/jam. Jika ingin beli sepatu Rp1,5 juta, tanyakan pada dirimu: "Apakah sepatu ini sepadan ditukar dengan 48 jam penderitaanku bekerja?"'
          ],
          quote: '"Jangan menabung apa yang tersisa setelah berbelanja, tapi belanjakan apa yang tersisa setelah menabung." — Warren Buffett'
        },
      },
      {
        id: 'c1-l1-2', type: 'lesson', title: 'THE POWER OF COMPOUNDING & BAHAYA INFLASI', duration: '15 menit',
        content: {
          heading: 'Dua Kekuatan Terselubung: Compounding & Inflasi',
          videoId: 'kP_TyTTsv68',
          body: [
            'Dalam dunia keuangan, ada dua kekuatan besar yang bekerja tanpa henti setiap hari. Satu kekuatan bisa melipatgandakan asetmu tanpa kamu sadari, sementara kekuatan lainnya perlahan menggerus kekayaanmu secara diam-diam. Kedua kekuatan itu adalah Compounding Interest (Bunga Majemuk) dan Inflasi.',
            '1. Compounding Interest (Bunga Majemuk)',
            'Konsep dasar compounding adalah uangmu bekerja untukmu. Keuntungan (bunga) yang didapat dari investasi kembali ditambahkan ke modal awal, sehingga di periode berikutnya, keuntungan tersebut juga ikut menghasilkan keuntungan baru lagi.',
            'Contoh nyata: Jika kamu menginvestasikan Rp1.000.000 dengan keuntungan 10% per tahun, maka di tahun pertama uangmu menjadi Rp1.100.000. Di tahun kedua, bunga 10% dihitung dari Rp1.100.000 (bukan modal asli Rp1 juta), menghasilkan total Rp1.210.000. Semakin lama dibiarkan, pertumbuhannya semakin ekstrem meroket ke atas (Snowball Effect).',
            '2. Bahaya Inflasi (Pencuri Tak Kasat Mata)',
            'Berkebalikan dengan The Power of Compounding, inflasi adalah penurunan daya beli mata uang karena naiknya harga barang dan jasa. Jika uangmu hanya diam di rekening tanpa bunga yang sepadan, daya belinya merosot termakan waktu.',
            'Contoh nyata: Ingat harga semangkuk bakso di tahun 2014 yang mungkin hanya Rp10.000? Kini di tahun 2024, harga bakso yang sama sudah mencapai Rp20.000. Ini membuktikan uang memang tidak ke mana-mana dari dompetmu, tapi nilainya "basi" dan tak bisa membeli barang yang sama jumlahnya di beberapa tahun kemudian.',
            'Kesimpulan: Mulailah Sedini Mungkin!',
            'Waktu lebih penting daripada jumlah modal awalmu. Menabung dan berinvestasi dana kecil namun KONSISTEN dan dimulai di usia muda (misal usia 20 tahun), akan memberikan hasil pensiun yang jauh lebih masif ketimbang investasi skala jumbo tapi baru dimulai di usia 40 tahun. Jadikan compounding senjatamu untuk menaklukkan inflasi!'
          ],
          quote: '"Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn\'t, pays it." — Albert Einstein'
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
      id: 'c1-l1-checkpoint', title: 'Checkpoint Level 1: Mindset', questionCount: 10, duration: '10 menit',
      description: 'Tes pemahamanmu tentang mindset dan materi yang baru dipelajari.',
      questions: [
        { question: 'Apa yang dimaksud dengan fenomena "Lifestyle Creep"?', options: ['Gaya hidup merayap naik seiring bertambahnya penghasilan', 'Hidup hemat walau gaji besar', 'Naiknya harga barang setiap tahun', 'Investasi berbunga majemuk'], correctAnswer: 0 },
        { question: 'Mana dari berikut ini yang merupakan contoh jebakan "keinginan" berkedok kebutuhan?', options: ['Makan siang bergizi', 'Membeli tas branded mahal untuk bekerja', 'Membayar tagihan listrik', 'Membeli obat saat sakit'], correctAnswer: 1 },
        { question: 'Apa fungsi dari "The 72-Hour Rule"?', options: ['Aturan jam kerja dalam seminggu', 'Menunggu 3 hari sebelum memutuskan beli barang non-pokok', 'Syarat pencairan deposito', 'Batas waktu membayar hutang bulanan'], correctAnswer: 1 },
        { question: 'Bagaimana cara kerja metode "Pay Yourself First"?', options: ['Belanja dulu baru menabung sisanya', 'Menyisihkan tabungan di awal saat baru gajian', 'Berhutang ke diri sendiri', 'Membayar gaji karyawan terlebih dahulu'], correctAnswer: 1 },
        { question: 'Menghitung harga barang konsumtif dengan "Jam Kerja" berguna untuk...', options: ['Menghitung upah lembur bulanan', 'Pamer kepada atasan', 'Mengukur apakah suatu barang sepadan dengan waktu dan lelah kita', 'Syarat pengajuan pinjaman bank'], correctAnswer: 2 },
        { question: 'Apa inti dari konsep Compounding Interest (Bunga Majemuk)?', options: ['Bunga kredit yang menumpuk jadi hutang', 'Keuntungan investasi ikut ditambahkan ke modal sehingga menghasilkan keuntungan baru', 'Bunga flat yang tidak berubah dari tahun ke tahun', 'Pajak dari keuntungan investasi'], correctAnswer: 1 },
        { question: 'Apa dampak utama dari Inflasi terhadap uang simpanan kita?', options: ['Membuat uang bertambah banyak nilainya', 'Tidak memberikan dampak apapun', 'Menurunkan daya beli uang di masa depan', 'Membuat harga barang menjadi lebih murah'], correctAnswer: 2 },
        { question: 'Kapan waktu terbaik untuk mulai berinvestasi agar efek Compounding maksimal?', options: ['Sedini mungkin, walau dengan uang nominal kecil', 'Saat usia sudah tua dan kaya raya', 'Saat sudah bisa membeli rumah tangga mewah', 'Di akhir tahun jika ada bonus saja'], correctAnswer: 0 },
        { question: 'Mengapa menabung uang tunai di celengan tidak dianjurkan untuk tujuan jangka panjang?', options: ['Bisa dihabiskan untuk jajan', 'Karena nilainya akan tergerus oleh inflasi secara diam-diam', 'Karena bank akan menghentikan akun', 'Karena celengan tanah liat mudah pecah'], correctAnswer: 1 },
        { question: '"Jangan menabung apa yang tersisa setelah berbelanja, tapi belanjakan apa yang tersisa setelah menabung." Kutipan ini mewakili strategi apa?', options: ['Lifestyle Creep', 'The 72-Hour Rule', 'Pay Yourself First', 'Compounding Interest'], correctAnswer: 2 },
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
        id: 'c1-l2-1', type: 'lesson', title: 'Cashflow Tracking & Kebocoran Halus', duration: '12 menit',
        content: {
          heading: 'Cashflow Tracking: Menemukan Kebocoran Halus',
          videoId: 'sCUghGYNGC4',
          body: [
            'Banyak orang merasa uangnya perlahan hilang begitu saja di pertengahan bulan tanpa tahu ke mana perginya. Tanpa pencatatan arus kas (cashflow tracking), kamu seolah sedang menyetir mobil dengan mata tertutup di jalan tol. Pencatatan keuangan bukanlah tentang menjadi pelit atau mengekang diri, melainkan tentang memiliki kendali penuh atas hidup dan uangmu.',
            'Dalam bab ini, kita membagi pengeluaran menjadi tiga kategori utama yang wajib kamu pantau:',
            '1. Fixed Expenses (Pengeluaran Tetap): Biaya yang jumlah dan waktu tagihannya selalu sama setiap bulan. Contohnya adalah biaya sewa kost, cicilan kendaraan, tagihan internet, dan asuransi. Biaya ini sangat mudah diprediksi.',
            '2. Variable Expenses (Pengeluaran Tidak Tetap): Biaya yang frekuensi dan nominalnya berubah-ubah tergantung gaya hidup dan kebutuhanmu di bulan tersebut. Misalnya anggaran makan, bensin, belanja bulanan, dan kebutuhan rumah tangga. Di sinilah letak fluktuasi terbesar dari pengeluaranmu.',
            '3. Invisible Leaks (Bocor Alus): Biaya berskala kecil yang sangat sering diabaikan namun berakibat fatal jika diakumulasi dalam setahun. Contohnya adalah biaya admin transfer antar bank, uang parkir harian, biaya layanan ekspedisi pesanan makanan, atau langganan aplikasi streaming yang sebenarnya sudah jarang kamu tonton.',
            'Langkah pertama yang paling krusial sebelum melakukan budgeting adalah melihat kenyataan pahit dari riwayat transaksimu selama satu atau tiga bulan terakhir. Dari situ, kamu akan menyadari seberapa besar uang yang menguap pada kategori pengeluaran tidak tetap dan kebocoran-kebocoran halus.'
          ],
        },
      },
      {
        id: 'c1-l2-2', type: 'lesson', title: 'Strategi Alokasi Gaji 50/30/20', duration: '10 menit',
        content: {
          heading: 'Strategi Alokasi Gaji: Metode 50/30/20',
          videoId: 'a5e0Xzik9SA',
          body: [
            'Setelah mengetahui ke mana aliran uangmu pergi, saatnya kamu menjadi manajer yang mengarahkan ke mana uang tersebut seharusnya pergi. Metode 50/30/20 adalah standar emas manajemen keuangan dasar bagi pemula.',
            'Metode ini membagi pendapatan bersih (setelah pajak) ke dalam tiga pos besar:',
            '1. 50% Needs (Kebutuhan Pokok): Ini adalah alokasi untuk mempertahankan kelangsungan hidupmu. Uang di pos ini digunakan untuk membayar sewa tempat tinggal, bahan makanan pokok, tagihan listrik, transportasi bekerja, dan asuransi kesehatan dasar.',
            '2. 30% Wants (Keinginan dan Gaya Hidup): Ini adalah alokasi untuk menikmati hasil kerja kerasmu. Pos ini sah digunakan untuk nongkrong di kafe, menjalani hobi, langganan hiburan, liburan akhir pekan, atau sekadar membeli baju baru. Keuangan yang sehat tetap menyediakan ruang untuk kebahagiaan masa kini.',
            '3. 20% Savings and Debt (Masa Depan dan Kewajiban): Ini adalah alokasi masa depan. Prioritas pertama di pos ini adalah membangun dana darurat, melunasi hutang konsumtif (seperti paylater atau kartu kredit), dan memulai investasi.',
            'Satu hal yang perlu diingat: Metode ini bukanlah aturan baku yang tidak bisa diubah. Jika kondisi finansialmu saat ini sedang sulit atau gajimu didominasi oleh kebutuhan utama yang mendesak, modifikasilah rasio ini sesuai dengan realitas. Kamu bisa menggunakan rasio 70/20/10 atau 60/30/10. Yang terpenting adalah kamu memiliki persentase tabungan yang konsisten setiap bulan.'
          ],
        },
      },
      {
        id: 'c1-l2-3', type: 'lesson', title: 'Teknik Jar System & Otomasi Digital', duration: '10 menit',
        content: {
          heading: 'Teknik Jar System & Otomasi Keuangan Digital',
          body: [
            'Sebesar apa pun tekadmu, disiplin dan kemauan manusia memiliki batas. Oleh karena itu, kita tidak bisa hanya mengandalkan niat untuk menabung setiap bulannya. Kita membutuhkan sebuah sistem yang bekerja otomatis layaknya mesin.',
            'Konsep pertama adalah Teknik Jar System (Sistem Toples). Daripada mencampur semua uang dalam satu rekening utama penampung gaji yang rawan memicu kebocoran, pisahkan dana sesuai tujuan ke dalam toples-toples berbeda. Di era modern, kamu tidak perlu membuat banyak rekening bank berbiaya admin mahal. Manfaatkan fitur Kantong atau Pocket pada bank digital masa kini (seolah-olah seperti amplop virtual) untuk memilah saldo dengan mudah tanpa terpotong biaya admin.',
            'Konsep kedua adalah Strategi Otomasi. Kesalahan terbesar pekerja pemula adalah menunggu sisa uang di akhir bulan untuk ditabung. Padahal, uang selalu mencari pola untuk segera dihabiskan jika terus dilihat di layar rekening mobile banking.',
            'Gunakan fitur Auto-Debet (pemotongan otomatis) yang tersedia di aplikasi perbankanmu. Atur agar sistem bank memotong nominal atau sekian persen dari gajimu tepat satu hari setelah tanggal gajian turun, dan memindahkannya langsung ke rekening tabungan mandiri atau instrumen investasi. Dengan teknik ini, kamu secara tidak sadar memaksakan dirimu untuk menyesuaikan gaya hidup hanya dengan sisa uang yang ada di rekening pengeluaran.'
          ],
        },
      },
      {
        id: 'c1-l2-quiz', type: 'in-lesson-quiz', title: 'Quiz Budgeting',
        questions: [
          { question: 'Dalam metode 50/30/20, berapa persen untuk keinginan?', options: ['50%', '30%', '20%', '10%'], correctAnswer: 1 },
          { question: 'Apa yang dimaksud Latte Factor?', options: ['Hobi minum kopi', 'Pengeluaran kecil rutin yang tidak disadari', 'Pajak minuman', 'Gaya hidup mewah'], correctAnswer: 1 },
          { question: 'Biaya sewa tempat tinggal dan tagihan internet bulanan termasuk kategori...', options: ['Variable Expenses', 'Invisible Leaks', 'Fixed Expenses', 'Needs and Wants'], correctAnswer: 2 },
          { question: 'Apa tujuan mengaktifkan fitur Auto-Debet untuk tabungan?', options: ['Agar mendapat promo bank', 'Supaya tabungan otomatis terpotong di awal tanpa menunggu sisa', 'Agar bank tidak memblokir rekening', 'Meningkatkan limit kredit'], correctAnswer: 1 },
          { question: 'Konsep dasar dari Teknik Jar System adalah...', options: ['Menyimpan uang tunai di toples kaca', 'Membuat sebanyak mungkin rekening bank', 'Memisahkan dana ke pos atau kantong berbeda sesuai tujuan', 'Menggabungkan seluruh penghasilan di satu rekening'], correctAnswer: 2 },
        ],
      },
    ],
    finalQuiz: {
      id: 'c1-l2-checkpoint', title: 'Checkpoint Level 2: Management', questionCount: 10, duration: '10 menit',
      description: 'Tes kemampuan mengelola anggaran berdasarkan materi yang telah dipelajari.',
      questions: [
        { question: 'Tujuan utama melakukan pencatatan arus kas (cashflow tracking) adalah...', options: ['Mencari alasan untuk pelit', 'Mengetahui secara pasti ke mana uang pergi setiap bulannya', 'Syarat mengajukan pinjaman bank', 'Melihat seberapa kaya diri kita'], correctAnswer: 1 },
        { question: 'Kategori pengeluaran manakah yang paling sering mengalami fluktuasi (paling berubah-ubah) setiap bulannya?', options: ['Invisible Leaks', 'Fixed Expenses', 'Variable Expenses', 'Masa Depan'], correctAnswer: 2 },
        { question: 'Langganan streaming yang tidak pernah ditonton atau biaya parkir harian sering dikategorikan sebagai...', options: ['Beban mutlak', 'Kebocoran halus (Invisible Leaks)', 'Kebutuhan pokok', 'Keinginan terpendam'], correctAnswer: 1 },
        { question: 'Dalam aturan finansial 50/30/20, porsi alokasi 50% idealnya digunakan untuk...', options: ['Gaya hidup dan liburan', 'Tabungan dan investasi', 'Membayar hutang KPR', 'Kebutuhan pokok untuk bertahan hidup (Needs)'], correctAnswer: 3 },
        { question: 'Mengapa metode Jar System (Sistem Toples) efektif digunakan?', options: ['Karena dana dipisah sesuai tujuan agar tidak rawan terpakai untuk hal lain', 'Karena membebaskan kita dari pajak', 'Karena bunga bank lebih tinggi', 'Karena memaksa kita tidak belanja'], correctAnswer: 0 },
        { question: 'Berapa porsi yang dianjurkan untuk Tabungan dan Pembayaran Hutang (Savings and Debt) pada metode dasar 50/30/20?', options: ['10%', '20%', '30%', '50%'], correctAnswer: 1 },
        { question: 'Apa kesalahan terbesar pekerja pemula dalam hal menabung?', options: ['Menunggu sisa uang di akhir bulan untuk ditabung', 'Terlalu banyak jenis tabungan', 'Investasi terlalu besar', 'Menolak menabung tunai'], correctAnswer: 0 },
        { question: 'Apa fungsi utama fitur Auto-Debet dalam strategi otomatisasi keuangan?', options: ['Membayar pajak bulanan', 'Memblokir uang pencurian', 'Memotong penghasilan secara otomatis di awal bulan untuk dipindahkan ke tabungan', 'Membuat uang tidak bisa ditarik selamanya'], correctAnswer: 2 },
        { question: 'Jika kondisi finansial sedang cukup sulit, apakah komposisi metode 50/30/20 boleh diubah?', options: ['Tidak boleh, harus diusahakan', 'Boleh, disesuaikan realitas namun persentase tabungan harus tetap konsisten', 'Boleh, tapi lapor bank terlebih dahulu', 'Boleh dengan menghilangkan tabungan'], correctAnswer: 1 },
        { question: 'Karakteristik utama dari pengeluaran tetap (Fixed Expenses) adalah...', options: ['Bisa dinegosiasi setiap saat', 'Jumlah dan waktu tagihannya selalu sama dan mudah diprediksi', 'Hanya dibayar jika ada sisa uang', 'Muncul tanpa disadari'], correctAnswer: 1 },
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
        id: 'c1-l3-1', type: 'lesson', title: 'Dana Darurat: Fondasi Anti Panik', duration: '15 menit',
        content: {
          heading: 'Emergency Fund: Kenapa Kamu Butuh?',
          videoId: 'j-E-D8be2qY',
          body: [
            'Dana Darurat (Emergency Fund) adalah jaring pengaman finansial berupa dana tunai yang sengaja disisihkan murni untuk menghadapi keadaan darurat yang tidak terduga. Keadaan darurat ini mencakup pemutusan hubungan kerja (PHK), biaya perbaikan rumah atau kendaraan yang mendesak, kecelakaan, atau tagihan medis di luar jangkauan asuransi.',
            'Banyak orang mengabaikan pos ini dan langsung melompat ke investasi. Padahal, berinvestasi tanpa dana darurat ibarat membangun rumah mewah di atas pasir. Ketika terjadi guncangan, kamu akan terpaksa mencairkan investasi saat portofolio sedang rugi (cut loss) atau lebih parah lagi, terjerat hutang paylater dan pinjaman online berbunga tinggi.',
            'Berapa jumlah ideal Dana Darurat?',
            'Jumlah dana darurat tidak sama bagi setiap orang dan sangat bergantung pada status tanggungan dan stabilitas pekerjaan:',
            '1. Lajang (Single) tanpa tanggungan: 3 hingga 6 kali pengeluaran bulanan. Jika pengeluaran bulananmu Rp3 juta, kamu butuh Rp9 juta - Rp18 juta.',
            '2. Menikah tanpa anak: 6 hingga 9 kali pengeluaran bulanan.',
            '3. Menikah dengan anak atau pekerja lepas (freelancer): 9 hingga 12 kali pengeluaran bulanan.',
            'Kriteria Penyimpanan Dana Darurat:',
            'Uang ini harus memenuhi dua kriteria utama: Aman dari fluktuasi nilai dan Sangat Mudah Dicairkan (Likuid). Jangan simpan dana darurat di instrumen saham atau properti. Tempat terbaik untuk menyimpannya adalah di rekening tabungan terpisah yang tidak memiliki kartu ATM, atau pada instrumen reksadana pasar uang (RDPU) yang minim risiko namun memberikan pengembalian sedikit lebih baik daripada bunga bank konvensional.'
          ],
        },
      },
      {
        id: 'c1-l3-2', type: 'lesson', title: 'Asuransi & BPJS 101', duration: '12 menit',
        content: {
          heading: 'Transfer Risiko: Kenapa Kita Perlu Proteksi?',
          body: [
            'Dalam piramida keuangan yang sehat, setelah kamu memiliki arus kas yang positif dan dana darurat yang memadai, lapisan selanjutnya yang harus dipenuhi adalah Proteksi atau Asuransi. Asuransi pada dasarnya adalah mekanisme "Transfer Risiko". Kamu membayar premi dalam jumlah tertentu kepada perusahaan asuransi, agar mereka bersedia menanggung risiko finansial yang sangat besar ketika terjadi musibah sakit parah.',
            'Satu kesalahpahaman terbesar di masyarakat adalah menganggap asuransi sebagai alat untuk mencari keuntungan atau media investasi. Asuransi murni adalah biaya (expense). Tujuan kamu membeli asuransi bukanlah untuk balik modal, melainkan untuk memastikan bahwa jika kamu jatuh sakit parah, seluruh tabungan, dana darurat, dan aset investasimu tidak habis terkuras untuk membayar tagihan rumah sakit.',
            'BPJS Kesehatan: Perlindungan Dasar Wajib',
            'Sebagai Warga Negara Indonesia, memiliki BPJS Kesehatan aktif adalah sebuah keharusan mutlak. Tidak peduli seberapa besar gajimu, biaya penyakit kritis (seperti kanker, operasi jantung, atau rawat inap ICU berminggu-minggu) bisa membuat seseorang bangkrut seketika. BPJS Kesehatan memberikan perlindungan berlapis dan sering kali tidak memiliki batas limit biaya asalkan sesuai dengan prosedur medis.',
            'Asuransi Tambahan yang Perlu Dipertimbangkan:',
            '1. Asuransi Kesehatan Swasta: Digunakan jika kamu menginginkan kenyamanan lebih, seperti memilih rumah sakit, opsi rawat inap satu kamar, mendapatkan fasilitas yang mungkin tidak dijangkau BPJS, dan penanganan yang lebih cepat.',
            '2. Asuransi Jiwa: Ini sangat wajib jika kamu adalah pencari nafkah utama (breadwinner) yang memiliki tanggungan hidup (anak, istri, atau orang tua). Uang pertanggungan (UP) asuransi jiwa berfungsi sebagai pengganti penghasilan yang hilang jika hal terburuk terjadi padamu, sehingga keluargamu tetap dapat melanjutkan hidup secara layak.'
          ],
        },
      },
      {
        id: 'c1-l3-3', type: 'lesson', title: 'Menjaga Cashflow Tetap Positif', duration: '12 menit',
        content: {
          heading: 'Positive Cashflow: Income > Spending',
          body: [
            'Semua teori tentang budgeting, penempatan dana darurat, dan strategi investasi menjadi tidak relevan jika satu aturan paling fundamental dalam hierarki keuangan diabaikan: Kamu harus menghabiskan uang lebih sedikit daripada total uang yang kamu hasilkan. Inilah yang disebut dengan Positive Cashflow atau Arus Kas Positif.',
            'Sebuah kondisi keuangan dikatakan sehat bukan dilihat dari seberapa besar nominal gaji atau penghasilannya, melainkan dari seberapa konsisten seseorang mampu mempertahankan surplus antara pendapatan (income) dan pengeluaran (spending). Ada dua strategi utama untuk menjaga dan memperlebar jarak surplus tersebut:',
            '1. Memangkas Pengeluaran (Defensive Strategy)',
            'Ini adalah opsi pertama yang paling mudah dan paling bisa bisa kamu kendalikan saat ini. Seperti yang sudah dipelajari, pantau catatan arus kas kamu untuk menemukan kebocoran halus dan perbaiki kebiasaan konsumtif yang merugikan. Batasi hutang dan tahan keinginan untuk terus menaikkan gaya hidup seiring dengan naiknya gaji (Lifestyle Creep). Namun, kamu harus ingat bahwa strategi memangkas gaya hidup ini ada batas maksimalnya; kamu tidak bisa memangkas biaya hidup hingga Rp0.',
            '2. Meningkatkan Pendapatan (Offensive Strategy)',
            'Jika strategi bertahan sudah maksimal diterapkan namun surplus yang kamu dapatkan masih terlalu kecil, satu-satunya jalan keluar logis adalah meningkatkan kapasitas mesin pendapatanmu. Hal ini bisa dilakukan dengan cara meminta negosiasi promosi gaji, mencari pekerjaan baru yang menawarkan kompensasi lebih tinggi, membangun sumber pendapatan sampingan (side hustle), atau memonetisasi keahlian kamu.',
            'Surplus keuangan yang berhasil kamu amankan setiap bulannya inilah yang akan menjadi "amunisi" utamamu. Surplus ini yang akan mendanai toples dana daruratmu dengan cepat, menutup premi proteksimu, dan akhirnya akan menjadi modal utamamu untuk memasuki tahapan berinvestasi secara profesional.'
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
