# Workflow Report: Input Kinerja Pelayanan Tendik

**Tanggal**: 2026-04-02
**Role**: Tendik (Ahmad Syaiful, S.Sos / ahmad.syaiful@sttw.ac.id)
**Modul**: HRM — Pelayanan Tendik
**Status**: ✅ Berhasil

## Ringkasan

Workflow input kinerja pelayanan oleh tendik, termasuk:

- Melihat daftar pelayanan yang sudah diinput
- Mengisi form deskripsi pelayanan yang dilakukan
- Skenario periode ditutup

## Langkah-langkah

### 1. Halaman Index Pelayanan

Tendik membuka halaman Pelayanan. Terlihat daftar pelayanan yang sudah diinput dalam card layout dengan deskripsi pelayanan dan tombol aksi.

![Halaman Index Pelayanan](screenshots/01_pelayanan-index.png)

### 2. Form Tambah Pelayanan (Periode Buka)

Tendik mengklik tombol tambah. Form berisi field textarea untuk deskripsi pelayanan yang telah dilakukan.

![Form Tambah Pelayanan (Periode Buka)](screenshots/02_pelayanan-create.png)

### 3. Form Tambah Pelayanan (Periode Tutup)

Ketika periode pengisian ditutup, form menampilkan halaman 403 "Periode pengisian sudah tutup."

![Form Tambah Pelayanan (Periode Tutup)](screenshots/02_pelayanan-create-closed.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
| --- | --- | --- |
| Daftar pelayanan | ✅ | Card layout data pelayanan tendik |
| Tambah pelayanan | ✅ | Form textarea deskripsi pelayanan |
| Periode tutup | ✅ | Form tidak bisa diakses saat periode ditutup |

## Catatan

- Pelayanan adalah deskripsi aktivitas pelayanan yang dilakukan tendik
- Contoh: pelayanan administrasi mahasiswa, koordinasi wisuda, dll
- Data masuk ke penilaian kinerja tendik
