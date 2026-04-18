# Workflow Report: Input Kinerja Penunjang Dosen

**Tanggal**: 2026-04-02
**Role**: Dosen (Dr. Budi Santoso, M.Kom / budi.santoso@sttw.ac.id)
**Modul**: HRM — Kegiatan Penunjang
**Status**: ✅ Berhasil

## Ringkasan

Workflow input kinerja kegiatan penunjang oleh dosen, termasuk:

- Melihat daftar kegiatan penunjang yang sudah diinput
- Mengisi form tambah kegiatan penunjang baru
- Skenario periode ditutup

## Langkah-langkah

### 1. Halaman Index Penunjang

Dosen membuka halaman Penunjang. Terlihat daftar kegiatan penunjang dalam tabel dengan kolom nama kegiatan, jenis, tanggal, dan peran.

![Halaman Index Penunjang](screenshots/01_penunjang-index.png)

### 2. Form Tambah Penunjang (Periode Buka)

Dosen mengklik tombol tambah. Form berisi field: Nama Kegiatan, Jenis (Seminar/Workshop/dll), Tanggal, Peran, dan Keterangan.

![Form Tambah Penunjang (Periode Buka)](screenshots/02_penunjang-create.png)

### 3. Form Tambah Penunjang (Periode Tutup)

Ketika periode pengisian ditutup, form menampilkan halaman 403 "Periode pengisian sudah tutup."

![Form Tambah Penunjang (Periode Tutup)](screenshots/02_penunjang-create-closed.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
| --- | --- | --- |
| Daftar penunjang | ✅ | Tabel data kegiatan penunjang |
| Tambah penunjang | ✅ | Form input nama, jenis, tanggal, peran |
| Periode tutup | ✅ | Form tidak bisa diakses saat periode ditutup |

## Catatan

- Kegiatan penunjang mencakup seminar, workshop, pelatihan, dll
- Data masuk ke penilaian kinerja dosen
