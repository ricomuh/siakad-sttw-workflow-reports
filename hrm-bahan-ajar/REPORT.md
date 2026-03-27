# Workflow Report: Input Kinerja Bahan Ajar Dosen

**Tanggal**: 2026-04-01
**Role**: Dosen (Budi Santoso / budi.santoso@sttw.ac.id)
**Modul**: HRM — Bahan Ajar
**Status**: ✅ Berhasil

## Ringkasan

Workflow input kinerja pembuatan bahan ajar oleh dosen, termasuk:
- Melihat daftar bahan ajar yang sudah diinput
- Form tambah data bahan ajar (ditampilkan saat periode tutup)

## Langkah-langkah

### 1. Halaman Index Bahan Ajar

Dosen membuka halaman Bahan Ajar. Terlihat alert "Periode Pengisian Sudah Tutup". Daftar bahan ajar ditampilkan dalam tabel dengan kolom judul, jenis, mata kuliah, dan aksi.

![Daftar bahan ajar dosen](screenshots/01_bahan-ajar-index.png)

### 2. Form Tambah Bahan Ajar (Periode Tutup)

Dosen mencoba tambah bahan ajar. Halaman menampilkan 403 "Periode Pengisian Sudah Tutup" karena jadwal kinerja sudah lewat batas waktu.

![Form bahan ajar tidak tersedia — periode tutup](screenshots/02_bahan-ajar-create.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Daftar bahan ajar | ✅ | Tabel data bahan ajar yang sudah diinput |
| Alert periode tutup | ✅ | Notifikasi visual saat periode lewat |
| Blokir input saat tutup | ✅ | Create form mengembalikan 403 |
| Jenis bahan ajar | ✅ | Dropdown: Modul, Diktat, Buku Ajar, dll |

## Catatan

- Bahan ajar mencakup modul, diktat, buku ajar, dan materi perkuliahan
- Input hanya bisa dilakukan saat periode pengisian masih buka
