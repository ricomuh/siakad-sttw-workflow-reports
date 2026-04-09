# Workflow Report: LPM — Admin / Developer

**Tanggal**: 2026-04-12
**Role**: Admin LPM / Developer
**Modul**: LPM (Lembaga Penjaminan Mutu)
**Status**: ✅ Berhasil

## Ringkasan

Laporan ini mendokumentasikan seluruh halaman modul LPM yang dapat diakses oleh role Admin LPM / Developer. Mencakup dashboard, siklus PPEPP (Penetapan, Pelaksanaan, Evaluasi, Pengendalian, Peningkatan), manajemen AMI, bank dokumen, dan pengaturan sistem. Total 20 halaman berhasil diverifikasi.

## Langkah-langkah

### 1. Dashboard LPM
Dashboard utama menampilkan ringkasan statistik institusi (Mahasiswa 13, Dosen 8, Prodi 4, Pending Verifikasi 8), progress siklus PPEPP, overview AMI dalam grid 3 kolom (AMI Aktif 1, Temuan 9, kategori Mayor 3), tabel Jadwal AMI, tombol Aksi Cepat, serta statistik dokumen.
![Dashboard LPM dengan statistik dan overview AMI](screenshots/01_dashboard.png)

### 2. Daftar Kebijakan SPMI
Halaman daftar kebijakan SPMI menampilkan tabel dengan badge verifikasi, serta aksi CRUD (tambah, edit, hapus) untuk setiap kebijakan.
![Daftar kebijakan SPMI dengan badge verifikasi dan aksi CRUD](screenshots/02_kebijakan-index.png)

### 3. Standar Institusi
Daftar standar institusi dengan filter kategori meliputi Visi Misi, Tata Pamong, dan kategori lainnya.
![Standar institusi dengan filter kategori](screenshots/03_standar-institusi-index.png)

### 4. Standar Lain
Daftar standar lain yang dapat difilter berdasarkan kategori tertentu.
![Standar lain dengan filter kategori](screenshots/04_standar-lain-index.png)

### 5. Standar PT
Tabel standar PT yang dapat diedit langsung, menampilkan data jenjang, jumlah mahasiswa, beban, dan IPK.
![Standar PT dengan tabel editable](screenshots/05_standar-pt-index.png)

### 6. Dokumen SPMI
Halaman daftar dokumen SPMI yang tersimpan dalam sistem LPM.
![Daftar dokumen SPMI](screenshots/06_dokumen-spmi-index.png)

### 7. Formulir LPM
Daftar formulir LPM yang digunakan dalam proses penjaminan mutu.
![Daftar formulir LPM](screenshots/07_formulir-index.png)

### 8. SK Akreditasi
Daftar Surat Keputusan Akreditasi institusi dan program studi.
![Daftar SK Akreditasi](screenshots/08_sk-akreditasi-index.png)

### 9. SK Pendirian
Daftar Surat Keputusan Pendirian program studi.
![Daftar SK Pendirian](screenshots/09_sk-pendirian-index.png)

### 10. Profil Perguruan Tinggi
Halaman profil institusi menampilkan data lengkap STTW meliputi nama, alamat, status akreditasi, dan informasi kelembagaan lainnya.
![Profil PT dengan data institusi STTW](screenshots/10_profil-pt-index.png)

### 11. Data Program Studi
Daftar program studi yang diambil dari SIAKAD dalam mode read-only (tidak dapat diedit dari modul LPM).
![Data Prodi dari SIAKAD (read-only)](screenshots/11_prodi-index.png)

### 12. Pelaksanaan
Daftar kegiatan pelaksanaan dengan indikator status: Sudah, Belum, dan Proses.
![Daftar pelaksanaan dengan status kegiatan](screenshots/12_pelaksanaan-index.png)

### 13. Evaluasi
Daftar evaluasi dengan tab jenis evaluasi meliputi AMI, Lain, dan Lainnya untuk memudahkan navigasi.
![Daftar evaluasi dengan tab jenis](screenshots/13_evaluasi-index.png)

### 14. Pengendalian
Daftar pengendalian mutu dengan status RTM (Rapat Tinjauan Manajemen) dan RTL (Rencana Tindak Lanjut).
![Daftar pengendalian dengan status RTM/RTL](screenshots/14_pengendalian-index.png)

### 15. Peningkatan
Daftar kegiatan peningkatan mutu yang terhubung dengan kebijakan SPMI terkait.
![Daftar peningkatan terkait kebijakan](screenshots/15_peningkatan-index.png)

### 16. Jadwal AMI
Daftar jadwal Audit Mutu Internal dengan badge status Berlangsung dan Selesai.
![Jadwal AMI dengan badge status](screenshots/16_ami-jadwal-index.png)

### 17. Template Formulir AMI
Halaman manajemen template formulir yang digunakan dalam proses AMI.
![Template formulir AMI](screenshots/17_ami-formulir-template-index.png)

### 18. Temuan AMI
Overview temuan AMI dengan kategorisasi Mayor, Minor, dan Observasi.
![Temuan AMI dengan kategori Mayor/Minor/Observasi](screenshots/18_ami-temuan-index.png)

### 19. Bank Dokumen
Bank dokumen dengan tampilan grid/list, fitur pencarian, dan filter berdasarkan kategori.
![Bank dokumen dengan grid/list view dan pencarian](screenshots/19_dokumen-index.png)

### 20. Pengaturan LPM
Halaman pengaturan modul LPM meliputi checkbox visibilitas portal publik dan konfigurasi maksimal versi dokumen.
![Pengaturan LPM dengan opsi visibilitas portal](screenshots/20_setting-index.png)

## Catatan
- Seluruh 20 halaman modul LPM dapat diakses dengan baik oleh role Admin/Developer
- Siklus PPEPP (Penetapan, Pelaksanaan, Evaluasi, Pengendalian, Peningkatan) berfungsi secara lengkap
- Workflow AMI (Jadwal → Template Formulir → Temuan) berjalan dengan baik dari awal hingga akhir
- Dashboard menyajikan ringkasan statistik yang komprehensif untuk monitoring mutu institusi
- Bank dokumen mendukung tampilan grid dan list dengan fitur pencarian dan kategori
- Pengaturan portal memungkinkan admin mengontrol visibilitas konten ke publik
