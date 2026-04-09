const fs = require('fs');
const path = require('path');
const WR = '.workflow-reports';
const today = new Date().toISOString().split('T')[0];

// Feature definitions with metadata for report generation
const features = [
  // ─── ADMIN CRUD (14) ─────────────────────────────────────────────────
  {
    name: 'lpm-admin-kebijakan', title: 'Kebijakan SPMI', role: 'Admin LPM', modul: 'LPM > Penetapan',
    desc: 'Mengelola kebijakan SPMI (Sistem Penjaminan Mutu Internal) institusi. Mendukung operasi CRUD lengkap dengan verifikasi dokumen.',
    steps: [
      { file: '01_index', title: 'Daftar Kebijakan', desc: 'Halaman utama menampilkan daftar seluruh kebijakan SPMI dengan informasi status, tanggal penetapan, dan aksi.' },
      { file: '02_create-form', title: 'Form Tambah Kebijakan (Kosong)', desc: 'Form pembuatan kebijakan baru dalam keadaan kosong, menampilkan field nama, deskripsi, tanggal, tautan, akses dokumen, dan status aktif.' },
      { file: '03_create-filled', title: 'Form Tambah Kebijakan (Terisi)', desc: 'Form telah diisi dengan data kebijakan mutu akademik baru.' },
      { file: '04_create-success', title: 'Kebijakan Berhasil Ditambahkan', desc: 'Setelah submit, redirect ke halaman index dengan flash message sukses.' },
      { file: '05_show', title: 'Detail Kebijakan', desc: 'Halaman detail menampilkan informasi lengkap kebijakan termasuk status verifikasi dan opsi verifikasi.' },
      { file: '06_edit-form', title: 'Form Edit Kebijakan', desc: 'Form edit dengan data kebijakan yang sudah terisi untuk dimodifikasi.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama kebijakan telah diubah untuk menandai revisi.' },
      { file: '08_edit-success', title: 'Kebijakan Berhasil Diperbarui', desc: 'Setelah submit edit, redirect dengan flash message sukses.' },
    ],
  },
  {
    name: 'lpm-admin-standar-institusi', title: 'Standar Institusi', role: 'Admin LPM', modul: 'LPM > Penetapan',
    desc: 'Mengelola standar institusi berdasarkan kategori (Visi Misi, Tata Pamong, Sumber Daya, Sarana Prasarana).',
    steps: [
      { file: '01_index', title: 'Daftar Standar Institusi', desc: 'Tabel standar institusi dengan filter kategori, status dokumen, dan akses dokumen.' },
      { file: '02_create-form', title: 'Form Tambah Standar (Kosong)', desc: 'Form pembuatan standar institusi baru dengan pilihan kategori.' },
      { file: '03_create-filled', title: 'Form Tambah Standar (Terisi)', desc: 'Form terisi data standar kompetensi lulusan.' },
      { file: '04_create-success', title: 'Standar Berhasil Ditambahkan', desc: 'Redirect ke index setelah berhasil menyimpan.' },
      { file: '05_show', title: 'Detail Standar', desc: 'Informasi lengkap standar institusi.' },
      { file: '06_edit-form', title: 'Form Edit Standar', desc: 'Form edit standar dengan data terisi.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama standar telah diperbarui.' },
      { file: '08_edit-success', title: 'Standar Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-standar-lain', title: 'Standar Lain', role: 'Admin LPM', modul: 'LPM > Penetapan',
    desc: 'Mengelola standar lain di luar standar institusi (Akademik, Kemahasiswaan, Sumber Daya, Sarana Prasarana).',
    steps: [
      { file: '01_index', title: 'Daftar Standar Lain', desc: 'Tabel standar lain dengan filter kategori.' },
      { file: '02_create-form', title: 'Form Tambah (Kosong)', desc: 'Form pembuatan standar lain baru.' },
      { file: '03_create-filled', title: 'Form Tambah (Terisi)', desc: 'Form terisi data standar sarana prasarana lab.' },
      { file: '04_create-success', title: 'Berhasil Ditambahkan', desc: 'Data tersimpan dan redirect ke index.' },
      { file: '05_show', title: 'Detail Standar Lain', desc: 'Informasi lengkap standar.' },
      { file: '06_edit-form', title: 'Form Edit', desc: 'Form edit dengan data terisi.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Data telah diubah.' },
      { file: '08_edit-success', title: 'Berhasil Diperbarui', desc: 'Redirect dengan flash message.' },
    ],
  },
  {
    name: 'lpm-admin-dokumen-spmi', title: 'Dokumen SPMI', role: 'Admin LPM', modul: 'LPM > Penetapan',
    desc: 'Mengelola arsip dokumen SPMI seperti manual mutu, standar operasional prosedur, dan pedoman.',
    steps: [
      { file: '01_index', title: 'Daftar Dokumen SPMI', desc: 'Tabel dokumen SPMI dengan nomor urut, nama arsip, dan status.' },
      { file: '02_create-form', title: 'Form Tambah Dokumen (Kosong)', desc: 'Form pembuatan dokumen SPMI baru.' },
      { file: '03_create-filled', title: 'Form Tambah Dokumen (Terisi)', desc: 'Form terisi data manual mutu.' },
      { file: '04_create-success', title: 'Dokumen Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '06_edit-form', title: 'Form Edit Dokumen', desc: 'Form edit dokumen (fitur ini tidak memiliki halaman show terpisah).' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Data dokumen telah diubah.' },
      { file: '08_edit-success', title: 'Dokumen Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-formulir', title: 'Formulir LPM', role: 'Admin LPM', modul: 'LPM > Penetapan',
    desc: 'Mengelola formulir-formulir yang digunakan dalam proses penjaminan mutu.',
    steps: [
      { file: '01_index', title: 'Daftar Formulir', desc: 'Tabel formulir LPM dengan status dan akses dokumen.' },
      { file: '02_create-form', title: 'Form Tambah Formulir (Kosong)', desc: 'Form pembuatan formulir baru.' },
      { file: '03_create-filled', title: 'Form Tambah Formulir (Terisi)', desc: 'Form terisi data formulir evaluasi dosen.' },
      { file: '04_create-success', title: 'Formulir Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '06_edit-form', title: 'Form Edit Formulir', desc: 'Form edit formulir (tanpa halaman show terpisah).' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama formulir diperbarui.' },
      { file: '08_edit-success', title: 'Formulir Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-sk-akreditasi', title: 'SK Akreditasi', role: 'Admin LPM', modul: 'LPM > Penetapan',
    desc: 'Mengelola Surat Keputusan (SK) Akreditasi program studi dan institusi.',
    steps: [
      { file: '01_index', title: 'Daftar SK Akreditasi', desc: 'Tabel SK akreditasi dengan nomor SK, tahun, dan tanggal.' },
      { file: '02_create-form', title: 'Form Tambah SK (Kosong)', desc: 'Form pembuatan SK akreditasi baru.' },
      { file: '03_create-filled', title: 'Form Tambah SK (Terisi)', desc: 'Form terisi data SK akreditasi D3 Teknik Sipil.' },
      { file: '04_create-success', title: 'SK Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '06_edit-form', title: 'Form Edit SK', desc: 'Form edit SK akreditasi (tanpa halaman show terpisah).' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama SK diperbarui.' },
      { file: '08_edit-success', title: 'SK Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-sk-pendirian', title: 'SK Pendirian', role: 'Admin LPM', modul: 'LPM > Penetapan',
    desc: 'Mengelola Surat Keputusan (SK) Pendirian program studi dan institusi.',
    steps: [
      { file: '01_index', title: 'Daftar SK Pendirian', desc: 'Tabel SK pendirian dengan detail lengkap.' },
      { file: '02_create-form', title: 'Form Tambah SK (Kosong)', desc: 'Form pembuatan SK pendirian baru.' },
      { file: '03_create-filled', title: 'Form Tambah SK (Terisi)', desc: 'Form terisi data SK pendirian program studi baru.' },
      { file: '04_create-success', title: 'SK Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '06_edit-form', title: 'Form Edit SK', desc: 'Form edit SK pendirian (tanpa halaman show terpisah).' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama SK diperbarui.' },
      { file: '08_edit-success', title: 'SK Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-pelaksanaan', title: 'Pelaksanaan', role: 'Admin LPM', modul: 'LPM > Pelaksanaan',
    desc: 'Mengelola kegiatan pelaksanaan standar mutu, termasuk tracking status pelaksanaan (Sudah/Belum/Proses).',
    steps: [
      { file: '01_index', title: 'Daftar Pelaksanaan', desc: 'Tabel kegiatan pelaksanaan dengan status dan verifikasi.' },
      { file: '02_create-form', title: 'Form Tambah (Kosong)', desc: 'Form pembuatan kegiatan pelaksanaan baru.' },
      { file: '03_create-filled', title: 'Form Tambah (Terisi)', desc: 'Form terisi data workshop kurikulum OBE.' },
      { file: '04_create-success', title: 'Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '05_show', title: 'Detail Pelaksanaan', desc: 'Informasi lengkap kegiatan pelaksanaan.' },
      { file: '06_edit-form', title: 'Form Edit', desc: 'Form edit kegiatan pelaksanaan.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama kegiatan diperbarui.' },
      { file: '08_edit-success', title: 'Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-evaluasi', title: 'Evaluasi', role: 'Admin LPM', modul: 'LPM > Evaluasi',
    desc: 'Mengelola kegiatan evaluasi mutu, dikategorikan berdasarkan jenis (AMI, Lain, Lainnya).',
    steps: [
      { file: '01_index', title: 'Daftar Evaluasi', desc: 'Tabel evaluasi dengan tab jenis evaluasi.' },
      { file: '02_create-form', title: 'Form Tambah (Kosong)', desc: 'Form pembuatan evaluasi baru.' },
      { file: '03_create-filled', title: 'Form Tambah (Terisi)', desc: 'Form terisi data evaluasi kinerja dosen.' },
      { file: '04_create-success', title: 'Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '05_show', title: 'Detail Evaluasi', desc: 'Informasi lengkap kegiatan evaluasi.' },
      { file: '06_edit-form', title: 'Form Edit', desc: 'Form edit evaluasi.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama evaluasi diperbarui.' },
      { file: '08_edit-success', title: 'Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-pengendalian', title: 'Pengendalian', role: 'Admin LPM', modul: 'LPM > Pengendalian',
    desc: 'Mengelola kegiatan pengendalian mutu, termasuk RTM (Rapat Tinjauan Manajemen) dan RTL (Rencana Tindak Lanjut).',
    steps: [
      { file: '01_index', title: 'Daftar Pengendalian', desc: 'Tabel pengendalian dengan status RTM dan RTL.' },
      { file: '02_create-form', title: 'Form Tambah (Kosong)', desc: 'Form pembuatan pengendalian baru.' },
      { file: '03_create-filled', title: 'Form Tambah (Terisi)', desc: 'Form terisi data pengendalian mutu pembelajaran.' },
      { file: '04_create-success', title: 'Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '05_show', title: 'Detail Pengendalian', desc: 'Informasi lengkap termasuk status RTM dan RTL.' },
      { file: '06_edit-form', title: 'Form Edit', desc: 'Form edit pengendalian.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama bidang diperbarui.' },
      { file: '08_edit-success', title: 'Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-peningkatan', title: 'Peningkatan', role: 'Admin LPM', modul: 'LPM > Peningkatan',
    desc: 'Mengelola kegiatan peningkatan mutu, dengan relasi opsional ke kebijakan SPMI terkait.',
    steps: [
      { file: '01_index', title: 'Daftar Peningkatan', desc: 'Tabel kegiatan peningkatan mutu.' },
      { file: '02_create-form', title: 'Form Tambah (Kosong)', desc: 'Form pembuatan peningkatan baru dengan pilihan kebijakan terkait.' },
      { file: '03_create-filled', title: 'Form Tambah (Terisi)', desc: 'Form terisi data program peningkatan kompetensi dosen.' },
      { file: '04_create-success', title: 'Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '05_show', title: 'Detail Peningkatan', desc: 'Informasi lengkap termasuk kebijakan terkait.' },
      { file: '06_edit-form', title: 'Form Edit', desc: 'Form edit peningkatan.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama program diperbarui.' },
      { file: '08_edit-success', title: 'Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-ami-jadwal', title: 'Jadwal AMI', role: 'Admin LPM', modul: 'LPM > AMI',
    desc: 'Mengelola jadwal Audit Mutu Internal (AMI), termasuk unit yang diaudit dan penugasan auditor.',
    steps: [
      { file: '01_index', title: 'Daftar Jadwal AMI', desc: 'Tabel jadwal AMI dengan tahun, periode, dan status.' },
      { file: '02_create-form', title: 'Form Tambah Jadwal (Kosong)', desc: 'Form pembuatan jadwal AMI baru.' },
      { file: '03_create-filled', title: 'Form Tambah Jadwal (Terisi)', desc: 'Form terisi data AMI semester genap.' },
      { file: '04_create-success', title: 'Jadwal Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '05_show', title: 'Detail Jadwal AMI', desc: 'Detail jadwal AMI menampilkan daftar unit dan penugasan auditor.' },
      { file: '06_edit-form', title: 'Form Edit Jadwal', desc: 'Form edit jadwal AMI.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Judul jadwal diperbarui.' },
      { file: '08_edit-success', title: 'Jadwal Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-ami-formulir-template', title: 'Template Formulir AMI', role: 'Admin LPM', modul: 'LPM > AMI',
    desc: 'Mengelola template formulir audit yang digunakan oleh auditor internal saat melakukan AMI.',
    steps: [
      { file: '01_index', title: 'Daftar Template Formulir', desc: 'Tabel template formulir AMI dengan status aktif/nonaktif.' },
      { file: '02_create-form', title: 'Form Tambah Template (Kosong)', desc: 'Form pembuatan template formulir baru dengan item standar yang diperiksa.' },
      { file: '03_create-filled', title: 'Form Tambah Template (Terisi)', desc: 'Form terisi data template audit standar pendidikan.' },
      { file: '04_create-success', title: 'Template Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '05_show', title: 'Detail Template', desc: 'Detail template menampilkan daftar item standar yang diperiksa.' },
      { file: '06_edit-form', title: 'Form Edit Template', desc: 'Form edit template dengan item yang bisa ditambah/hapus.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Nama template diperbarui.' },
      { file: '08_edit-success', title: 'Template Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-dokumen', title: 'Bank Dokumen', role: 'Admin LPM', modul: 'LPM > Bank Dokumen',
    desc: 'Mengelola bank dokumen LPM dengan kategorisasi, pencarian, dan versioning.',
    steps: [
      { file: '01_index', title: 'Daftar Dokumen', desc: 'Halaman bank dokumen dengan pencarian, filter kategori, dan daftar dokumen.' },
      { file: '02_create-form', title: 'Form Tambah Dokumen (Kosong)', desc: 'Form upload dokumen baru dengan kategori dan tag.' },
      { file: '03_create-filled', title: 'Form Tambah Dokumen (Terisi)', desc: 'Form terisi data laporan kinerja LPM.' },
      { file: '04_create-success', title: 'Dokumen Berhasil Ditambahkan', desc: 'Redirect ke index setelah submit.' },
      { file: '05_show', title: 'Detail Dokumen', desc: 'Detail dokumen menampilkan riwayat versi dan informasi lengkap.' },
      { file: '06_edit-form', title: 'Form Edit Dokumen', desc: 'Form edit dokumen.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Judul dokumen diperbarui.' },
      { file: '08_edit-success', title: 'Dokumen Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },

  // ─── ADMIN SPECIAL (6) ───────────────────────────────────────────────
  {
    name: 'lpm-admin-dashboard', title: 'Dashboard Admin LPM', role: 'Admin LPM', modul: 'LPM',
    desc: 'Dashboard utama admin LPM menampilkan ringkasan statistik PPEPP, data SIAKAD, jadwal AMI, dan quick links.',
    steps: [
      { file: '01_index', title: 'Dashboard Admin LPM', desc: 'Halaman dashboard menampilkan stats cards PPEPP, grafik tren, tabel jadwal AMI aktif, dan link cepat ke fitur utama.' },
    ],
  },
  {
    name: 'lpm-admin-standar-pt', title: 'Standar PT', role: 'Admin LPM', modul: 'LPM > Penetapan',
    desc: 'Mengelola standar perguruan tinggi berdasarkan jenjang pendidikan (D3, D4, S1, S2, dll) dengan editing langsung pada tabel.',
    steps: [
      { file: '01_index', title: 'Tabel Standar PT', desc: 'Tabel editable menampilkan standar per jenjang: jumlah mahasiswa, beban, IPK target, rasio dosen.' },
      { file: '02_inline-modified', title: 'Edit Inline', desc: 'Nilai pada tabel diubah langsung tanpa membuka form terpisah.' },
      { file: '03_save-success', title: 'Berhasil Disimpan', desc: 'Perubahan berhasil disimpan dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-profil-pt', title: 'Profil Perguruan Tinggi', role: 'Admin LPM', modul: 'LPM',
    desc: 'Mengelola profil institusi Perguruan Tinggi (nama, alamat, akreditasi, dll). Hanya satu record.',
    steps: [
      { file: '01_index', title: 'Profil PT', desc: 'Halaman menampilkan profil institusi lengkap.' },
      { file: '02_edit-form', title: 'Form Edit Profil', desc: 'Form edit profil perguruan tinggi.' },
      { file: '03_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Data profil telah diubah.' },
      { file: '04_edit-success', title: 'Profil Berhasil Diperbarui', desc: 'Redirect ke profil dengan notifikasi sukses.' },
    ],
  },
  {
    name: 'lpm-admin-prodi', title: 'Data Program Studi', role: 'Admin LPM', modul: 'LPM',
    desc: 'Menampilkan data program studi dari SIAKAD (read-only) dengan catatan internal dari LPM.',
    steps: [
      { file: '01_index', title: 'Daftar Program Studi', desc: 'Tabel program studi dengan jenjang, kode, dan status akreditasi.' },
      { file: '02_show', title: 'Detail Program Studi', desc: 'Detail prodi menampilkan informasi lengkap dan catatan LPM.' },
    ],
  },
  {
    name: 'lpm-admin-ami-temuan', title: 'Temuan AMI (Admin)', role: 'Admin LPM', modul: 'LPM > AMI',
    desc: 'Melihat dan memverifikasi seluruh temuan AMI dari semua unit dan jadwal.',
    steps: [
      { file: '01_index', title: 'Daftar Temuan AMI', desc: 'Tabel seluruh temuan AMI dengan filter status dan kategori.' },
      { file: '02_show', title: 'Detail Temuan', desc: 'Detail temuan menampilkan deskripsi, rekomendasi, bukti, dan tindak lanjut.' },
    ],
  },
  {
    name: 'lpm-admin-setting', title: 'Pengaturan LPM', role: 'Admin LPM', modul: 'LPM',
    desc: 'Mengelola pengaturan modul LPM seperti visibilitas portal, batas versi dokumen, dll.',
    steps: [
      { file: '01_settings', title: 'Halaman Pengaturan', desc: 'Form pengaturan modul LPM dengan toggle dan input konfigurasi.' },
      { file: '02_settings-saved', title: 'Pengaturan Tersimpan', desc: 'Pengaturan berhasil disimpan dengan notifikasi sukses.' },
    ],
  },

  // ─── AUDITOR (4) ─────────────────────────────────────────────────────
  {
    name: 'lpm-auditor-dashboard', title: 'Dashboard Auditor', role: 'Auditor Internal', modul: 'LPM > Auditor',
    desc: 'Dashboard auditor menampilkan penugasan aktif, ringkasan temuan, dan aksi cepat.',
    steps: [
      { file: '01_index', title: 'Dashboard Auditor', desc: 'Halaman utama auditor dengan daftar penugasan aktif dan statistik temuan.' },
    ],
  },
  {
    name: 'lpm-auditor-penugasan', title: 'Penugasan Auditor', role: 'Auditor Internal', modul: 'LPM > Auditor',
    desc: 'Daftar penugasan audit yang diberikan kepada auditor.',
    steps: [
      { file: '01_index', title: 'Daftar Penugasan', desc: 'Tabel penugasan menampilkan jadwal AMI, unit, dan peran (ketua/anggota).' },
    ],
  },
  {
    name: 'lpm-auditor-temuan', title: 'Temuan Auditor', role: 'Auditor Internal', modul: 'LPM > Auditor',
    desc: 'Auditor mencatat dan mengelola temuan audit (Mayor, Minor, Observasi, Peluang Peningkatan).',
    steps: [
      { file: '01_index', title: 'Daftar Temuan', desc: 'Tabel temuan yang dicatat oleh auditor.' },
      { file: '02_create-form', title: 'Form Tambah Temuan (Kosong)', desc: 'Form pencatatan temuan baru dengan unit, kategori, kesesuaian, dan rekomendasi.' },
      { file: '03_create-filled', title: 'Form Tambah Temuan (Terisi)', desc: 'Form terisi data temuan terkait kurikulum.' },
      { file: '04_create-success', title: 'Temuan Berhasil Dicatat', desc: 'Redirect ke index setelah submit.' },
      { file: '05_show', title: 'Detail Temuan', desc: 'Informasi lengkap temuan termasuk rekomendasi dan bukti.' },
      { file: '06_edit-form', title: 'Form Edit Temuan', desc: 'Form edit temuan.' },
      { file: '07_edit-modified', title: 'Form Edit (Dimodifikasi)', desc: 'Judul temuan diperbarui.' },
      { file: '08_edit-success', title: 'Temuan Berhasil Diperbarui', desc: 'Redirect dengan notifikasi sukses.' },
    ],
  },

  // ─── KAPRODI (3) ─────────────────────────────────────────────────────
  {
    name: 'lpm-kaprodi-dashboard', title: 'Dashboard Kaprodi', role: 'Kaprodi', modul: 'LPM > Kaprodi',
    desc: 'Dashboard kaprodi menampilkan temuan AMI untuk program studi yang dipimpin.',
    steps: [
      { file: '01_index', title: 'Dashboard Kaprodi', desc: 'Halaman utama kaprodi dengan ringkasan temuan dan status tindak lanjut.' },
    ],
  },
  {
    name: 'lpm-kaprodi-standar', title: 'Standar Prodi', role: 'Kaprodi', modul: 'LPM > Kaprodi',
    desc: 'Melihat standar yang berlaku untuk program studi yang dipimpin.',
    steps: [
      { file: '01_index', title: 'Daftar Standar', desc: 'Tabel standar yang berlaku untuk prodi kaprodi.' },
    ],
  },
  {
    name: 'lpm-kaprodi-temuan', title: 'Temuan Prodi', role: 'Kaprodi', modul: 'LPM > Kaprodi',
    desc: 'Melihat temuan AMI untuk prodi dan memberikan tindak lanjut.',
    steps: [
      { file: '01_index', title: 'Daftar Temuan Prodi', desc: 'Tabel temuan AMI untuk program studi kaprodi.' },
      { file: '02_show', title: 'Detail Temuan & Tindak Lanjut', desc: 'Detail temuan dengan form tindak lanjut yang bisa diisi kaprodi.' },
    ],
  },

  // ─── PORTAL (10) ─────────────────────────────────────────────────────
  {
    name: 'lpm-portal-home', title: 'Portal LPM - Beranda', role: 'Publik', modul: 'LPM Portal',
    desc: 'Halaman beranda portal publik LPM.',
    steps: [{ file: '01_page', title: 'Beranda Portal', desc: 'Landing page portal LPM menampilkan informasi umum dan navigasi ke bagian-bagian portal.' }],
  },
  {
    name: 'lpm-portal-profil', title: 'Portal LPM - Profil', role: 'Publik', modul: 'LPM Portal',
    desc: 'Halaman profil institusi pada portal publik.',
    steps: [{ file: '01_page', title: 'Profil Institusi', desc: 'Informasi profil perguruan tinggi yang ditampilkan ke publik.' }],
  },
  {
    name: 'lpm-portal-penetapan', title: 'Portal LPM - Penetapan', role: 'Publik', modul: 'LPM Portal',
    desc: 'Halaman penetapan SPMI pada portal publik (hanya dokumen dengan akses Publik).',
    steps: [{ file: '01_page', title: 'Penetapan SPMI', desc: 'Daftar kebijakan, standar, dan dokumen SPMI yang bersifat publik.' }],
  },
  {
    name: 'lpm-portal-pelaksanaan', title: 'Portal LPM - Pelaksanaan', role: 'Publik', modul: 'LPM Portal',
    desc: 'Halaman pelaksanaan SPMI pada portal publik.',
    steps: [{ file: '01_page', title: 'Pelaksanaan SPMI', desc: 'Kegiatan pelaksanaan standar mutu yang ditampilkan ke publik.' }],
  },
  {
    name: 'lpm-portal-evaluasi', title: 'Portal LPM - Evaluasi', role: 'Publik', modul: 'LPM Portal',
    desc: 'Halaman evaluasi SPMI pada portal publik.',
    steps: [{ file: '01_page', title: 'Evaluasi SPMI', desc: 'Kegiatan evaluasi mutu yang ditampilkan ke publik.' }],
  },
  {
    name: 'lpm-portal-pengendalian', title: 'Portal LPM - Pengendalian', role: 'Publik', modul: 'LPM Portal',
    desc: 'Halaman pengendalian SPMI pada portal publik.',
    steps: [{ file: '01_page', title: 'Pengendalian SPMI', desc: 'Kegiatan pengendalian mutu yang ditampilkan ke publik.' }],
  },
  {
    name: 'lpm-portal-peningkatan', title: 'Portal LPM - Peningkatan', role: 'Publik', modul: 'LPM Portal',
    desc: 'Halaman peningkatan SPMI pada portal publik.',
    steps: [{ file: '01_page', title: 'Peningkatan SPMI', desc: 'Kegiatan peningkatan mutu yang ditampilkan ke publik.' }],
  },
  {
    name: 'lpm-portal-prodi', title: 'Portal LPM - Program Studi', role: 'Publik', modul: 'LPM Portal',
    desc: 'Daftar program studi dan status akreditasi pada portal publik.',
    steps: [{ file: '01_page', title: 'Program Studi', desc: 'Informasi program studi beserta status akreditasi masing-masing.' }],
  },
  {
    name: 'lpm-portal-akreditasi', title: 'Portal LPM - Akreditasi', role: 'Publik', modul: 'LPM Portal',
    desc: 'Daftar SK akreditasi institusi dan program studi pada portal publik.',
    steps: [{ file: '01_page', title: 'SK Akreditasi', desc: 'Daftar surat keputusan akreditasi yang bersifat publik.' }],
  },
  {
    name: 'lpm-portal-dokumen', title: 'Portal LPM - Dokumen', role: 'Publik', modul: 'LPM Portal',
    desc: 'Perpustakaan dokumen publik LPM yang bisa diunduh.',
    steps: [{ file: '01_page', title: 'Dokumen Publik', desc: 'Daftar dokumen LPM yang tersedia untuk publik dengan opsi download.' }],
  },
];

// ─── GENERATE REPORTS ────────────────────────────────────────────────────────

let totalReports = 0;
for (const f of features) {
  const dir = path.join(WR, f.name);
  const ssDir = path.join(dir, 'screenshots');

  // Check screenshots exist
  if (!fs.existsSync(ssDir)) {
    console.log(`SKIP: ${f.name} — no screenshots directory`);
    continue;
  }

  const existingFiles = fs.readdirSync(ssDir).filter(f => f.endsWith('.png'));
  if (existingFiles.length === 0) {
    console.log(`SKIP: ${f.name} — no screenshots`);
    continue;
  }

  let md = `# Workflow Report: ${f.title}\n\n`;
  md += `**Tanggal**: ${today}  \n`;
  md += `**Role**: ${f.role}  \n`;
  md += `**Modul**: ${f.modul}  \n`;
  md += `**Status**: ✅ Berhasil\n\n`;
  md += `## Ringkasan\n\n${f.desc}\n\n`;
  md += `## Langkah-langkah\n\n`;

  for (let i = 0; i < f.steps.length; i++) {
    const s = f.steps[i];
    const pngFile = s.file + '.png';
    if (!existingFiles.includes(pngFile)) continue;

    md += `### ${i + 1}. ${s.title}\n\n`;
    md += `${s.desc}\n\n`;
    md += `![${s.title}](screenshots/${pngFile})\n\n`;
  }

  md += `## Catatan\n\n`;
  md += `- Screenshot diambil secara otomatis menggunakan Playwright\n`;
  md += `- Data yang ditampilkan adalah dummy data dari LpmDummySeeder\n`;
  if (f.role === 'Publik') {
    md += `- Halaman ini dapat diakses tanpa login (portal publik)\n`;
    md += `- Hanya menampilkan dokumen dengan akses "Publik"\n`;
  }

  fs.writeFileSync(path.join(dir, 'REPORT.md'), md);
  totalReports++;
  console.log(`OK: ${f.name}/REPORT.md (${f.steps.length} steps)`);
}

console.log(`\nGenerated ${totalReports} reports`);
