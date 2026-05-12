# Workflow Report: Upload IKD Dosen

**Tanggal**: 2026-05-12
**Role**: dosen
**Modul**: hrm
**Fitur**: dosen-ikd
**Status**: ✅ Berhasil

## Deskripsi Workflow

Upload IKD (Indeks Kinerja Dosen) — TASK-041 LMS IKD CSV import + scoring fallback (#194).

## Ringkasan

- HTTP 200, render OK setelah login sebagai `budi.santoso@sttw.ac.id` (role: dosen).
- Komponen Blade standar.
- Tidak ada error yang teridentifikasi pada area visible.

## Langkah-langkah

### 1. Login dosen & buka halaman

**Deskripsi**: Login sebagai dosen, navigasi ke halaman target.

**URL**: `http://127.0.0.1:8000/hrm/portal/laporan/ikd`

![Upload IKD Dosen](screenshots/01_ikd.png)

## Temuan & Masalah

Tidak ada temuan baru. Beberapa list dapat tampil kosong karena dosen demo belum punya data terkait.

## Catatan

- Bagian dari batch refresh delta pertengahan April 2026.
