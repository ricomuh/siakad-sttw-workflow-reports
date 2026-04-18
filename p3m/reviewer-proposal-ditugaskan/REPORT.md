# Workflow Report: Proposal Ditugaskan Reviewer P3M

**Tanggal**: 2026-04-19  
**Role**: Reviewer  
**Modul**: P3M > Review Proposal  
**Fitur**: Proposal Ditugaskan Reviewer P3M  
**Status**: ❌ Gagal

## Deskripsi Workflow

Menu reviewer untuk proposal yang ditugaskan. Saat ini sidebar menampilkan item, tetapi route tujuan belum tersedia.

## Ringkasan

Semua 1 langkah pada scan ini berakhir gagal dan perlu dicek ulang.

## Langkah-langkah

Belum ada langkah sukses yang berhasil direkam untuk fitur ini.

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Proposal Ditugaskan | `http://127.0.0.1:8000/p3m/dosen/dashboard` | `missing-feature` | Menu sidebar "Proposal Ditugaskan" tidak memiliki route tujuan yang valid. | [Lihat](screenshots/err_01_index.png) | High |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder P3M yang aktif saat scan dijalankan.
