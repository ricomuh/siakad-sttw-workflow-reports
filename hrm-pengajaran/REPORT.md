# Workflow Report: Data Pengajaran Dosen (Auto-Sync)

**Tanggal**: 2026-04-01
**Role**: Dosen (Budi Santoso / budi.santoso@sttw.ac.id)
**Modul**: HRM — Pengajaran
**Status**: ✅ Berhasil

## Ringkasan

Menampilkan data pengajaran dosen yang ter-sinkronisasi otomatis dari SIAKAD.
- Data mata kuliah yang diampu ditarik otomatis dari jadwal perkuliahan
- Dosen tidak perlu input manual — data read-only

## Langkah-langkah

### 1. Halaman Pengajaran (Auto-Sync)

Dosen membuka halaman Pengajaran. Data mata kuliah yang diampu ditampilkan otomatis dari SIAKAD. Dosen tidak perlu menginput data ini secara manual karena sudah tersinkronisasi dari jadwal perkuliahan.

![Data pengajaran dosen (auto-sync dari SIAKAD)](screenshots/01_pengajaran-index.png)

## Fitur yang Diuji

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Data pengajaran auto-sync | ✅ | Data ditarik dari jadwal SIAKAD |
| Tampilan read-only | ✅ | Dosen tidak bisa edit data pengajaran |
| Informasi mata kuliah | ✅ | Menampilkan MK yang diampu per periode |

## Catatan

- Data pengajaran di-sync otomatis dari modul SIAKAD (jadwal perkuliahan)
- Tidak ada tombol tambah/edit karena data bersifat read-only
- Berkontribusi otomatis ke skor kinerja dosen
