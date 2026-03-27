# Workflow Report: Manajemen Jadwal Kinerja (Admin HRM)

**Tanggal**: 2026-04-01
**Role**: Akademik (Akademik STTW / akademik@sttw.ac.id)
**Modul**: HRM — Admin > Jadwal Kinerja
**Status**: ✅ Berhasil

## Ringkasan

Workflow manajemen jadwal kinerja oleh admin HRM, termasuk:
- Melihat daftar jadwal kinerja per periode akademik
- Membuat jadwal kinerja baru dengan batas waktu pengisian dan penilaian

## Langkah-langkah

### 1. Halaman Index Jadwal Kinerja

Admin membuka halaman Jadwal Kinerja. Terlihat daftar jadwal per periode akademik dengan kolom: Nama, Periode Akademik, Periode Pengisian, Batas Penilaian, Status (Aktif/Non-aktif), dan Aksi (Edit/Hapus). Menu sidebar menampilkan: Dashboard Admin, Jadwal Kinerja, Manajemen Asesor, Data Dosen, Data Tendik, Impor Presensi.

![Daftar jadwal kinerja HRM](screenshots/01_jadwal-kinerja-index.png)

### 2. Form Tambah Jadwal Kinerja

Admin mengklik "+ Tambah Jadwal". Form berisi field: Nama jadwal, Periode Akademik (dropdown), Periode Pengisian (tanggal mulai-selesai), Batas Penilaian, dan Status pengisian (Dosen/Tendik toggle).

![Form tambah jadwal kinerja baru](screenshots/02_jadwal-kinerja-create.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Daftar jadwal kinerja | ✅ | Tabel dengan informasi lengkap per jadwal |
| Status jadwal | ✅ | Badge Aktif (Dosen/Tendik) atau Non-aktif |
| Tambah jadwal | ✅ | Form create dengan semua field yang diperlukan |
| Edit & Hapus | ✅ | Aksi tersedia per jadwal |
| Menu admin lengkap | ✅ | Sidebar: Dashboard, Jadwal, Asesor, Dosen, Tendik, Impor |

## Catatan

- Jadwal kinerja menentukan kapan dosen/tendik bisa mengisi data kinerja
- Status "Aktif" berarti sedang dalam periode pengisian
- Batas penilaian menentukan kapan asesor harus selesai menilai
- Hanya role akademik dan waket2 yang bisa mengelola jadwal
