# Workflow Report: Presensi Mahasiswa (Admin)

**Tanggal**: 2026-04-18
**Role**: Admin
**Modul**: SIAKAD
**Fitur**: Presensi Mahasiswa
**Status**: Berhasil

## Deskripsi Workflow

Verifikasi halaman presensi mahasiswa setelah refactor filter periode akademik. Fokus utamanya adalah memastikan halaman index kembali dapat dibuka, filter tanggal bekerja pada data aktif, dan opsi filter program studi serta mata kuliah tidak lagi memicu error query.

## Ringkasan

Halaman `Presensi Mahasiswa` berhasil dibuka melalui sidebar `SIAKAD -> Perkuliahan`. Setelah perbaikan, halaman tidak lagi gagal pada query filter option dan daftar sesi tampil untuk periode akademik aktif dalam rentang tanggal default.

## Langkah-langkah

### 1. Login Admin

**Deskripsi**: Membuka halaman login dan menyiapkan autentikasi admin untuk mengakses menu akademik.

**URL**: `http://127.0.0.1:8000/login`

![Login Admin](screenshots/01_login-page.png)

### 2. Buka Sidebar Perkuliahan

**Deskripsi**: Setelah login, grup `SIAKAD` dan submenu `Perkuliahan` dibuka dari sidebar agar konteks navigasi fitur terlihat jelas sebelum masuk ke halaman presensi.

**URL**: `http://127.0.0.1:8000/dashboard`

![Sidebar Perkuliahan](screenshots/02_sidebar-perkuliahan.png)

### 3. Buka Halaman Presensi Mahasiswa

**Deskripsi**: Admin membuka halaman `Presensi Mahasiswa`. Halaman memuat filter tanggal, program studi, dan mata kuliah, serta menampilkan sesi kuliah tanpa error server. Perbaikan yang tervalidasi di sini adalah penggunaan `periode_akademik_id` pada filter sesi aktif dan pengurutan filter option dengan kolom database yang benar.

**URL**: `http://127.0.0.1:8000/siakad/presensi-mahasiswa`

![Index Presensi Mahasiswa](screenshots/03_index.png)

## Temuan & Masalah

Tidak ada temuan terbuka pada flow ini setelah perbaikan diterapkan.

## Catatan

- Validasi visual dilakukan setelah bug `Unknown column 'nama' in 'order clause'` pada filter option diperbaiki.
- Screenshot diambil per viewport karena full-page capture Chromium gagal pada environment Windows saat ini.
- Verifikasi logika filter periode juga ditutup oleh test `tests/Feature/Admin/PresensiMahasiswaIndexTest.php`.
