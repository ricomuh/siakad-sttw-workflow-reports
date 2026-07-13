# Workflow Report: Skala Nilai Huruf Dinamis per Jenis MK (Waket 1)

**Tanggal**: 2026-07-13
**Role**: waket1
**Modul**: siakad
**Fitur**: waket1-skala-huruf-jenis
**Status**: ✅ Berhasil
**PR**: #526 — feat: SIAKAD Batch 1 Gaps

## Deskripsi Workflow

Fitur baru (GAP 5): Skala nilai huruf kini dapat dikonfigurasi per jenis mata kuliah (reguler, PKL, KKN, skripsi, TA, dll). Transkrip mahasiswa menggunakan skala huruf sesuai jenis MK. Fallback ke skala global (jenis=null) jika tidak ada skala khusus.

## Ringkasan

- Tambah field `jenis` (nullable) pada tabel `skala_nilai`.
- Index skala huruf menampilkan kolom jenis MK.
- Form create/edit: pilih jenis MK (opsional).
- Transkrip: lookup skala per jenis MK → fallback global.
- Backward compatible: data existing (jenis=null) tetap berfungsi sebagai default.
- Unit tests: 13/13 pass. E2E tests: 2/2 pass.

## Langkah-langkah

### 1. Buka halaman index skala huruf

**URL**: `/siakad/skala-huruf`

Tabel skala huruf dengan kolom jenis MK (kosong = global/default).

### 2. Buat skala per jenis MK

**URL**: `/siakad/skala-huruf/create`

Form: pilih jenis MK dari dropdown (opsional).

### 3. Verifikasi di transkrip

**URL**: `/siakad/transkrip`

Nilai huruf menggunakan skala sesuai jenis MK. Jenis tanpa skala khusus → fallback global.

## Temuan & Masalah

Tidak ada temuan. Extend existing, backward compatible.

## Catatan

- Bagian dari SIAKAD Batch 1 Gaps (PR #526).
- Extend `admin-skala-huruf` dengan dimensi jenis MK.
