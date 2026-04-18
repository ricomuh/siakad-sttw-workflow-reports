# Workflow Report: Panduan & Repositori Dosen P3M

**Tanggal**: 2026-04-19  
**Role**: Dosen  
**Modul**: P3M > Portal Dosen  
**Fitur**: Panduan & Repositori Dosen P3M  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Halaman panduan dosen, daftar repositori, dan form penambahan data repositori.

## Ringkasan

1 langkah berhasil, 1 langkah gagal, dan 0 temuan warning tercatat.

## Langkah-langkah

### 1. Panduan P3M

**Deskripsi**: Halaman panduan dosen, daftar repositori, dan form penambahan data repositori. Langkah ini difokuskan pada tampilan panduan p3m.

**Akun**: Portal Dosen - Budi Santoso

**URL**: `http://127.0.0.1:8000/p3m/dosen/panduan`

![Panduan P3M](screenshots/01_panduan.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Repositori P3M | `http://127.0.0.1:8000/p3m/dosen/repositori` | `permission` | Akses ke halaman ini ditolak untuk role yang sedang digunakan. | [Lihat](screenshots/02_repositori.png) | High |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder P3M yang aktif saat scan dijalankan.
