# Workflow Report: Validasi Laporan Akhir P3M

**Tanggal**: 2026-04-19  
**Role**: Administrator P3M  
**Modul**: P3M > Admin P3M  
**Fitur**: Validasi Laporan Akhir P3M  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Daftar laporan akhir proposal penelitian dan pengabdian, termasuk halaman review laporan yang masuk.

## Ringkasan

2 langkah berhasil, 0 langkah gagal, dan 2 temuan warning tercatat.

## Langkah-langkah

### 1. Laporan Penelitian

**Deskripsi**: Halaman validasi laporan akhir penelitian berhasil dibuka dari sidebar admin P3M, namun saat retest belum ada laporan penelitian yang perlu divalidasi.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/validasi-laporan/penelitian`

**Catatan langkah**: no-data: Halaman tampil normal tetapi tabel validasi laporan penelitian masih kosong.

![Laporan Penelitian](screenshots/01_penelitian_index.png)

### 2. Laporan Pengabdian

**Deskripsi**: Halaman validasi laporan akhir pengabdian berhasil dibuka dari sidebar admin P3M, namun saat retest belum ada laporan pengabdian yang perlu divalidasi.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/validasi-laporan/pengabdian`

**Catatan langkah**: no-data: Halaman tampil normal tetapi tabel validasi laporan pengabdian masih kosong.

![Laporan Pengabdian](screenshots/02_pengabdian_index.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Laporan Penelitian | `http://127.0.0.1:8000/p3m/admin/validasi-laporan/penelitian` | `no-data` | Halaman validasi laporan penelitian tampil normal, tetapi belum ada laporan yang perlu divalidasi. | [Lihat](screenshots/01_penelitian_index.png) | Low |
| 2 | Laporan Pengabdian | `http://127.0.0.1:8000/p3m/admin/validasi-laporan/pengabdian` | `no-data` | Halaman validasi laporan pengabdian tampil normal, tetapi belum ada laporan yang perlu divalidasi. | [Lihat](screenshots/02_pengabdian_index.png) | Low |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder P3M yang aktif saat scan dijalankan.
