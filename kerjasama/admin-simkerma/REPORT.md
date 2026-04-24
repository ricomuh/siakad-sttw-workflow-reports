# Workflow Report: SIMKERMA — Admin (MoU/MoA/IA)

**Tanggal**: 2026-04-24
**Role**: admin (`admin@sttw.ac.id`)
**Modul**: kerjasama (SIMKERMA)
**Fitur**: Admin — Surat Kerjasama, Master Data, Laporan
**Status**: ✅ Berhasil

## Deskripsi Workflow

Validasi visual untuk modul **SIMKERMA** (Sistem Informasi Manajemen Kerjasama) yang baru di-merge via PR #162. Modul ini menggantikan aplikasi legacy CodeIgniter `simkerma.sttw.ac.id` dengan implementasi native Laravel di SIAKAD STTW. Cakupan workflow:

1. Login sebagai admin
2. Navigasi ke modul SIMKERMA via sidebar
3. Lihat dashboard kerjasama dengan chart status/dokumen/tingkat/monthly trend
4. Lihat list surat kerjasama (dengan filter, pagination, badge status)
5. Lihat form tambah surat baru
6. Lihat halaman detail surat (dengan info lembaga mitra, penandatangan, jenis, periode)
7. Lihat menu Master Data (Lembaga Mitra, Unit Pelaksana, Kategori Mitra, Bentuk, Kategori Bukti)
8. Lihat menu Laporan (LKPS Excel, LAPORKERMA PDF)

Data dummy: 6 surat kerjasama (Aktif×3, Aktif×2, Kadaluarsa×1) dengan jenis dokumen MoU/MoA/IA dan tingkat Lokal/Nasional/Internasional, di-seed via `SuratKerjasamaFactory`.

## Ringkasan

Semua halaman utama modul SIMKERMA berhasil dirender tanpa error setelah PR feedback fix di commit `1e9f62d`. Sidebar SIMKERMA terbuka dengan benar dan menampilkan grup: Dashboard, Surat Kerjasama, Master Data (5 sub-link), Laporan (2 sub-link). Tidak ada 500/403 yang ditemukan dalam scan ini.

## Langkah-langkah

### 1. Login Page

**Deskripsi**: Halaman login standar SIAKAD STTW dengan field NIM/NIP/Email + Password. Belum melakukan autentikasi.

**URL**: `http://127.0.0.1:8000/login`

![Halaman login SIAKAD STTW](screenshots/01_dashboard.png)

> **Catatan**: File diberi nama `01_dashboard.png` tapi sebenarnya screenshot dashboard setelah login berhasil — sidebar lengkap kelihatan di sebelah kiri.

### 2. Sidebar SIMKERMA Diperluas

**Deskripsi**: Setelah klik grup **SIMKERMA** di sidebar, menu kerjasama terbuka menampilkan 4 grup: Dashboard, Surat Kerjasama, Master Data (collapsible), Laporan (collapsible).

**URL**: `http://127.0.0.1:8000/dashboard`

![Sidebar SIMKERMA expanded dengan menu Dashboard, Surat Kerjasama, Master Data, Laporan](screenshots/02_sidebar-expanded.png)

### 3. Dashboard Kerjasama

**Deskripsi**: Halaman dashboard SIMKERMA menampilkan ringkasan statistik: total surat per status (Aktif/Kadaluarsa/Diperpanjang), distribusi per dokumen (MoU/MoA/IA), distribusi per tingkat (Lokal/Nasional/Internasional), dan trend bulanan 12 bulan terakhir. Setelah PR fix, query sudah pakai `groupBy` (bukan N+1 COUNT loops) dan driver-aware (SQLite `strftime` untuk test, MySQL `DATE_FORMAT` untuk prod).

**URL**: `http://127.0.0.1:8000/kerjasama`

![Dashboard kerjasama dengan card statistik dan chart](screenshots/03_dashboard-kerjasama.png)

### 4. Daftar Surat Kerjasama

**Deskripsi**: Tabel daftar surat kerjasama dengan filter (status, dokumen, tingkat, tahun, mitra), kolom: Mitra, Dokumen, Tingkat, Periode, Status (badge berwarna), Sisa Hari, Aksi (Detail/Edit/Hapus). Tombol `+ Tambah` di kanan atas. Ada 6 baris data dummy yang di-seed.

**URL**: `http://127.0.0.1:8000/kerjasama/surat`

![Daftar surat kerjasama dengan tabel berisi 6 surat dummy](screenshots/04_surat-list.png)

### 5. Form Tambah Surat Baru

