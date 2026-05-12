# Workflow Report: Logbook Skripsi

**Tanggal**: 2026-05-12
**Role**: mahasiswa (mhs1@sttw.ac.id)
**Modul**: siska
**Fitur**: mahasiswa-skripsi-logbooks
**Status**: ⚠️ Partial

## Deskripsi Workflow

Logbook Skripsi diblokir karena tidak eligible.

## Ringkasan

Halaman diakses sebagai mahasiswa pada delta scan pertengahan April 2026.

## Langkah-langkah

### 1. Buka halaman Logbook Skripsi

**Deskripsi**: Mahasiswa membuka halaman `/siska/skripsi/logbooks` melalui sidebar / navigasi bawaan SIAKAD.

**URL**: `http://127.0.0.1:8000/siska/skripsi/logbooks`

![Halaman Logbook Skripsi](screenshots/01_index.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| 1 | Logbook Skripsi | /siska/skripsi/logbooks | permission | Mahasiswa mhs1 tidak memiliki mata kuliah terkait di KRS aktif sehingga middleware siska.eligible me-redirect ke dashboard | ![](screenshots/01_index.png) | Low |

## Catatan

- Diambil otomatis pada batch scan delta pertengahan April 2026.
- Full-page screenshot.
