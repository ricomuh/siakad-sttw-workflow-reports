# Workflow Report: Input Kinerja Bimbingan Dosen

**Tanggal**: 2026-04-01
**Role**: Dosen (Budi Santoso / budi.santoso@sttw.ac.id)
**Modul**: HRM — Bimbingan Mahasiswa
**Status**: ✅ Berhasil

## Ringkasan

Workflow input kinerja bimbingan mahasiswa oleh dosen, termasuk:
- Melihat daftar bimbingan yang sudah diinput
- Mengisi form tambah bimbingan baru (jenis, mahasiswa, topik, tanggal)

## Langkah-langkah

### 1. Halaman Index Bimbingan

Dosen membuka halaman Bimbingan. Terlihat daftar bimbingan yang sudah diinput dalam tabel dengan kolom jenis, mahasiswa, topik, tanggal, dan aksi. Tombol "+ Tambah Bimbingan" tersedia di kanan atas.

![Daftar bimbingan dosen](screenshots/01_bimbingan-index.png)

### 2. Form Tambah Bimbingan

Dosen mengklik tombol tambah. Form berisi field: Jenis Bimbingan (PKL/TA/Skripsi/KKN/Lainnya), Nama Mahasiswa, Topik/Judul, Tanggal Bimbingan, dan Keterangan. Semua field wajib diisi kecuali keterangan.

![Form tambah bimbingan baru](screenshots/02_bimbingan-create.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Daftar bimbingan | ✅ | Tabel dengan data bimbingan yang sudah diinput |
| Tambah bimbingan | ✅ | Form input dengan jenis, mahasiswa, topik, tanggal |
| Jenis bimbingan | ✅ | Dropdown: PKL, TA, Skripsi, KKN, Lainnya |
| Validasi form | ✅ | Field wajib ditandai asterisk merah |

## Catatan

- Bimbingan adalah catatan mandiri dosen, bukan data dari SISKA
- Jenis bimbingan: PKL, TA, Skripsi, KKN, Lainnya (sesuai enum DB)
- Data bimbingan masuk ke penilaian kinerja dosen
