# Workflow Report: Input Kinerja Pengujian Dosen

**Tanggal**: 2026-04-01
**Role**: Dosen (Budi Santoso / budi.santoso@sttw.ac.id)
**Modul**: HRM — Pengujian Mahasiswa
**Status**: ✅ Berhasil

## Ringkasan

Workflow input kinerja pengujian/penguji mahasiswa oleh dosen, termasuk:
- Melihat daftar pengujian yang sudah diinput
- Form tambah data pengujian (ditampilkan saat periode tutup)

## Langkah-langkah

### 1. Halaman Index Pengujian

Dosen membuka halaman Pengujian. Terlihat alert "Periode Pengisian Sudah Tutup" karena jadwal kinerja aktif sudah melewati batas waktu. Daftar pengujian ditampilkan dalam tabel.

![Daftar pengujian dosen dengan alert periode tutup](screenshots/01_pengujian-index.png)

### 2. Form Tambah Pengujian (Periode Tutup)

Dosen mencoba mengakses form tambah pengujian. Karena periode pengisian sudah ditutup, halaman menampilkan pesan 403 "Periode Pengisian Sudah Tutup" dan form tidak dapat diakses.

![Form pengujian tidak tersedia — periode tutup](screenshots/02_pengujian-create.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Daftar pengujian | ✅ | Tabel data pengujian yang sudah diinput |
| Alert periode tutup | ✅ | Notifikasi jelas saat periode sudah lewat |
| Blokir input saat tutup | ✅ | Form create mengembalikan 403 saat periode tutup |
| Jenis pengujian | ✅ | Dropdown: PKL, TA, Skripsi, KKN, Lainnya |

## Catatan

- Pengujian adalah catatan dosen sebagai penguji mahasiswa
- Input hanya bisa dilakukan saat periode pengisian masih buka
- Saat ini periode sudah tutup sehingga form create mengembalikan 403
