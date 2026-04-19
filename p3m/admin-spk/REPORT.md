# Workflow Report: Kelola SPK P3M

**Tanggal**: 2026-04-19  
**Role**: Administrator P3M  
**Modul**: P3M > Admin P3M  
**Fitur**: Kelola SPK P3M  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Daftar proposal yang sudah lolos untuk proses SPK dan halaman pengelolaan dokumen per proposal.

## Ringkasan

3 langkah berhasil, 0 langkah gagal, dan 1 temuan warning tercatat.

## Langkah-langkah

### 1. SPK Penelitian

**Deskripsi**: Halaman ini merekam tampilan utama spk penelitian sebagai bagian dari alur kelola spk p3m.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/spk/penelitian`

![SPK Penelitian](screenshots/01_penelitian_index.png)

### 2. Detail SPK Penelitian

**Deskripsi**: Halaman ini merekam tampilan utama detail spk penelitian sebagai bagian dari alur kelola spk p3m.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/spk/penelitian/3`

![Detail SPK Penelitian](screenshots/02_penelitian_detail.png)

### 3. SPK Pengabdian

**Deskripsi**: Halaman SPK pengabdian berhasil dibuka dari sidebar admin P3M, namun saat retest belum ada proposal pengabdian yang masuk ke tahap SPK.

**Akun**: Administrator P3M

**URL**: `http://127.0.0.1:8000/p3m/admin/spk/pengabdian`

**Catatan langkah**: no-data: Halaman tampil normal tetapi tabel proposal SPK pengabdian masih kosong.

![SPK Pengabdian](screenshots/03_pengabdian_index.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | SPK Pengabdian | `http://127.0.0.1:8000/p3m/admin/spk/pengabdian` | `no-data` | Halaman SPK pengabdian tampil normal, tetapi belum ada proposal yang masuk untuk diproses. | [Lihat](screenshots/03_pengabdian_index.png) | Low |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder P3M yang aktif saat scan dijalankan.
