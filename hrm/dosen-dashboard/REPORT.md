# Workflow Report: Dashboard Portal Dosen HRM

**Tanggal**: 2026-04-18  
**Role**: Dosen  
**Modul**: HRM > Portal Saya  
**Fitur**: Dashboard Portal Dosen HRM  
**Status**: ✅ Berhasil

## Deskripsi Workflow

Ringkasan jadwal aktif, status laporan, dan menu cepat dosen.

## Ringkasan

Semua 1 langkah pada scan ini lolos tanpa error maupun warning.

## Langkah-langkah

### 1. Dashboard Kinerja

**Deskripsi**: Halaman dashboard untuk ringkasan jadwal aktif, status laporan, dan menu cepat dosen. Screenshot diambil setelah halaman selesai dimuat penuh.

**Akun**: Portal Dosen

**URL**: `http://127.0.0.1:8000/hrm/portal`

![Dashboard Kinerja](screenshots/01_dashboard.png)

## Temuan & Masalah

Tidak ada temuan kritis maupun warning pada scan ini.

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder HRM yang aktif saat scan dijalankan.
