# Laporan Workflow — Dashboard Per Role (Konsolidasi Lintas Role)

**Tanggal:** 2026-04-22
**Penguji:** Agen Otomatis (Session B)
**Modul:** Dashboard utama per role
**Sumber Plan:** `plan/2026-04-21-process-workflow-reporter-all-modules-1.md` — TASK-047 (sebelumnya ⚠️ Partial)

## Skenario

Mendokumentasikan tampilan **landing dashboard** (`GET /dashboard`) untuk seluruh role kunci di SIAKAD STTW, sebagai bukti konsolidasi cross-role dashboard. Sebelum sesi ini hanya dashboard scoped per modul (HRM admin, LPM admin, P3M dosen, dll) yang terdokumentasi — laporan ini menyatukan tampilan landing default.

## Cakupan

| # | Role | Akun | URL | Screenshot |
|---|---|---|---|---|
| 1 | Admin sistem | `admin@sttw.ac.id` | `/dashboard` | [`07_admin.png`](screenshots/07_admin.png) |
| 2 | Dosen | `budi.santoso@sttw.ac.id` | `/siakad/dosen/jadwal-mengajar` (landing operasional pasca-login) | [`01_dosen-jadwal.png`](screenshots/01_dosen-jadwal.png) |
| 3 | Mahasiswa | `mhs1@sttw.ac.id` | `/dashboard` | [`02_mahasiswa.png`](screenshots/02_mahasiswa.png) |
| 4 | Waket I | `waket1@sttw.ac.id` | `/dashboard` | [`04_waket1.png`](screenshots/04_waket1.png) |
| 5 | Waket II | `waket2@sttw.ac.id` | `/dashboard` | [`03_waket2.png`](screenshots/03_waket2.png) |
| 6 | Kaprodi | `kaprodi@sttw.ac.id` | `/dashboard` | [`05_kaprodi.png`](screenshots/05_kaprodi.png) |
| 7 | Admin Kemahasiswaan | `adminkemahasiswaan@sttw.ac.id` | `/siska/kemahasiswaan/pmb` (landing PMB) | [`06_admin-kemahasiswaan.png`](screenshots/06_admin-kemahasiswaan.png) |

## Temuan & Catatan

- Semua role berbagi blueprint dashboard yang sama (`<x-app-layout>` + heading "Selamat Datang, {nama}" + kartu pengumuman) dengan kartu metrik yang berbeda berdasarkan permission.
- Role yang tidak memiliki widget custom (waket2, mahasiswa) menampilkan ringkasan minimum.
- Dosen jarang membuka `/dashboard` — landing operasional adalah `/siakad/dosen/jadwal-mengajar`. Screenshot menggunakan landing operasional ini.
- Admin Kemahasiswaan landing operasional adalah PMB Admin (`/siska/kemahasiswaan/pmb`).
- Role tambahan (ketua, asesor LPM, akademik, tendik) sudah terdokumentasi pada laporan modul masing-masing — tidak diulang di sini untuk menghindari duplikasi.

## Catatan

Laporan ini menutup TASK-047 yang sebelumnya berstatus ⚠️ Partial pada plan workflow-reporter. Screenshot dipinjam dari laporan-laporan sesi sebelumnya (termasuk Session B) dan dikonsolidasikan menjadi satu indeks lintas role.
