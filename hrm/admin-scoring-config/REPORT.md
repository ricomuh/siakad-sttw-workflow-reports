# Workflow Report: Konfigurasi Scoring HRM

**Tanggal**: 2026-04-18  
**Role**: Waket2 / Admin HRM  
**Modul**: HRM > Admin HRM  
**Fitur**: Konfigurasi Scoring HRM  
**Status**: ✅ Berhasil

## Deskripsi Workflow

Pengaturan bobot penilaian untuk dosen dan tendik.

## Ringkasan

Semua 1 langkah pada scan ini lolos tanpa error maupun warning.

## Langkah-langkah

### 1. Konfigurasi Scoring

**Deskripsi**: Pengaturan bobot penilaian untuk dosen dan tendik. Langkah ini difokuskan pada tampilan konfigurasi scoring.

**Akun**: Waket2 / Admin HRM

**URL**: `http://127.0.0.1:8000/hrm/admin/scoring-config`

![Konfigurasi Scoring](screenshots/01_index.png)

## Temuan & Masalah

Tidak ada temuan kritis maupun warning pada scan ini.

## Catatan

- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.
- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.
- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.
- Data yang tampil mengikuti seeder HRM yang aktif saat scan dijalankan.
