# Workflow Report: Audit Menyeluruh Modul HRM

**Tanggal**: 2026-04-18  
**Role**: Multi Role  
**Modul**: HRM  
**Fitur**: Audit Menyeluruh Modul HRM  
**Status**: ⚠️ Partial

## Deskripsi Workflow

Ringkasan visual lintas role untuk seluruh modul HRM.

## Ringkasan

5 langkah berhasil, 0 langkah gagal, dan 2 temuan warning tercatat.

## Langkah-langkah

### 1. Admin HRM

**Deskripsi**: Ringkasan visual lintas role untuk seluruh modul HRM. Langkah ini difokuskan pada tampilan admin hrm.

**Akun**: Waket2 / Admin HRM

**URL**: `http://127.0.0.1:8000/hrm/admin`

![Admin HRM](screenshots/01_admin-dashboard.png)

### 2. Laporan SDM

**Deskripsi**: Halaman ini merekam tampilan utama laporan sdm sebagai bagian dari alur audit menyeluruh modul hrm.

**Akun**: Waket2 / Admin HRM

**URL**: `http://127.0.0.1:8000/hrm/laporan`

![Laporan SDM](screenshots/02_laporan-sdm.png)

### 3. Portal Asesor

**Deskripsi**: Ringkasan visual lintas role untuk seluruh modul HRM. Langkah ini difokuskan pada tampilan portal asesor.

**Akun**: Asesor

**URL**: `http://127.0.0.1:8000/hrm/asesor`

**Catatan langkah**: server-error: Landing default setelah login menuju http://127.0.0.1:8000/dashboard mengalami error, sehingga scan dilanjutkan dari /hrm/asesor.

![Portal Asesor](screenshots/03_asesor-dashboard.png)

### 4. Portal Dosen

**Deskripsi**: Ringkasan visual lintas role untuk seluruh modul HRM. Langkah ini difokuskan pada tampilan portal dosen.

**Akun**: Portal Dosen

**URL**: `http://127.0.0.1:8000/hrm/portal`

**Catatan langkah**: server-error: Landing default setelah login menuju http://127.0.0.1:8000/dashboard mengalami error, sehingga scan dilanjutkan dari /hrm/portal.

![Portal Dosen](screenshots/04_dosen-dashboard.png)

### 5. Portal Tendik

**Deskripsi**: Ringkasan visual lintas role untuk seluruh modul HRM. Langkah ini difokuskan pada tampilan portal tendik.

**Akun**: Portal Tendik

**URL**: `http://127.0.0.1:8000/hrm/tendik`

![Portal Tendik](screenshots/05_tendik-dashboard.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Portal Asesor | `http://127.0.0.1:8000/hrm/asesor` | `server-error` | Landing default setelah login menuju http://127.0.0.1:8000/dashboard mengalami error, sehingga scan dilanjutkan dari /hrm/asesor. | [Lihat](screenshots/03_asesor-dashboard.png) | Critical |
| 2 | Portal Dosen | `http://127.0.0.1:8000/hrm/portal` | `server-error` | Landing default setelah login menuju http://127.0.0.1:8000/dashboard mengalami error, sehingga scan dilanjutkan dari /hrm/portal. | [Lihat](screenshots/04_dosen-dashboard.png) | Critical |

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder HRM yang aktif saat scan dijalankan.
