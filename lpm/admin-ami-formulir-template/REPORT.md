# Workflow Report: Template Formulir AMI

**Tanggal**: 2026-04-18  
**Role**: Admin LPM  
**Modul**: LPM > AMI  
**Fitur**: Template Formulir AMI  
**Status**: ✅ Berhasil

## Ringkasan

Mengelola template formulir audit yang digunakan oleh auditor internal saat melakukan AMI.

Semua 8 langkah pada scan ini lolos tanpa error.

## Langkah-langkah

### 1. Daftar Template Formulir

Tabel template formulir AMI dengan status aktif/nonaktif.

![Daftar Template Formulir](screenshots/01_index.png)

### 2. Form Tambah Template (Kosong)

Form pembuatan template formulir baru dengan item standar yang diperiksa.

![Form Tambah Template (Kosong)](screenshots/02_create-form.png)

### 3. Form Tambah Template (Terisi)

Form terisi data template audit standar pendidikan.

![Form Tambah Template (Terisi)](screenshots/03_create-filled.png)

### 4. Template Berhasil Ditambahkan

Redirect ke index setelah submit.

![Template Berhasil Ditambahkan](screenshots/04_create-success.png)

### 5. Detail Template

Detail template menampilkan daftar item standar yang diperiksa.

![Detail Template](screenshots/05_show.png)

### 6. Form Edit Template

Form edit template dengan item yang bisa ditambah/hapus.

![Form Edit Template](screenshots/06_edit-form.png)

### 7. Form Edit (Dimodifikasi)

Nama template diperbarui.

![Form Edit (Dimodifikasi)](screenshots/07_edit-modified.png)

### 8. Template Berhasil Diperbarui

Redirect dengan notifikasi sukses.

![Template Berhasil Diperbarui](screenshots/08_edit-success.png)

## Temuan & Masalah

Tidak ada temuan kritis pada scan ini.

## Catatan

- Screenshot diambil secara otomatis menggunakan Playwright.
- Data yang ditampilkan berasal dari data dummy/seeder yang tersedia pada saat scan.
- Status report mengikuti hasil scan aktual; langkah yang gagal tidak lagi ditandai sebagai sukses.
