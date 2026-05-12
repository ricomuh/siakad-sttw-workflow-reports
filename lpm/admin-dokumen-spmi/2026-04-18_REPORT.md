# Workflow Report: Dokumen SPMI

**Tanggal**: 2026-04-18  
**Role**: Admin LPM  
**Modul**: LPM > Penetapan  
**Fitur**: Dokumen SPMI  
**Status**: ✅ Berhasil

## Ringkasan

Mengelola arsip dokumen SPMI seperti manual mutu, standar operasional prosedur, dan pedoman.

Semua 8 langkah pada scan ini lolos tanpa error.

## Langkah-langkah

### 1. Daftar Dokumen SPMI

Tabel dokumen SPMI dengan nomor urut, nama arsip, dan status.

![Daftar Dokumen SPMI](screenshots/01_index.png)

### 2. Form Tambah Dokumen (Kosong)

Form pembuatan dokumen SPMI baru.

![Form Tambah Dokumen (Kosong)](screenshots/02_create-form.png)

### 3. Form Tambah Dokumen (Terisi)

Form terisi data manual mutu.

![Form Tambah Dokumen (Terisi)](screenshots/03_create-filled.png)

### 4. Dokumen Berhasil Ditambahkan

Redirect ke index setelah submit.

![Dokumen Berhasil Ditambahkan](screenshots/04_create-success.png)

### 5. Form Edit Dokumen

Form edit dokumen (fitur ini tidak memiliki halaman show terpisah).

![Form Edit Dokumen](screenshots/06_edit-form.png)

### 6. Form Edit (Dimodifikasi)

Data dokumen telah diubah.

![Form Edit (Dimodifikasi)](screenshots/07_edit-modified.png)

### 7. Dokumen Berhasil Diperbarui

Redirect dengan notifikasi sukses.

![Dokumen Berhasil Diperbarui](screenshots/08_edit-success.png)

## Temuan & Masalah

Tidak ada temuan kritis pada scan ini.

## Catatan

- Screenshot diambil secara otomatis menggunakan Playwright.
- Data yang ditampilkan berasal dari data dummy/seeder yang tersedia pada saat scan.
- Status report mengikuti hasil scan aktual; langkah yang gagal tidak lagi ditandai sebagai sukses.
