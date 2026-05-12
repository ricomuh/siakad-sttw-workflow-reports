# Workflow Report: Upload LKD Dosen

**Tanggal**: 2026-05-12
**Role**: dosen
**Modul**: hrm
**Fitur**: dosen-lkd
**Status**: ✅ Berhasil

## Deskripsi Workflow

Upload LKD & poin tridharma per semester.

## Ringkasan

- HTTP 200, render OK setelah login sebagai `budi.santoso@sttw.ac.id` (role: dosen).
- Komponen Blade standar.
- Tidak ada error yang teridentifikasi pada area visible.

## Langkah-langkah

### 1. Login dosen & buka halaman

**Deskripsi**: Login sebagai dosen, navigasi ke halaman target.

**URL**: `http://127.0.0.1:8000/hrm/portal/laporan/lkd`

![Upload LKD Dosen](screenshots/01_lkd.png)

## Temuan & Masalah

Tidak ada temuan baru. Beberapa list dapat tampil kosong karena dosen demo belum punya data terkait.

## Catatan

- Bagian dari batch refresh delta pertengahan April 2026.
