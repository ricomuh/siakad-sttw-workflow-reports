# Laporan Workflow — SISKA Monitoring per Role

**Tanggal:** 2026-04-22
**Penguji:** Agen Otomatis (Session B)
**Modul:** SISKA — Monitoring (perspektif Waket1, Waket2, Kaprodi)
**Akun Diuji:** `waket1@sttw.ac.id`, `waket2@sttw.ac.id`, `kaprodi@sttw.ac.id`
**Sumber Plan:** `plan/2026-04-21-process-workflow-reporter-all-modules-1.md` — TASK-024 (sebelumnya ⚠️ Partial)

## Skenario

Mendokumentasikan halaman monitoring SISKA yang dapat diakses oleh tiga role manajerial kunci selain admin: Waket I (akademik), Waket II (kemahasiswaan), dan Kaprodi. Sebelum sesi ini, hanya monitoring perspektif `admin-overview` yang terdokumentasi.

## Langkah Pengujian

### 1. Waket I — Dashboard utama

Login sebagai `waket1@sttw.ac.id`. Dashboard menampilkan data akademik institusi (jumlah mahasiswa aktif per prodi, statistik IP, status KRS).

![Dashboard Waket I](screenshots/01_waket1-dashboard.png)

### 2. Waket I — `siakad/monitoring`

`GET /siakad/monitoring` (controller `Waket1\MonitoringController`) menampilkan monitoring akademik global: distribusi nilai, kelas terjadwal, kehadiran dosen.

![Waket I — SIAKAD Monitoring](screenshots/02_waket1-siakad-monitoring.png)

### 3. Waket I — SISKA Dashboard

`GET /siska/dashboard` juga dapat diakses Waket I (controller `Waket2DashboardController` namun bukan permission-restricted) untuk melihat ringkasan SISKA lintas modul (PKL, KKN, TA, Skripsi, Wisuda).

![Waket I — SISKA Dashboard](screenshots/03_waket1-siska-dash.png)

### 4. Kaprodi — Dashboard utama

Login sebagai `kaprodi@sttw.ac.id`. Dashboard menampilkan data scope prodi (jumlah mahasiswa aktif, status TA/Skripsi, jadwal kuliah prodi).

![Dashboard Kaprodi](screenshots/04_kaprodi-dashboard.png)

### 5. Kaprodi — SISKA Dashboard

`GET /siska/dashboard` menampilkan ringkasan SISKA dari sisi Kaprodi (scope per prodi, jumlah pendaftar PKL/KKN/TA/Skripsi, status verifikasi kaprodi pada pipeline 5-stage).

![Kaprodi — SISKA Dashboard](screenshots/05_kaprodi-siska-dash.png)

### 6. Waket II — Monitoring HRM & SISKA

Sudah didokumentasikan terpisah pada `siakad/waket2-monitoring/REPORT.md` (TASK-015). Waket II memiliki akses ke `siska/dashboard`, `hrm/admin`, `hrm/laporan`.

## Fitur Yang Diuji

| Fitur | Endpoint | Waket1 | Waket2 | Kaprodi |
|---|---|---|---|---|
| SIAKAD Monitoring | `GET /siakad/monitoring` | ✅ | 🚫 403 | 🚫 403 |
| SISKA Dashboard | `GET /siska/dashboard` | ✅ | ✅ | ✅ |
| Monitoring KRS | `GET /siakad/monitoring-krs` | ✅ (lihat report waket1 sebelumnya) | 🚫 403 | 🚫 403 |
| KKN Monitoring | `GET /siska/kkn/monitoring` | ✅ (BAA scope) | 🚫 403 | 🚫 403 |

## Temuan & Masalah

**Finding F-2026-04-22-03 (Informational)** — Akses monitoring SISKA untuk role `kaprodi` saat ini hanya melalui `siska.dashboard` (tanpa filter scope prodi otomatis pada agregat teratas). Bila stakeholder ingin Kaprodi melihat monitoring detail (mis. monitoring KKN/TA per prodi) langsung dari sidebar, perlu route+permission baru atau pemberian permission `siska.monitoring.*` ke role kaprodi pada `RolePermissionSeeder`.

## Catatan

Sesi ini menutup TASK-024 yang sebelumnya berstatus ⚠️ Partial pada plan workflow-reporter, sekaligus mendokumentasikan finding F-2026-04-22-03.
