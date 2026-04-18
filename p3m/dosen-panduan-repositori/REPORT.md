# Workflow Report: Panduan & Repositori Dosen P3M

**Tanggal**: 2026-04-19  
**Role**: Dosen  
**Modul**: P3M > Portal Dosen  
**Fitur**: Panduan & Repositori Dosen P3M  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Navigasi halaman panduan dosen, daftar repositori, dan form tambah repositori dari sidebar portal dosen P3M.

## Ringkasan

3 langkah berhasil, 0 langkah gagal, dan 2 temuan warning tercatat.

## Langkah-langkah

### 1. Panduan P3M

**Deskripsi**: Halaman panduan dosen berhasil dibuka dari sidebar, namun daftar panduan saat ini masih kosong.

**Akun**: Portal Dosen - Dr. Budi Santoso, M.Kom

**URL**: `http://127.0.0.1:8000/p3m/dosen/panduan`

**Catatan langkah**: no-data: Halaman tampil normal tetapi belum ada panduan yang tersedia.

![Panduan P3M](screenshots/03_panduan_rescan.png)

### 2. Repositori P3M

**Deskripsi**: Halaman repositori dosen sudah bisa diakses tanpa error permission, namun data repositori untuk akun ini masih kosong.

**Akun**: Portal Dosen - Dr. Budi Santoso, M.Kom

**URL**: `http://127.0.0.1:8000/p3m/dosen/repositori`

**Catatan langkah**: no-data: Halaman tampil normal tetapi belum ada data repositori yang tersimpan.

![Repositori P3M](screenshots/04_repositori_index.png)

### 3. Form Tambah Repositori

**Deskripsi**: Form tambah repositori berhasil dibuka untuk memverifikasi field wajib, tipe author, dan upload PDF tanpa melakukan submit.

**Akun**: Portal Dosen - Dr. Budi Santoso, M.Kom

**URL**: `http://127.0.0.1:8000/p3m/dosen/repositori/create`

![Form Tambah Repositori](screenshots/05_repositori_create.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Panduan P3M | `http://127.0.0.1:8000/p3m/dosen/panduan` | `no-data` | Halaman panduan tampil normal tetapi belum memiliki data panduan untuk ditampilkan. | [Lihat](screenshots/03_panduan_rescan.png) | Low |
| 2 | Repositori P3M | `http://127.0.0.1:8000/p3m/dosen/repositori` | `no-data` | Akses repositori sudah normal, tetapi akun dosen yang diuji belum memiliki data repositori. | [Lihat](screenshots/04_repositori_index.png) | Low |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama dilakukan melalui sidebar.
- Form pada report ini hanya dibuka untuk verifikasi visual dan field wajib, tidak disubmit agar report tidak memalsukan status keberhasilan.
- Bug permission pada halaman repositori yang muncul pada scan sebelumnya sudah tidak ditemukan lagi.
