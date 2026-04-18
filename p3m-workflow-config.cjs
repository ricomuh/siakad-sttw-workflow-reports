const accounts = {
  admin: {
    key: 'admin',
    email: 'admin@sttw.ac.id',
    password: 'password',
    label: 'Administrator P3M',
  },
  dosen_budi: {
    key: 'dosen_budi',
    email: 'budi.santoso@sttw.ac.id',
    password: 'password',
    label: 'Portal Dosen - Budi Santoso',
  },
  dosen_siti: {
    key: 'dosen_siti',
    email: 'siti.nurhaliza@sttw.ac.id',
    password: 'password',
    label: 'Portal Dosen - Siti Nurhaliza',
  },
  dosen_ahmad: {
    key: 'dosen_ahmad',
    email: 'ahmad.subagyo@sttw.ac.id',
    password: 'password',
    label: 'Portal Dosen - Ahmad Subagyo',
  },
  reviewer_budi: {
    key: 'reviewer_budi',
    email: 'budi.santoso@sttw.ac.id',
    password: 'password',
    label: 'Reviewer - Budi Santoso',
  },
};

const adminSettingsSidebar = ['P3M', 'Admin P3M', 'Setting & Master'];

const features = [
  {
    name: 'admin-dashboard',
    title: 'Dashboard Admin P3M',
    role: 'Administrator P3M',
    modul: 'P3M',
    summary: 'Ringkasan statistik proposal, monev, laporan, dan akses cepat modul P3M untuk pengelola.',
    account: 'admin',
    steps: [
      { file: '01_dashboard', title: 'Dashboard Admin P3M', open: { mode: 'account-home' } },
    ],
  },
  {
    name: 'admin-settings-aktivasi',
    title: 'Aktivasi Batch P3M',
    role: 'Administrator P3M',
    modul: 'P3M > Admin P3M',
    summary: 'Pengelolaan batch aktivasi proposal penelitian dan pengabdian beserta form pembuatannya.',
    account: 'admin',
    steps: [
      {
        file: '01_index',
        title: 'Daftar Aktivasi',
        open: {
          mode: 'click',
          text: /Aktivasi/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: adminSettingsSidebar },
        },
      },
      {
        file: '02_create',
        title: 'Form Tambah Aktivasi',
        open: {
          mode: 'click',
          text: /Tambah Aktivasi/i,
          from: {
            mode: 'click',
            text: /Aktivasi/i,
            allowNoSidebar: true,
            from: { mode: 'sidebar', path: adminSettingsSidebar },
          },
        },
      },
    ],
  },
  {
    name: 'admin-settings-master',
    title: 'Master Data & Setting P3M',
    role: 'Administrator P3M',
    modul: 'P3M > Admin P3M',
    summary: 'Hub setting P3M dan halaman master bidang fokus, rumpun ilmu, kriteria penilaian, bidang mitra, panduan, serta informasi.',
    account: 'admin',
    steps: [
      { file: '01_setting', title: 'Setting & Master', open: { mode: 'sidebar', path: adminSettingsSidebar } },
      {
        file: '02_bidang_fokus',
        title: 'Daftar Bidang Fokus',
        open: {
          mode: 'click',
          text: /Bidang Fokus/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: adminSettingsSidebar },
        },
      },
      {
        file: '03_bidang_fokus_create',
        title: 'Form Tambah Bidang Fokus',
        open: { mode: 'path', path: '/p3m/admin/bidang-fokus/create', allowNoSidebar: true },
      },
      {
        file: '04_rumpun_ilmu',
        title: 'Daftar Rumpun Ilmu',
        open: {
          mode: 'click',
          text: /Rumpun Ilmu/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: adminSettingsSidebar },
        },
      },
      {
        file: '05_rumpun_ilmu_create',
        title: 'Form Tambah Rumpun Ilmu',
        open: { mode: 'path', path: '/p3m/admin/rumpun-ilmu/create', allowNoSidebar: true },
      },
      {
        file: '06_kriteria_penilaian',
        title: 'Daftar Kriteria Penilaian',
        open: {
          mode: 'click',
          text: /Kriteria Penilaian/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: adminSettingsSidebar },
        },
      },
      {
        file: '07_kriteria_penilaian_create',
        title: 'Form Tambah Kriteria Penilaian',
        open: { mode: 'path', path: '/p3m/admin/kriteria-penilaian/create', allowNoSidebar: true },
      },
      {
        file: '08_bidang_mitra',
        title: 'Daftar Bidang Mitra',
        open: {
          mode: 'click',
          text: /Bidang Mitra/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: adminSettingsSidebar },
        },
      },
      {
        file: '09_bidang_mitra_create',
        title: 'Form Tambah Bidang Mitra',
        open: { mode: 'path', path: '/p3m/admin/bidang-mitra/create', allowNoSidebar: true },
      },
      {
        file: '10_panduan',
        title: 'Daftar Panduan',
        open: {
          mode: 'click',
          text: /Panduan/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: adminSettingsSidebar },
        },
      },
      {
        file: '11_panduan_create',
        title: 'Form Tambah Panduan',
        open: { mode: 'path', path: '/p3m/admin/panduan/create', allowNoSidebar: true },
      },
      {
        file: '12_informasi',
        title: 'Daftar Informasi',
        open: {
          mode: 'click',
          text: /Informasi/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: adminSettingsSidebar },
        },
      },
      {
        file: '13_informasi_create',
        title: 'Form Tambah Informasi',
        open: { mode: 'path', path: '/p3m/admin/informasi/create', allowNoSidebar: true },
      },
    ],
  },
  {
    name: 'admin-seleksi',
    title: 'Seleksi Proposal P3M',
    role: 'Administrator P3M',
    modul: 'P3M > Admin P3M',
    summary: 'Daftar proposal penelitian dan pengabdian yang masuk proses seleksi beserta halaman review detailnya.',
    account: 'admin',
    steps: [
      { file: '01_penelitian_index', title: 'Seleksi Penelitian', open: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Seleksi Penelitian'] } },
      {
        file: '02_penelitian_detail',
        title: 'Detail Seleksi Penelitian',
        open: {
          mode: 'click',
          text: /Lihat/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Seleksi Penelitian'] },
        },
      },
      { file: '03_pengabdian_index', title: 'Seleksi Pengabdian', open: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Seleksi Pengabdian'] } },
      {
        file: '04_pengabdian_detail',
        title: 'Detail Seleksi Pengabdian',
        open: {
          mode: 'click',
          text: /Lihat/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Seleksi Pengabdian'] },
        },
      },
    ],
  },
  {
    name: 'admin-spk',
    title: 'Kelola SPK P3M',
    role: 'Administrator P3M',
    modul: 'P3M > Admin P3M',
    summary: 'Daftar proposal yang sudah lolos untuk proses SPK dan halaman pengelolaan dokumen per proposal.',
    account: 'admin',
    steps: [
      { file: '01_penelitian_index', title: 'SPK Penelitian', open: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'SPK Penelitian'] } },
      {
        file: '02_penelitian_detail',
        title: 'Detail SPK Penelitian',
        open: {
          mode: 'click',
          text: /Kelola/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'SPK Penelitian'] },
        },
      },
      { file: '03_pengabdian_index', title: 'SPK Pengabdian', open: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'SPK Pengabdian'] } },
    ],
  },
  {
    name: 'admin-monev',
    title: 'Validasi Monev P3M',
    role: 'Administrator P3M',
    modul: 'P3M > Admin P3M',
    summary: 'Validasi monev pelaksanaan dari sidebar serta halaman monev akhir yang hanya bisa diakses lewat URL detail.',
    account: 'admin',
    steps: [
      { file: '01_penelitian_pelaksanaan_index', title: 'Monev Penelitian', open: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Monev Penelitian'] } },
      {
        file: '02_penelitian_pelaksanaan_detail',
        title: 'Detail Monev Penelitian',
        open: {
          mode: 'click',
          text: /Review/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Monev Penelitian'] },
        },
      },
      { file: '03_pengabdian_pelaksanaan_index', title: 'Monev Pengabdian', open: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Monev Pengabdian'] } },
      {
        file: '04_pengabdian_akhir_index',
        title: 'Monev Akhir Pengabdian',
        open: { mode: 'path', path: '/p3m/admin/validasi-monev/pengabdian/akhir' },
      },
      {
        file: '05_pengabdian_akhir_detail',
        title: 'Detail Monev Akhir Pengabdian',
        open: { mode: 'path', path: '/p3m/admin/validasi-monev/pengabdian/akhir/5' },
      },
    ],
  },
  {
    name: 'admin-laporan',
    title: 'Validasi Laporan Akhir P3M',
    role: 'Administrator P3M',
    modul: 'P3M > Admin P3M',
    summary: 'Daftar laporan akhir proposal penelitian dan pengabdian, termasuk halaman review laporan yang masuk.',
    account: 'admin',
    steps: [
      { file: '01_penelitian_index', title: 'Laporan Penelitian', open: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Laporan Penelitian'] } },
      { file: '02_pengabdian_index', title: 'Laporan Pengabdian', open: { mode: 'sidebar', path: ['P3M', 'Admin P3M', 'Laporan Pengabdian'] } },
    ],
  },
  {
    name: 'admin-arsip',
    title: 'Arsip Pengelola P3M',
    role: 'Administrator P3M',
    modul: 'P3M > Arsip Pengelola',
    summary: 'Arsip penelitian, pengabdian, dosen, katalog, publikasi, dan HKI yang dikelola dari sisi admin.',
    account: 'admin',
    steps: [
      { file: '01_arsip_penelitian', title: 'Arsip Penelitian', open: { mode: 'sidebar', path: ['P3M', 'Arsip Pengelola', 'Arsip Penelitian'] } },
      {
        file: '02_arsip_penelitian_create',
        title: 'Form Tambah Arsip Penelitian',
        open: {
          mode: 'click',
          text: /Tambah Arsip/i,
          from: { mode: 'sidebar', path: ['P3M', 'Arsip Pengelola', 'Arsip Penelitian'] },
        },
      },
      { file: '03_arsip_pengabdian', title: 'Arsip Pengabdian', open: { mode: 'sidebar', path: ['P3M', 'Arsip Pengelola', 'Arsip Pengabdian'] } },
      {
        file: '04_arsip_pengabdian_create',
        title: 'Form Tambah Arsip Pengabdian',
        open: {
          mode: 'click',
          text: /Tambah Arsip/i,
          from: { mode: 'sidebar', path: ['P3M', 'Arsip Pengelola', 'Arsip Pengabdian'] },
        },
      },
      { file: '05_arsip_dosen', title: 'Arsip Dosen', open: { mode: 'sidebar', path: ['P3M', 'Arsip Pengelola', 'Arsip Dosen'] } },
      { file: '06_arsip_katalog', title: 'Arsip Katalog', open: { mode: 'sidebar', path: ['P3M', 'Arsip Pengelola', 'Arsip Katalog'] } },
      { file: '07_arsip_publikasi', title: 'Arsip Publikasi', open: { mode: 'sidebar', path: ['P3M', 'Arsip Pengelola', 'Arsip Publikasi'] } },
      { file: '08_arsip_hki', title: 'Arsip HKI', open: { mode: 'sidebar', path: ['P3M', 'Arsip Pengelola', 'Arsip HKI'] } },
    ],
  },
  {
    name: 'admin-luaran',
    title: 'Tracking Luaran P3M',
    role: 'Administrator P3M',
    modul: 'P3M',
    summary: 'Monitoring proposal yang belum memenuhi luaran dan halaman detail target luaran per proposal.',
    account: 'admin',
    steps: [
      { file: '01_index', title: 'Tracking Luaran', open: { mode: 'sidebar', path: ['P3M', 'Tracking Luaran'] } },
      {
        file: '02_detail',
        title: 'Detail Tracking Luaran',
        open: {
          mode: 'click',
          text: /Detail/i,
          allowNoSidebar: true,
          from: { mode: 'sidebar', path: ['P3M', 'Tracking Luaran'] },
        },
      },
    ],
  },
  {
    name: 'admin-semua-data',
    title: 'Semua Data Proposal P3M',
    role: 'Administrator P3M',
    modul: 'P3M > Semua Data',
    summary: 'Rekap seluruh proposal penelitian dan pengabdian untuk keperluan monitoring serta ekspor.',
    account: 'admin',
    steps: [
      { file: '01_penelitian', title: 'Semua Data Penelitian', open: { mode: 'sidebar', path: ['P3M', 'Semua Data', 'Penelitian'] } },
      { file: '02_pengabdian', title: 'Semua Data Pengabdian', open: { mode: 'sidebar', path: ['P3M', 'Semua Data', 'Pengabdian'] } },
    ],
  },
  {
    name: 'dosen-dashboard',
    title: 'Dashboard Portal Dosen P3M',
    role: 'Dosen',
    modul: 'P3M',
    summary: 'Ringkasan aktivasi terbuka, proposal aktif, dan informasi terbaru yang tampil di dashboard dosen.',
    account: 'dosen_budi',
    steps: [
      { file: '01_dashboard', title: 'Dashboard P3M Dosen', open: { mode: 'account-home' } },
    ],
  },
  {
    name: 'dosen-proposal',
    title: 'Proposal Dosen P3M',
    role: 'Dosen',
    modul: 'P3M > Portal Dosen',
    summary: 'Riwayat proposal penelitian dan pengabdian, bug route pada menu sidebar proposal, serta halaman aktual proposal draft, revisi, dan diterima.',
    account: 'dosen_budi',
    steps: [
      { file: '01_penelitian_sidebar_menu', title: 'Menu Proposal Saya Penelitian', open: { mode: 'sidebar', path: ['P3M', 'Penelitian', 'Proposal Saya'] }, account: 'dosen_budi' },
      {
        file: '02_penelitian_index',
        title: 'Halaman Proposal Saya Penelitian',
        open: { mode: 'path', path: '/p3m/dosen/penelitian', allowNoSidebar: true },
        account: 'dosen_budi',
      },
      {
        file: '03_penelitian_sidebar_create',
        title: 'Menu Ajukan Proposal Penelitian',
        open: { mode: 'sidebar', path: ['P3M', 'Penelitian', 'Ajukan Proposal'] },
        account: 'dosen_budi',
      },
      {
        file: '04_penelitian_create',
        title: 'Form Ajukan Proposal Penelitian',
        open: { mode: 'path', path: '/p3m/dosen/penelitian/create', allowNoSidebar: true },
        account: 'dosen_budi',
      },
      {
        file: '05_penelitian_draft_detail',
        title: 'Detail Proposal Penelitian Draft',
        open: { mode: 'path', path: '/p3m/dosen/penelitian/1', allowNoSidebar: true },
        account: 'dosen_budi',
      },
      {
        file: '06_penelitian_draft_edit',
        title: 'Form Edit Proposal Penelitian Draft',
        open: { mode: 'path', path: '/p3m/dosen/penelitian/1/edit', allowNoSidebar: true },
        account: 'dosen_budi',
      },
      {
        file: '07_penelitian_diterima_detail',
        title: 'Detail Proposal Penelitian Diterima',
        open: { mode: 'path', path: '/p3m/dosen/penelitian/3', allowNoSidebar: true },
        account: 'dosen_budi',
      },
      { file: '08_pengabdian_sidebar_menu', title: 'Menu Proposal Saya Pengabdian', open: { mode: 'sidebar', path: ['P3M', 'Pengabdian', 'Proposal Saya'] }, account: 'dosen_siti' },
      {
        file: '09_pengabdian_index',
        title: 'Halaman Proposal Saya Pengabdian',
        open: { mode: 'path', path: '/p3m/dosen/pengabdian', allowNoSidebar: true },
        account: 'dosen_siti',
      },
      {
        file: '10_pengabdian_sidebar_create',
        title: 'Menu Ajukan Proposal Pengabdian',
        open: { mode: 'sidebar', path: ['P3M', 'Pengabdian', 'Ajukan Proposal'] },
        account: 'dosen_siti',
      },
      {
        file: '11_pengabdian_create',
        title: 'Form Ajukan Proposal Pengabdian',
        open: { mode: 'path', path: '/p3m/dosen/pengabdian/create', allowNoSidebar: true },
        account: 'dosen_siti',
      },
      {
        file: '12_pengabdian_revisi_detail',
        title: 'Detail Proposal Pengabdian Direvisi',
        open: { mode: 'path', path: '/p3m/dosen/pengabdian/6', allowNoSidebar: true },
        account: 'dosen_siti',
      },
    ],
  },
  {
    name: 'dosen-monev-laporan',
    title: 'Monev & Laporan Dosen P3M',
    role: 'Dosen',
    modul: 'P3M > Portal Dosen',
    summary: 'Halaman monev dan laporan akhir dosen yang saat ini hanya dapat diakses lewat URL khusus proposal.',
    account: 'dosen_budi',
    steps: [
      {
        file: '01_monev_penelitian_pelaksanaan',
        title: 'Monev Pelaksanaan Penelitian',
        open: { mode: 'path', path: '/p3m/dosen/penelitian/3/monev/pelaksanaan' },
        account: 'dosen_budi',
      },
      {
        file: '02_monev_pengabdian_akhir',
        title: 'Monev Akhir Pengabdian',
        open: { mode: 'path', path: '/p3m/dosen/pengabdian/5/monev/akhir' },
        account: 'dosen_ahmad',
      },
      {
        file: '03_laporan_akhir_pengabdian',
        title: 'Laporan Akhir Pengabdian',
        open: { mode: 'path', path: '/p3m/dosen/pengabdian/5/laporan-akhir' },
        account: 'dosen_ahmad',
      },
    ],
  },
  {
    name: 'dosen-arsip',
    title: 'Arsip Dosen P3M',
    role: 'Dosen',
    modul: 'P3M > Arsip Saya',
    summary: 'Pengelolaan katalog, publikasi, dan HKI milik dosen dari portal P3M.',
    account: 'dosen_budi',
    steps: [
      { file: '01_katalog', title: 'Arsip Katalog', open: { mode: 'sidebar', path: ['P3M', 'Arsip Saya', 'Katalog'] } },
      {
        file: '02_katalog_create',
        title: 'Form Tambah Katalog',
        open: {
          mode: 'click',
          text: /\+\s*Tambah Katalog/i,
          from: { mode: 'sidebar', path: ['P3M', 'Arsip Saya', 'Katalog'] },
        },
      },
      { file: '03_publikasi', title: 'Arsip Publikasi', open: { mode: 'sidebar', path: ['P3M', 'Arsip Saya', 'Publikasi'] } },
      {
        file: '04_publikasi_create',
        title: 'Form Tambah Publikasi',
        open: {
          mode: 'click',
          text: /\+\s*Tambah Publikasi/i,
          from: { mode: 'sidebar', path: ['P3M', 'Arsip Saya', 'Publikasi'] },
        },
      },
      { file: '05_hki', title: 'Arsip HKI', open: { mode: 'sidebar', path: ['P3M', 'Arsip Saya', 'HKI'] } },
      {
        file: '06_hki_create',
        title: 'Form Tambah HKI',
        open: {
          mode: 'click',
          text: /\+\s*Tambah HKI/i,
          from: { mode: 'sidebar', path: ['P3M', 'Arsip Saya', 'HKI'] },
        },
      },
    ],
  },
  {
    name: 'dosen-panduan-repositori',
    title: 'Panduan & Repositori Dosen P3M',
    role: 'Dosen',
    modul: 'P3M > Portal Dosen',
    summary: 'Halaman panduan dosen, daftar repositori, dan form penambahan data repositori.',
    account: 'dosen_budi',
    steps: [
      { file: '01_panduan', title: 'Panduan P3M', open: { mode: 'sidebar', path: ['P3M', 'Panduan'] } },
      { file: '02_repositori', title: 'Repositori P3M', open: { mode: 'sidebar', path: ['P3M', 'Repositori'] } },
    ],
  },
  {
    name: 'reviewer-proposal-ditugaskan',
    title: 'Proposal Ditugaskan Reviewer P3M',
    role: 'Reviewer',
    modul: 'P3M > Review Proposal',
    summary: 'Menu reviewer untuk proposal yang ditugaskan. Saat ini sidebar menampilkan item, tetapi route tujuan belum tersedia.',
    account: 'reviewer_budi',
    steps: [
      {
        file: '01_index',
        title: 'Proposal Ditugaskan',
        open: { mode: 'sidebar', path: ['P3M', 'Review Proposal', 'Proposal Ditugaskan'] },
      },
    ],
  },
];

module.exports = {
  accounts,
  features,
};
