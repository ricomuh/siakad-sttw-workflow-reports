# Workflow Report: Overview Modul SIAKAD

**Tanggal**: 2026-04-19
**Role**: Administrator (admin@sttw.ac.id)
**Modul**: SIAKAD
**Fitur**: Overview Modul
**Status**: ✅ Berhasil

## Deskripsi Workflow

Dokumentasi ini merekam entry point utama modul SIAKAD dari perspektif administrator. Alur dimulai dari halaman login, dilanjutkan dengan membuka grup sidebar `SIAKAD`, lalu masuk ke halaman `Monitoring KRS` sebagai representasi overview operasional akademik yang menampilkan statistik, filter, dan daftar status pengisian KRS.

## Ringkasan

Overview modul SIAKAD berhasil diakses dengan alur navigasi standar melalui sidebar. Struktur menu SIAKAD tampil lengkap, dan halaman Monitoring KRS menampilkan data dummy yang cukup kaya untuk menggambarkan kondisi akademik semester aktif.

## Langkah-langkah

### 1. Halaman Login

**Deskripsi**: Halaman login menampilkan form autentikasi dengan field `NIM/NIP/Email`, `Password`, opsi `Ingat Saya`, dan tombol `Masuk`. Langkah ini menjadi titik masuk administrator sebelum mengakses modul SIAKAD.

**URL**: `http://localhost:8000/login`

![Halaman Login](screenshots/01_login-page.png)

### 2. Sidebar SIAKAD Dibuka

**Deskripsi**: Setelah login, administrator membuka grup sidebar `SIAKAD`. Di dalamnya terlihat struktur navigasi utama seperti `Master Data`, `Manajemen Akademik`, `Perkuliahan`, `Manajemen KRS & Nilai`, `Pengaturan Nilai`, `Tagihan Mahasiswa`, dan `Pelaporan PDDikti`.

**URL**: `http://localhost:8000/dashboard`

![Sidebar SIAKAD](screenshots/02_sidebar-siakad.png)

### 3. Monitoring KRS

**Deskripsi**: Halaman `Monitoring KRS` menampilkan ringkasan status pengisian KRS semester aktif, statistik agregat seperti total KRS, disetujui, menunggu, ditolak, dan belum KRS, serta tabel monitoring mahasiswa lengkap dengan filter pencarian, program studi, angkatan, dosen PA, dan status KRS.

**URL**: `http://localhost:8000/siakad/monitoring-krs`

![Monitoring KRS](screenshots/03_monitoring-krs.png)

## Temuan & Masalah

Tidak ada temuan kritis pada overview modul SIAKAD ini.

## Catatan

- Report ini menggunakan akun administrator lintas modul.
- Halaman `Monitoring KRS` dipilih sebagai overview karena paling representatif untuk menggambarkan aktivitas inti modul akademik pada data yang tersedia.
- Sidebar SIAKAD dapat digunakan sebagai jalur navigasi normal tanpa perlu URL langsung.
