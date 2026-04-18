# Workflow Report: Pelayanan Tendik

**Tanggal**: 2026-04-18  
**Role**: Tendik  
**Modul**: HRM  
**Fitur**: Pelayanan Tendik  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Daftar pelayanan dan form penambahan layanan tendik.

## Ringkasan

1 langkah berhasil, 1 langkah gagal, dan 2 temuan warning tercatat.

## Langkah-langkah

### 1. Daftar Pelayanan

**Deskripsi**: Halaman ini merekam tampilan utama daftar pelayanan sebagai bagian dari alur pelayanan tendik.

**Akun**: Portal Tendik

**URL**: `http://127.0.0.1:8000/hrm/tendik/kinerja/pelayanan`

**Catatan langkah**: no-data: Halaman tampil tetapi data yang ditampilkan masih kosong atau belum tersedia. missing-sidebar: Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung.

![Daftar Pelayanan](screenshots/01_index.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Daftar Pelayanan | `http://127.0.0.1:8000/hrm/tendik/kinerja/pelayanan` | `no-data` | Halaman tampil tetapi data yang ditampilkan masih kosong atau belum tersedia. | [Lihat](screenshots/01_index.png) | Low |
| 2 | Daftar Pelayanan | `http://127.0.0.1:8000/hrm/tendik/kinerja/pelayanan` | `missing-sidebar` | Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung. | [Lihat](screenshots/01_index.png) | Medium |
| 3 | Form Tambah Pelayanan | `http://127.0.0.1:8000/hrm/tendik/kinerja/pelayanan` | `missing-feature` | Elemen aksi "/Tambah/i" tidak ditemukan pada area utama halaman. | [Lihat](screenshots/err_02_create.png) | High |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder HRM yang aktif saat scan dijalankan.
