# Workflow Report: Proposal Dosen P3M

**Tanggal**: 2026-04-19  
**Role**: Dosen  
**Modul**: P3M > Portal Dosen  
**Fitur**: Proposal Dosen P3M  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Riwayat proposal penelitian dan pengabdian, bug route pada menu sidebar proposal, serta halaman aktual proposal draft, revisi, dan diterima.

## Ringkasan

8 langkah berhasil, 4 langkah gagal, dan 0 temuan warning tercatat.

## Langkah-langkah

### 1. Halaman Proposal Saya Penelitian

**Deskripsi**: Halaman ini merekam tampilan utama halaman proposal saya penelitian sebagai bagian dari alur proposal dosen p3m.

**Akun**: Portal Dosen - Budi Santoso

**URL**: `http://127.0.0.1:8000/p3m/dosen/penelitian`

![Halaman Proposal Saya Penelitian](screenshots/02_penelitian_index.png)

### 2. Form Ajukan Proposal Penelitian

**Deskripsi**: Halaman ini merekam tampilan utama form ajukan proposal penelitian sebagai bagian dari alur proposal dosen p3m.

**Akun**: Portal Dosen - Budi Santoso

**URL**: `http://127.0.0.1:8000/p3m/dosen/penelitian/create`

![Form Ajukan Proposal Penelitian](screenshots/04_penelitian_create.png)

### 3. Detail Proposal Penelitian Draft

**Deskripsi**: Halaman ini merekam tampilan utama detail proposal penelitian draft sebagai bagian dari alur proposal dosen p3m.

**Akun**: Portal Dosen - Budi Santoso

**URL**: `http://127.0.0.1:8000/p3m/dosen/penelitian/1`

![Detail Proposal Penelitian Draft](screenshots/05_penelitian_draft_detail.png)

### 4. Form Edit Proposal Penelitian Draft

**Deskripsi**: Halaman ini merekam tampilan utama form edit proposal penelitian draft sebagai bagian dari alur proposal dosen p3m.

**Akun**: Portal Dosen - Budi Santoso

**URL**: `http://127.0.0.1:8000/p3m/dosen/penelitian/1/edit`

![Form Edit Proposal Penelitian Draft](screenshots/06_penelitian_draft_edit.png)

### 5. Detail Proposal Penelitian Diterima

**Deskripsi**: Halaman ini merekam tampilan utama detail proposal penelitian diterima sebagai bagian dari alur proposal dosen p3m.

**Akun**: Portal Dosen - Budi Santoso

**URL**: `http://127.0.0.1:8000/p3m/dosen/penelitian/3`

![Detail Proposal Penelitian Diterima](screenshots/07_penelitian_diterima_detail.png)

### 6. Halaman Proposal Saya Pengabdian

**Deskripsi**: Halaman ini merekam tampilan utama halaman proposal saya pengabdian sebagai bagian dari alur proposal dosen p3m.

**Akun**: Portal Dosen - Siti Nurhaliza

**URL**: `http://127.0.0.1:8000/p3m/dosen/pengabdian`

![Halaman Proposal Saya Pengabdian](screenshots/09_pengabdian_index.png)

### 7. Form Ajukan Proposal Pengabdian

**Deskripsi**: Halaman ini merekam tampilan utama form ajukan proposal pengabdian sebagai bagian dari alur proposal dosen p3m.

**Akun**: Portal Dosen - Siti Nurhaliza

**URL**: `http://127.0.0.1:8000/p3m/dosen/pengabdian/create`

![Form Ajukan Proposal Pengabdian](screenshots/11_pengabdian_create.png)

### 8. Detail Proposal Pengabdian Direvisi

**Deskripsi**: Halaman ini merekam tampilan utama detail proposal pengabdian direvisi sebagai bagian dari alur proposal dosen p3m.

**Akun**: Portal Dosen - Siti Nurhaliza

**URL**: `http://127.0.0.1:8000/p3m/dosen/pengabdian/6`

![Detail Proposal Pengabdian Direvisi](screenshots/12_pengabdian_revisi_detail.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Menu Proposal Saya Penelitian | `http://127.0.0.1:8000/p3m/dosen/dashboard` | `missing-feature` | Menu sidebar "Proposal Saya" tidak memiliki route tujuan yang valid. | [Lihat](screenshots/err_01_penelitian_sidebar_menu.png) | High |
| 2 | Menu Ajukan Proposal Penelitian | `http://127.0.0.1:8000/p3m/dosen/dashboard` | `missing-feature` | Menu sidebar "Ajukan Proposal" tidak memiliki route tujuan yang valid. | [Lihat](screenshots/err_03_penelitian_sidebar_create.png) | High |
| 3 | Menu Proposal Saya Pengabdian | `http://127.0.0.1:8000/p3m/dosen/dashboard` | `missing-feature` | Menu sidebar "Proposal Saya" tidak memiliki route tujuan yang valid. | [Lihat](screenshots/err_08_pengabdian_sidebar_menu.png) | High |
| 4 | Menu Ajukan Proposal Pengabdian | `http://127.0.0.1:8000/p3m/dosen/dashboard` | `missing-feature` | Menu sidebar "Ajukan Proposal" tidak memiliki route tujuan yang valid. | [Lihat](screenshots/err_10_pengabdian_sidebar_create.png) | High |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder P3M yang aktif saat scan dijalankan.
