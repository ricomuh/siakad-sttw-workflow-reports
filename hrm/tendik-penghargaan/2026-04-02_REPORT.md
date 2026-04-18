# Workflow Report: Input Kinerja Penghargaan Tendik

**Tanggal**: 2026-04-02
**Role**: Tendik (Ahmad Syaiful, S.Sos / ahmad.syaiful@sttw.ac.id)
**Modul**: HRM — Penghargaan
**Status**: ✅ Berhasil

## Ringkasan

Workflow input data penghargaan oleh tendik, termasuk:

- Melihat daftar penghargaan
- Mengisi form tambah penghargaan baru
- Skenario periode ditutup

## Langkah-langkah

### 1. Halaman Index Penghargaan

Tendik membuka halaman Penghargaan. Terlihat daftar penghargaan dalam tabel.

![Halaman Index Penghargaan](screenshots/01_penghargaan-index.png)

### 2. Form Tambah Penghargaan (Periode Buka)

Tendik mengklik tombol tambah. Form berisi field: Nama Penghargaan, Tingkat, Pemberi, Tahun, dan Keterangan.

![Form Tambah Penghargaan (Periode Buka)](screenshots/02_penghargaan-create.png)

### 3. Form Tambah Penghargaan (Periode Tutup)

Ketika periode pengisian ditutup, form menampilkan halaman 403 "Periode pengisian sudah tutup."

![Form Tambah Penghargaan (Periode Tutup)](screenshots/02_penghargaan-create-closed.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
| --- | --- | --- |
| Daftar penghargaan | ✅ | Tabel data penghargaan tendik |
| Tambah penghargaan | ✅ | Form input nama, tingkat, pemberi, tahun |
| Periode tutup | ✅ | Form tidak bisa diakses saat periode ditutup |

## Catatan

- Penghargaan tendik pola sama dengan dosen
- Tingkat: Institusi, Regional, Nasional, Internasional
