# Workflow Report: Validasi Monev P3M

**Tanggal**: 2026-04-19  
**Role**: Administrator P3M  
**Modul**: P3M > Admin P3M  
**Fitur**: Validasi Monev P3M  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Validasi monev pelaksanaan dari sidebar serta halaman monev akhir yang hanya bisa diakses lewat URL detail.

## Ringkasan

5 langkah berhasil, 0 langkah gagal, dan 3 temuan warning tercatat.

## Langkah-langkah

### 1. Monev Penelitian

**Deskripsi**: Halaman ini merekam tampilan utama monev penelitian sebagai bagian dari alur validasi monev p3m.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/validasi-monev/penelitian/pelaksanaan`

![Monev Penelitian](screenshots/01_penelitian_pelaksanaan_index.png)

### 2. Detail Monev Penelitian

**Deskripsi**: Halaman ini merekam tampilan utama detail monev penelitian sebagai bagian dari alur validasi monev p3m.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/validasi-monev/penelitian/pelaksanaan/3`

**Catatan langkah**: incomplete-data: Halaman menunjukkan data atau integrasi belum lengkap.

![Detail Monev Penelitian](screenshots/02_penelitian_pelaksanaan_detail.png)

### 3. Monev Pengabdian

**Deskripsi**: Halaman ini merekam tampilan utama monev pengabdian sebagai bagian dari alur validasi monev p3m.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/validasi-monev/pengabdian/pelaksanaan`

![Monev Pengabdian](screenshots/03_pengabdian_pelaksanaan_index.png)

### 4. Monev Akhir Pengabdian

**Deskripsi**: Halaman ini merekam tampilan utama monev akhir pengabdian sebagai bagian dari alur validasi monev p3m.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/validasi-monev/pengabdian/akhir`

**Catatan langkah**: missing-sidebar: Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung.

![Monev Akhir Pengabdian](screenshots/04_pengabdian_akhir_index.png)

### 5. Detail Monev Akhir Pengabdian

**Deskripsi**: Halaman ini merekam tampilan utama detail monev akhir pengabdian sebagai bagian dari alur validasi monev p3m.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/validasi-monev/pengabdian/akhir/5`

**Catatan langkah**: missing-sidebar: Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung.

![Detail Monev Akhir Pengabdian](screenshots/05_pengabdian_akhir_detail.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Detail Monev Penelitian | `http://127.0.0.1:8000/p3m/admin/validasi-monev/penelitian/pelaksanaan/3` | `incomplete-data` | Halaman menunjukkan data atau integrasi belum lengkap. | [Lihat](screenshots/02_penelitian_pelaksanaan_detail.png) | Medium |
| 2 | Monev Akhir Pengabdian | `http://127.0.0.1:8000/p3m/admin/validasi-monev/pengabdian/akhir` | `missing-sidebar` | Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung. | [Lihat](screenshots/04_pengabdian_akhir_index.png) | Medium |
| 3 | Detail Monev Akhir Pengabdian | `http://127.0.0.1:8000/p3m/admin/validasi-monev/pengabdian/akhir/5` | `missing-sidebar` | Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung. | [Lihat](screenshots/05_pengabdian_akhir_detail.png) | Medium |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder P3M yang aktif saat scan dijalankan.
