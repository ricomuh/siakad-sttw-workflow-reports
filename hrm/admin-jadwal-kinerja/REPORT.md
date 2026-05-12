# Workflow Report: HRM Admin Jadwal Kinerja

**Tanggal**: 2026-05-12
**Role**: akademik (akademik@sttw.ac.id)
**Modul**: hrm
**Fitur**: admin-jadwal-kinerja
**Status**: ✅ Berhasil

## Deskripsi Workflow

Pengaturan jadwal/periode penilaian kinerja.

## Ringkasan

Halaman diakses sebagai akademik (yang memegang permission HRM admin) pada delta scan pertengahan April 2026.

## Langkah-langkah

### 1. Buka halaman HRM Admin Jadwal Kinerja

**Deskripsi**: Akademik membuka halaman `/hrm/admin/jadwal-kinerja` melalui sidebar HRM Admin.

**URL**: `http://127.0.0.1:8000/hrm/admin/jadwal-kinerja`

![Halaman HRM Admin Jadwal Kinerja](screenshots/01_index.png)

## Temuan & Masalah

_Tidak ada temuan signifikan._

## Catatan

- Diambil otomatis pada batch scan delta pertengahan April 2026.
- Role `akademik` ternyata pemegang permission HRM admin (bukan `ketua` / `admin-lpm`); periksa apakah pembagian role ini sudah sesuai desain modul HRM.
