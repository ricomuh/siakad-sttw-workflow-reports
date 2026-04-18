# Workflow Report: Data Presensi Clock In/Out Dosen

**Tanggal**: 2026-04-02
**Role**: Dosen (Dr. Budi Santoso, M.Kom / budi.santoso@sttw.ac.id)
**Modul**: HRM — Presensi CICO
**Status**: ✅ Berhasil

## Ringkasan

Halaman presensi Clock In/Clock Out dosen menampilkan rekapitulasi kehadiran.

- Data diimport oleh admin dari mesin fingerprint
- Menampilkan log harian clock in dan clock out

## Langkah-langkah

### 1. Halaman Presensi CICO

Dosen membuka halaman Presensi CICO. Terlihat tabel rekapitulasi presensi harian dengan kolom tanggal, jam masuk, jam keluar, dan status kehadiran.

![Halaman Presensi CICO](screenshots/01_presensi-cico-index.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
| --- | --- | --- |
| Rekap presensi | ✅ | Tabel log clock in/out harian |
| Read-only | ✅ | Data dari import admin, tidak bisa diedit dosen |

## Catatan

- Data bersumber dari import CSV mesin fingerprint
- Admin mengimport melalui menu Admin HRM > Import Presensi
- Dosen hanya bisa melihat, tidak bisa mengedit
