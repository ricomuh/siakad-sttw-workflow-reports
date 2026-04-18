# Workflow Report: Pelayanan Tendik

**Tanggal**: 2026-04-18  
**Role**: Tendik  
**Modul**: HRM  
**Fitur**: Pelayanan Tendik  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Daftar pelayanan dan form penambahan layanan tendik.

## Ringkasan

2 langkah berhasil, 0 langkah gagal, dan 1 temuan warning tercatat.

## Langkah-langkah

### 1. Daftar Pelayanan

**Deskripsi**: Halaman ini merekam tampilan utama daftar pelayanan sebagai bagian dari alur pelayanan tendik.

**Akun**: Portal Tendik

**URL**: `http://127.0.0.1:8000/hrm/tendik/kinerja/pelayanan`

**Catatan langkah**: no-data: Halaman tampil tetapi data yang ditampilkan masih kosong atau belum tersedia.

![Daftar Pelayanan](screenshots/01_index.png)

### 2. Form Tambah Pelayanan

**Deskripsi**: Form dibuka tanpa submit untuk memverifikasi field wajib, struktur input, dan tombol aksi pada pelayanan tendik.

**Akun**: Portal Tendik

**URL**: `http://127.0.0.1:8000/hrm/tendik/kinerja/pelayanan/create`

![Form Tambah Pelayanan](screenshots/02_create.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Daftar Pelayanan | `http://127.0.0.1:8000/hrm/tendik/kinerja/pelayanan` | `no-data` | Halaman tampil tetapi data yang ditampilkan masih kosong atau belum tersedia. | [Lihat](screenshots/01_index.png) | Low |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder HRM yang aktif saat scan dijalankan.
