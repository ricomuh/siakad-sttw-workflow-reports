# Workflow Report: Bahan Ajar Dosen

**Tanggal**: 2026-04-18  
**Role**: Dosen  
**Modul**: HRM > Portal Saya  
**Fitur**: Bahan Ajar Dosen  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Daftar bahan ajar dan form penambahan bahan ajar.

## Ringkasan

1 langkah berhasil, 1 langkah gagal, dan 1 temuan warning tercatat.

## Langkah-langkah

### 1. Daftar Bahan Ajar

**Deskripsi**: Halaman ini merekam tampilan utama daftar bahan ajar sebagai bagian dari alur bahan ajar dosen.

**Akun**: Portal Dosen

**URL**: `http://127.0.0.1:8000/hrm/portal/kinerja/bahan-ajar`

**Catatan langkah**: missing-sidebar: Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung.

![Daftar Bahan Ajar](screenshots/01_index.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Daftar Bahan Ajar | `http://127.0.0.1:8000/hrm/portal/kinerja/bahan-ajar` | `missing-sidebar` | Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung. | [Lihat](screenshots/01_index.png) | Medium |
| 2 | Form Tambah Bahan Ajar | `http://127.0.0.1:8000/hrm/portal/kinerja/bahan-ajar` | `missing-feature` | Elemen aksi "/Tambah/i" tidak ditemukan pada area utama halaman. | [Lihat](screenshots/err_02_create.png) | High |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder HRM yang aktif saat scan dijalankan.