**Deskripsi**: Form input surat kerjasama baru dengan field: Lembaga Mitra (select2), Unit Pelaksana, Program Studi, Bentuk Kerjasama, Jenis Dokumen (MoU/MoA/IA), Tingkat (Lokal/Nasional/Internasional), Nomor Pihak 1 & 2, Tanggal Awal/Akhir, Anggaran, Ruang Lingkup, Penandatangan (repeater Pihak1/Pihak2), Jenis Kerjasama (multi-select), Upload File. Form sudah pakai BackedEnum `->value` untuk `@selected`/`@js` (fix dari PR #162).

**URL**: `http://127.0.0.1:8000/kerjasama/surat/create`

![Form tambah surat kerjasama](screenshots/05_surat-create-form.png)

### 6. Detail Surat Kerjasama

**Deskripsi**: Halaman detail menampilkan seluruh metadata surat: nomor pihak, mitra (link), unit pelaksana, bentuk, jenis dokumen, tingkat, periode, sisa hari, anggaran, info mitra, deskripsi, manfaat, ruang lingkup, daftar penandatangan, daftar jenis kerjasama, dan tombol aksi (Edit, Cetak, Perpanjang jika status `Aktif`/`Kadaluarsa`). Setelah PR fix, semua perbandingan status sudah pakai `?->value` pada `StatusKerjasama` enum.

**URL**: `http://127.0.0.1:8000/kerjasama/surat/5`

![Halaman detail surat kerjasama dengan metadata lengkap](screenshots/06_surat-detail.png)

### 7. Master Data — Lembaga Mitra

**Deskripsi**: Tabel master Lembaga Mitra dengan kolom: Nama, Kategori Mitra, Alamat, Negara, Aksi. Ada 5 mitra dummy (PT Pertamina, Kabupaten Sukoharjo, Universitas Gadjah Mada, PT Telkom Indonesia, BPS Jateng). Tombol `+ Tambah` untuk register mitra baru.

**URL**: `http://127.0.0.1:8000/kerjasama/master/lembaga-mitra`

![Daftar lembaga mitra dengan 5 mitra dummy](screenshots/07_master-lembaga-mitra.png)

### 8. Sidebar — Menu Laporan Diperluas

**Deskripsi**: Sub-menu Laporan menampilkan 2 export: **LKPS (Excel)** untuk format akreditasi BAN-PT (sesuai standar Sapto), dan **LAPORKERMA (PDF)** untuk laporan internal. Setelah PR fix, eager-load `lembagaMitra.kategoriMitra` (bukan `kategori`) dan bold heading di row A11 (sesuai `startCell`).

**URL**: `http://127.0.0.1:8000/kerjasama/master/lembaga-mitra`

![Sidebar dengan sub-menu Laporan terbuka memperlihatkan LKPS dan LAPORKERMA](screenshots/08_sidebar-laporan-expanded.png)

## Skenario Alternatif

Skenario role lain (kaprodi/dosen/mahasiswa) tidak di-cover di laporan ini karena modul SIMKERMA versi awal **role-restricted ke admin/akademik/waket** sesuai PRD section 4.2 (CRUD lengkap hanya untuk admin; kaprodi hanya menerima notifikasi WhatsApp/email saat surat di unitnya akan kadaluarsa, tidak punya halaman dedicated). Untuk validasi notifikasi reminder, lihat unit test `tests/Feature/Kerjasama/CheckExpiringKerjasamaJobTest.php` (tercakup dalam baseline 38 tests passed).

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| - | - | - | - | Tidak ada temuan dalam scan ini. Semua halaman render tanpa 500/403, sidebar lengkap, data dummy tampil. | - | - |

## Catatan

- **Data preparation**: `php artisan migrate:fresh --seed --force` + 6 surat dummy via `SuratKerjasamaFactory()->aktif()/kadaluarsa()` + 5 lembaga mitra via `firstOrCreate`. Kategori mitra dari `KerjasamaMasterSeeder`.
- **PR #162 fixes verified visually**:
  - ✅ Form create render benar (BackedEnum `->value` di `@js`/`@selected`)
  - ✅ Detail page render status badge tanpa error PHP (enum comparison fix)
  - ✅ Dashboard chart render (grouped query + driver-aware date format)
  - ⏭️ LKPS export tidak di-screenshot (file download); validated via unit test `LkpsKerjasamaExportTest`
  - ⏭️ Reminder/auto-status job tidak di-screenshot (background scheduled jobs)
- **Tidak di-cover scan ini** (perlu skenario terpisah jika diminta):
  - Edit form & validation error states
  - Delete confirmation modal
  - Filter combinations & pagination
  - Perpanjang surat flow
  - Upload bukti lampiran + signed download URL (fix #9 PR #162)
  - Multi-tab pada detail (penandatangan, bukti, turunan)
- **Server**: `php artisan serve --host=127.0.0.1 --port=8000`, MySQL via XAMPP local.
- **Browser**: Playwright Chromium 1366×900.
- **Branch saat scan**: `dev/simkerma-module` @ commit `1e9f62d`.
