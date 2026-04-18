# Workflow Report: Pengabdian Dosen

**Tanggal**: 2026-04-18  
**Role**: Dosen  
**Modul**: HRM > Portal Saya  
**Fitur**: Pengabdian Dosen  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Halaman pengabdian dosen yang menunggu integrasi P3M.

## Ringkasan

1 langkah berhasil, 0 langkah gagal, dan 3 temuan warning tercatat.

## Langkah-langkah

### 1. Data Pengabdian

**Deskripsi**: Halaman ini merekam tampilan utama data pengabdian sebagai bagian dari alur pengabdian dosen.

**Akun**: Portal Dosen

**URL**: `http://127.0.0.1:8000/hrm/portal/kinerja/pengabdian`

**Catatan langkah**: no-data: Halaman tampil tetapi data yang ditampilkan masih kosong atau belum tersedia. incomplete-data: Halaman menunjukkan data atau integrasi belum lengkap. missing-sidebar: Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung.

![Data Pengabdian](screenshots/01_index.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Data Pengabdian | `http://127.0.0.1:8000/hrm/portal/kinerja/pengabdian` | `no-data` | Halaman tampil tetapi data yang ditampilkan masih kosong atau belum tersedia. | [Lihat](screenshots/01_index.png) | Low |
| 2 | Data Pengabdian | `http://127.0.0.1:8000/hrm/portal/kinerja/pengabdian` | `incomplete-data` | Halaman menunjukkan data atau integrasi belum lengkap. | [Lihat](screenshots/01_index.png) | Medium |
| 3 | Data Pengabdian | `http://127.0.0.1:8000/hrm/portal/kinerja/pengabdian` | `missing-sidebar` | Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung. | [Lihat](screenshots/01_index.png) | Medium |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder HRM yang aktif saat scan dijalankan.
