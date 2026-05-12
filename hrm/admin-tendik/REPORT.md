# Workflow Report: HRM Admin Daftar Tendik

**Tanggal**: 2026-05-12
**Role**: akademik (akademik@sttw.ac.id)
**Modul**: hrm
**Fitur**: admin-tendik
**Status**: ✅ Berhasil

## Deskripsi Workflow

Daftar tendik (tenaga kependidikan) di modul HRM.

## Ringkasan

Halaman diakses sebagai akademik (yang memegang permission HRM admin) pada delta scan pertengahan April 2026.

## Langkah-langkah

### 1. Buka halaman HRM Admin Daftar Tendik

**Deskripsi**: Akademik membuka halaman `/hrm/admin/tendik` melalui sidebar HRM Admin.

**URL**: `http://127.0.0.1:8000/hrm/admin/tendik`

![Halaman HRM Admin Daftar Tendik](screenshots/01_index.png)

## Temuan & Masalah

_Tidak ada temuan signifikan._

## Catatan

- Diambil otomatis pada batch scan delta pertengahan April 2026.
- Role `akademik` ternyata pemegang permission HRM admin (bukan `ketua` / `admin-lpm`); periksa apakah pembagian role ini sudah sesuai desain modul HRM.
