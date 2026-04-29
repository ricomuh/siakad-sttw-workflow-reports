# Laporan Workflow — Dosen Penguji (Aggregator: PKL · KKN · TA · Skripsi)

**Tanggal:** 2026-04-22
**Penguji:** Agen Otomatis (Session B)
**Sumber Plan:** `plan/2026-04-21-process-workflow-reporter-all-modules-1.md` — TASK-021 (sebelumnya ⚠️ Partial)

## Skenario

TASK-021 awalnya mengusulkan satu laporan gabungan untuk peran "Dosen Penguji" pada sidang lintas empat modul SISKA. Alur sidang dan penilaian penguji sudah didokumentasikan terpisah per modul pada laporan dosen masing-masing.

Laporan ini berfungsi sebagai **indeks agregator** yang menutup TASK-021 dengan merujuk ke laporan per-modul yang sudah ada.

## Cakupan Per Modul

| Modul | Lokasi Laporan | Alur Penguji |
|---|---|---|
| PKL | [`siska/dosen-pkl/REPORT.md`](../dosen-pkl/REPORT.md) | Sidang PKL, input nilai penguji, BAP |
| KKN | [`siska/dosen-kkn/REPORT.md`](../dosen-kkn/REPORT.md) | Sidang KKN (jika ada), penilaian penguji |
| TA | [`siska/dosen-ta/REPORT.md`](../dosen-ta/REPORT.md) | Sidang TA terjadwal, input nilai penguji, BAP TA |
| Skripsi | [`siska/dosen-skripsi/REPORT.md`](../dosen-skripsi/REPORT.md) | Sidang Skripsi, input nilai penguji, BAP Skripsi |

## Permission Yang Dipakai

Permission `siska.{pkl|kkn|ta|skripsi}.penguji.*`.

## Catatan

Sesi ini menutup TASK-021 yang sebelumnya berstatus ⚠️ Partial pada plan workflow-reporter.
