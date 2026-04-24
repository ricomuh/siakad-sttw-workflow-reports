# Workflow Report: Laporan LKPS (Excel)

**Tanggal**: 2026-04-24
**Role**: admin
**Modul**: kerjasama (SIMKERMA)
**Fitur**: Laporan — LKPS (Excel)
**Status**: ✅ Berhasil

## Deskripsi Workflow

Export Excel sesuai format **LKPS BAN-PT 4.b.1 — Kerja Sama Tridharma**. Halaman menyediakan form filter tahun + tingkat (Lokal/Nasional/Internasional) → tombol Download menghasilkan file `.xlsx` dengan kop institusi (`ExcelKopService`) dan tabel kerjasama yang dibatasi oleh filter.

Permission: `kerjasama.lkps.export`. Diakses via sidebar SIMKERMA → Laporan → LKPS (Excel).

## Ringkasan

Halaman form render normal dengan tombol export. Sidebar group **Laporan** ter-expand menampilkan 2 sub-item (LKPS Excel, LAPORKERMA PDF) — confirms group laporan **lengkap** (sebelumnya tidak di-cover di scan pertama).

## Langkah-langkah

### 1. Form Export LKPS

**Deskripsi**: Klik sidebar SIMKERMA → Laporan → LKPS (Excel). Halaman menampilkan form filter dengan field Tahun (dropdown), Tingkat (Lokal/Nasional/Internasional, multi-check atau dropdown). Tombol "Download Excel" akan men-trigger `LkpsKerjasamaExport` yang menulis kop di row 8 + judul row 9 (`ExcelKopService::applyKop` + `addTitle`) dan data mulai row 10+.

**URL**: `http://127.0.0.1:8000/kerjasama/laporan/lkps`

![Form export LKPS Excel](screenshots/01_form.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| - | - | - | - | Tidak ada — halaman render normal | - | - |

## Catatan

- File output: `LKPS-Kerjasama-{tahun}.xlsx`.
- Coverage tested oleh `LkpsKerjasamaExportTest` (assertions: header position, kop applied, kolom tingkat sesuai filter).
- Format LKPS mengikuti template BAN-PT 4.b.1, tidak boleh diubah tanpa konfirmasi LPM.
