# Workflow Report: Input Kinerja Tugas Tambahan Dosen

**Tanggal**: 2026-04-01
**Role**: Dosen (Budi Santoso / budi.santoso@sttw.ac.id)
**Modul**: HRM — Tugas Tambahan
**Status**: ✅ Berhasil

## Ringkasan

Workflow input tugas tambahan dosen (jabatan struktural, panitia, dll), termasuk:
- Melihat daftar tugas tambahan yang sudah diinput
- Form tambah tugas tambahan (ditampilkan saat periode tutup)

## Langkah-langkah

### 1. Halaman Index Tugas Tambahan

Dosen membuka halaman Tugas Tambahan. Terlihat alert periode tutup dan daftar tugas tambahan yang sudah diinput dalam tabel.

![Daftar tugas tambahan dosen](screenshots/01_tugas-tambahan-index.png)

### 2. Form Tambah Tugas Tambahan (Periode Tutup)

Dosen mencoba tambah tugas tambahan. Halaman menampilkan 403 karena periode sudah tutup.

![Form tugas tambahan tidak tersedia — periode tutup](screenshots/02_tugas-tambahan-create.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Daftar tugas tambahan | ✅ | Tabel data tugas yang sudah diinput |
| Alert periode tutup | ✅ | Notifikasi visual |
| Blokir input saat tutup | ✅ | Form mengembalikan 403 |

## Catatan

- Tugas tambahan mencakup jabatan struktural, kepanitiaan, dll
- Data ini berkontribusi ke skor kinerja dosen
