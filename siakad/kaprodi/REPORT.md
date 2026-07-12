# Workflow Report: Kaprodi — All Modules

**Tanggal**: 2026-07-12
**Role**: Kaprodi (Kepala Program Studi)
**Scope**: 15 halaman — Dashboard, E-Learning, Blended, SISKA, LPM, Kerjasama, CDC
**Status**: ✅ All Clean

## Deskripsi

E2E workflow report seluruh halaman yang dapat diakses oleh Kaprodi. Mencakup 15 halaman dari 7 modul berbeda.

## Commit Summary

| Commit | Type | Deskripsi |
|--------|------|-----------|
| `XXXXXXX` | fix | Route middleware: tambah permission kaprodi ke dashboard-chart, TA proposals, Skripsi proposals |

## Screenshots

### Dashboard & E-Learning
![Dashboard](screenshots/01_dashboard.png)
*Dashboard Kaprodi — statistik mahasiswa, dosen, KRS, PKL, KKN, kalender.*

![Persetujuan Remidi](screenshots/02_kaprodi_remidi.png)
*E-Learning: Persetujuan Remidi — list permohonan remidi dari mahasiswa.*

![Statistik Kuesioner](screenshots/03_kaprodi_statistik_kuesioner.png)
*E-Learning: Statistik Kuesioner — hasil evaluasi kinerja dosen per prodi.*

![Data Mahasiswa](screenshots/04_kaprodi_mahasiswa.png)
*E-Learning: Data Mahasiswa — list mahasiswa per prodi.*

![Data Dosen](screenshots/05_kaprodi_dosen.png)
*E-Learning: Data Dosen — list dosen per prodi.*

### Blended
![Periode Blended](screenshots/06_kaprodi_blended.png)
*Blended: Periode Blended — manajemen periode magang.*

### SISKA
![Monitoring Rekap](screenshots/07_siska_monitoring_rekap.png)
*SISKA: Monitoring Rekap Lintas Modul — rekap PKL, KKN, TA, Skripsi per prodi.*

![Dashboard Chart](screenshots/08_siska_dashboard_chart.png)
*SISKA: Dashboard Chart — grafik KRS, progress modul, wisuda, distribusi IPK.*

![TA Proposals](screenshots/09_siska_ta_proposals.png)
*SISKA: TA Validasi Proposal — approve/revisi/tolak proposal TA.*

![Skripsi Proposals](screenshots/10_siska_skripsi_proposals.png)
*SISKA: Skripsi Validasi Proposal — approve/revisi/tolak proposal Skripsi.*

### LPM
![LPM Dashboard](screenshots/11_lpm_kaprodi_dashboard.png)
*LPM: Dashboard Kaprodi — AMI aktif, standar, temuan prodi.*

![Standar Prodi](screenshots/12_lpm_kaprodi_standar.png)
*LPM: Standar Prodi — daftar standar SPMI.*

![Temuan Prodi](screenshots/13_lpm_kaprodi_temuan.png)
*LPM: Temuan Prodi — daftar temuan audit.*

### Kerjasama & CDC
![Kerjasama Dashboard](screenshots/14_kerjasama_dashboard.png)
*Kerjasama: Dashboard — surat kerjasama, MoU per prodi.*

![CDC Dashboard](screenshots/15_cdc_dashboard.png)
*CDC: Dashboard — tracer study, alumni per prodi.*

## Fitur Checklist

| Modul | Halaman | Status |
|-------|---------|--------|
| Dashboard | Dashboard | ✅ |
| E-Learning | Persetujuan Remidi | ✅ |
| E-Learning | Statistik Kuesioner | ✅ |
| E-Learning | Data Mahasiswa | ✅ |
| E-Learning | Data Dosen | ✅ |
| Blended | Periode Blended | ✅ |
| SISKA | Monitoring Rekap | ✅ |
| SISKA | Dashboard Chart | ✅ (fixed) |
| SISKA | TA Validasi Proposal | ✅ (fixed) |
| SISKA | Skripsi Validasi Proposal | ✅ (fixed) |
| LPM | Dashboard Kaprodi | ✅ |
| LPM | Standar Prodi | ✅ |
| LPM | Temuan Prodi | ✅ |
| Kerjasama | Dashboard | ✅ |
| CDC | Dashboard | ✅ |

## Bug Ditemukan & Fix

### #1: Dashboard Chart → 403
**Root cause**: Route middleware `routes/siska.php:145` hanya mengizinkan `siska.monitoring.rekap|siska.dashboard.view`. Kaprodi hanya punya `siska.monitoring.rekap-prodi`.
**Fix**: Tambah `siska.monitoring.rekap-prodi` ke middleware.

### #2: TA Proposals → 403
**Root cause**: Route middleware `routes/siska.php:371` hanya `siska.ta.view|siska.ta.manage`. Comment bilang "Admin/Waket/Kaprodi/Dosen" tapi permission kaprodi (`siska.ta.kaprodi.manage`) ga di-include.
**Fix**: Tambah `siska.ta.kaprodi.manage` ke middleware.

### #3: Skripsi Proposals → 403
**Root cause**: Route middleware `routes/siska.php:488` sama persis pattern-nya — `siska.skripsi.view|siska.skripsi.manage` tanpa `siska.skripsi.kaprodi.manage`.
**Fix**: Tambah `siska.skripsi.kaprodi.manage` ke middleware.

## Catatan

- 15/15 halaman kaprodi accessible, tidak ada 500/403/404.
- Dashboard Chart menampilkan chart kosong (data 0) — expected karena filter D3 Teknik Mesin belum ada data.
- 3 permission bug ditemukan dan difix di route middleware (`routes/siska.php`).
- Fix hanya di route level — permission di seeder sudah benar.
- Kaprodi login: `kaprodi@sttw.ac.id` / `password` (D3 Teknik Mesin).
