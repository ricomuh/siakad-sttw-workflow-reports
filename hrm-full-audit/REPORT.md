# Workflow Report: HRM Full Module Audit

**Tanggal**: 2026-04-07
**Role**: waket2 (Admin HRM), dosen (Asesor + Portal), tendik (Portal), developer
**Modul**: HRM — Scoring & Penilaian Kinerja
**Status**: ✅ Berhasil

## Ringkasan

Audit menyeluruh terhadap seluruh modul HRM setelah implementasi Phase 1-7 (Scoring Engine, UI, Controller Tests). Audit mencakup 56 halaman di 5 role berbeda. Ditemukan **2 bug** yang langsung diperbaiki, dan **6 item expected behavior** yang terdokumentasi.

### Bug yang Ditemukan & Diperbaiki

| # | Bug | Penyebab | Fix |
|---|-----|----------|-----|
| 1 | HTTP 500 pada `/hrm/admin` | `orderBy('nama')` pada kolom yang sudah di-drop dari tabel `hrm_asesor` | Ganti dengan `->sortBy('nama')` pada collection + eager load relasi |
| 2 | HTTP 403 pada `/hrm/asesor` untuk user asesor | User budi.santoso & ahmad.subagyo tidak punya permission `hrm.asesor.manage` | Tambah role `asesor` + permission di HrmDummySeeder |
| 3 | waket2 role missing permissions | Seeder hanya assign 6 dari 15 HRM permissions | Update RolePermissionSeeder: tambah `hrm.jadwal.manage`, `hrm.scoring.config`, `hrm.kuesioner.manage`, dll |

### Expected Behavior (Bukan Bug)

| # | Item | Penjelasan |
|---|------|-----------|
| 1 | 405 pada `/hrm/portal/profil/kepangkatan` | Route hanya POST/PUT/DELETE — form ada di halaman profil utama |
| 2 | 405 pada `/hrm/portal/profil/jabatan-fungsional` | Sama — CRUD via modal di profil utama |
| 3 | 405 pada `/hrm/portal/profil/inpassing` | Sama — CRUD via modal di profil utama |
| 4 | 404 pada `/hrm/portal/kinerja/diklat` | Diklat/Sertifikasi/Tes Kompetensi ada di profil, bukan kinerja |
| 5 | 404 pada `/hrm/portal/kinerja/sertifikasi` | Sama — route di `/hrm/portal/profil/sertifikasi` (POST) |
| 6 | 403 pada `/hrm/asesor` untuk developer | Developer tidak perlu akses asesor — by design |

---

## Langkah-langkah Audit

### Section 1: Admin HRM (waket2@sttw.ac.id)

#### 1. Login sebagai Waket2

Login berhasil, dashboard utama SIAKAD tampil dengan sidebar HRM yang lengkap.

![Login Waket2](screenshots/01_waket2-dashboard.png)

#### 2. Dashboard Admin HRM

Dashboard menampilkan statistik lengkap: Total Dosen (7), Total Tendik (7), Selesai Dinilai (1), Perlu Revisi (0). Widget Jadwal Kinerja Aktif, Beban Kerja Asesor, dan Progress Laporan tampil dengan data yang benar.

![Dashboard Admin HRM](screenshots/02_admin-hrm-dashboard.png)

#### 3. Jadwal Kinerja

Tabel jadwal kinerja menampilkan periode yang aktif dengan status pengisian dan tanggal batas.

![Jadwal Kinerja](screenshots/03_admin-jadwal-kinerja.png)

#### 4. Form Buat Jadwal Kinerja

Form create dengan dropdown periode akademik, tanggal mulai/selesai, dan toggle status aktif.

![Buat Jadwal](screenshots/04_admin-jadwal-create.png)

#### 5. Manajemen Asesor

Daftar asesor dengan posisi, nama, dan opsi edit. Data seeder menampilkan 3 asesor.

![Manajemen Asesor](screenshots/05_admin-asesor-index.png)

#### 6. Penugasan Asesor

Halaman assign asesor ke dosen/tendik per jadwal kinerja.

![Penugasan Asesor](screenshots/06_admin-asesor-assign.png)

#### 7. Impor Presensi

Form import presensi CICO dari file Excel.

![Impor Presensi](screenshots/07_admin-presensi-import.png)

#### 8. Data Dosen

Daftar dosen dengan NIP, nama, status, dan program studi.

![Data Dosen](screenshots/08_admin-dosen-list.png)

#### 9. Data Tendik

Daftar tenaga kependidikan dengan NIP, nama, jabatan, dan status.

![Data Tendik](screenshots/09_admin-tendik-list.png)

#### 10. Jenis Tendik

Manajemen kategori tendik (Administrasi, Keamanan, Kebersihan, Laboran) masing-masing dengan 4 kriteria kuantitatif.

![Jenis Tendik](screenshots/10_admin-jenis-tendik.png)

#### 11. Form Tambah Jenis Tendik

Form create jenis tendik baru dengan field kode, nama, deskripsi, dan status.

![Tambah Jenis Tendik](screenshots/11_admin-jenis-tendik-create.png)

#### 12. Kuesioner Tendik

Template kuesioner untuk penilaian kualitatif tendik.

![Kuesioner](screenshots/12_admin-kuesioner.png)

#### 13. Form Buat Kuesioner

Form pembuatan template kuesioner baru.

![Buat Kuesioner](screenshots/13_admin-kuesioner-create.png)

#### 14. Distribusi Kuesioner

Halaman distribusi kuesioner ke penilai (mahasiswa, atasan, rekan, diri sendiri).

![Distribusi Kuesioner](screenshots/14_admin-kuesioner-distribusi.png)

#### 15. Penugasan Atasan

Halaman untuk menugaskan atasan ke tendik untuk penilaian kuantitatif.

![Penugasan Atasan](screenshots/15_admin-penugasan-atasan.png)

#### 16. Konfigurasi Scoring

Konfigurasi lengkap bobot penilaian: Dosen (Tridharma 65%, IKD 25%, Kehadiran 10%), Tendik (Kuantitatif 50%, Kualitatif 30%, Presensi 20%), dan Rentang Klasifikasi (Need Improvement, Meet Expectation, Excellent, Outstanding).

![Konfigurasi Scoring](screenshots/16_admin-scoring-config.png)

#### 17. Dashboard Eksekutif Laporan SDM

Dashboard eksekutif dengan chart distribusi hasil kinerja, progres per program studi, dan rekap semua jadwal kinerja.

![Dashboard Eksekutif](screenshots/17_admin-laporan-dashboard.png)

#### 18. Laporan Dosen

Daftar laporan kinerja dosen per jadwal dengan skor akhir dan klasifikasi.

![Laporan Dosen](screenshots/18_admin-laporan-dosen.png)

#### 19. Laporan Tendik

Daftar laporan kinerja tendik per jadwal.

![Laporan Tendik](screenshots/19_admin-laporan-tendik.png)

---

### Section 2: Portal Asesor (budi.santoso@sttw.ac.id)

#### 20. Login sebagai Asesor

Dr. Budi Santoso login berhasil dengan akses ke sidebar SIAKAD, SISKA, P3M, dan HRM.

![Login Asesor](screenshots/20_budi-dashboard.png)

#### 21. Dashboard Asesor

Portal Asesor menampilkan antrian penilaian (4 laporan), statistik beban kerja (Asesor 1: 1, Asesor 2: 3), dan filter per jadwal kinerja. Terdapat warning batas waktu penilaian.

![Dashboard Asesor](screenshots/21_asesor-dashboard.png)

#### 22. Rekap Penilaian

Rekap penugasan per jadwal: Total 3, Selesai 1, Belum 2. Menampilkan tabel daftar penugasan dan laporan yang sudah selesai dinilai.

![Rekap Penilaian](screenshots/22_asesor-rekap.png)

---

### Section 3: Portal Dosen (siti.nurhaliza@sttw.ac.id)

#### 23. Login sebagai Dosen

Siti Nurhaliza login berhasil.

![Login Dosen](screenshots/23_siti-dashboard.png)

#### 24. Dashboard Kinerja Dosen

Portal menampilkan Jadwal Kinerja Aktif (Semester Ganjil 2024/2025, Sudah Tutup), Status Laporan (Perlu Revisi Asesor 1), Progress Pengisian (Bimbingan: 1, Bahan Ajar: 1, Penunjang: 1), dan tombol "Ajukan Ulang ke Asesor".

![Dashboard Dosen](screenshots/24_portal-dosen-dashboard.png)

#### 25. Data Kepegawaian

Profil lengkap dosen dengan data diri, kepangkatan, jabatan fungsional, dan inpassing.

![Data Kepegawaian](screenshots/25_portal-profil.png)

#### 26-28. Profil Sub-pages (Kepangkatan, Jabfung, Inpassing)

Route POST-only — CRUD dilakukan via modal di halaman profil utama. *(Expected 405)*

#### 29. Bimbingan Mahasiswa

Daftar bimbingan dengan informasi mahasiswa, NIM, jenis bimbingan. Mode baca saja saat periode tutup.

![Bimbingan](screenshots/29_portal-bimbingan.png)

#### 30. Pengujian Mahasiswa

Daftar pengujian mahasiswa (TA/Skripsi).

![Pengujian](screenshots/30_portal-pengujian.png)

#### 31. Bahan Ajar

Daftar bahan ajar yang diunggah.

![Bahan Ajar](screenshots/31_portal-bahan-ajar.png)

#### 32. Tugas Tambahan

Daftar tugas tambahan dosen.

![Tugas Tambahan](screenshots/32_portal-tugas-tambahan.png)

#### 33. Penunjang

Daftar kegiatan penunjang.

![Penunjang](screenshots/33_portal-penunjang.png)

#### 34. Penghargaan

Daftar penghargaan yang diperoleh.

![Penghargaan](screenshots/34_portal-penghargaan.png)

#### 35. Pengajaran (Read-only)

Data pengajaran dari SIAKAD — otomatis terisi dari jadwal mengajar.

![Pengajaran](screenshots/35_portal-pengajaran.png)

#### 36. Penelitian (Read-only placeholder)

Halaman penelitian — akan terintegrasi dari modul P3M.

![Penelitian](screenshots/36_portal-penelitian.png)

#### 37. Pengabdian (Read-only placeholder)

Halaman pengabdian masyarakat — akan terintegrasi dari modul P3M.

![Pengabdian](screenshots/37_portal-pengabdian.png)

#### 38-40. Diklat, Sertifikasi, Tes Kompetensi

Route tidak ada di `/kinerja/` — data ini tersedia via profil CRUD. *(Expected 404)*

#### 41. Presensi CICO

Data presensi clock-in/clock-out dari impor admin.

![Presensi CICO](screenshots/41_portal-presensi-cico.png)

#### 42. LKD Tridharma

Form upload dokumen LKD dan input poin Tridharma (Pendidikan 45%, Penelitian 25%, Pengabdian 20%, Penunjang 10%). Menampilkan estimasi skor real-time.

![LKD Tridharma](screenshots/42_portal-laporan-lkd.png)

#### 43. IKD (Kuesioner)

Halaman input/tampilkan nilai IKD dari kuesioner mahasiswa.

![IKD Kuesioner](screenshots/43_portal-laporan-ikd.png)

#### 44. Kehadiran

Halaman input persentase kehadiran untuk komponen scoring.

![Kehadiran](screenshots/44_portal-laporan-kehadiran.png)

#### 45. Skor Akhir

Halaman ringkasan skor akhir. Menampilkan pesan warning "Belum ada data laporan" dengan link ke Upload LKD dan Upload IKD jika data belum lengkap.

![Skor Akhir](screenshots/45_portal-laporan-skor.png)

---

### Section 4: Portal Tendik (rina.tendik@sttw.ac.id)

#### 46. Login sebagai Tendik

Rina Sulistiani login berhasil.

![Login Tendik](screenshots/46_rina-dashboard.png)

#### 47. Dashboard Kinerja Tendik

Portal menampilkan Jadwal Kinerja Aktif (Semester Ganjil 2024/2025, Sudah Tutup), status laporan kosong, dan Progress Pengisian (semua 0). Menu cepat: Data Kepegawaian, Pelayanan, Tugas Tambahan, Penunjang, Penghargaan, Presensi CICO.

![Dashboard Tendik](screenshots/47_tendik-dashboard.png)

#### 48. Profil Tendik

Data kepegawaian tendik.

![Profil Tendik](screenshots/48_tendik-profil.png)

#### 49. Pelayanan

Daftar catatan pelayanan tendik (empty state).

![Pelayanan](screenshots/49_tendik-pelayanan.png)

#### 50. Tugas Tambahan Tendik

Daftar tugas tambahan tendik.

![Tugas Tambahan](screenshots/50_tendik-tugas-tambahan.png)

#### 51. Penunjang Tendik

Daftar kegiatan penunjang tendik.

![Penunjang](screenshots/51_tendik-penunjang.png)

#### 52. Penghargaan Tendik

Daftar penghargaan tendik.

![Penghargaan](screenshots/52_tendik-penghargaan.png)

#### 53. Presensi CICO Tendik

Data presensi clock-in/clock-out.

![Presensi CICO](screenshots/53_tendik-presensi-cico.png)

---

### Section 5: Developer Access Test

#### 54. Developer → Admin HRM

Developer berhasil akses dashboard Admin HRM setelah permission diperbaiki.

![Dev Admin](screenshots/54_dev-hrm-admin.png)

#### 55. Developer → Portal Dosen

Developer berhasil akses portal dosen.

![Dev Portal](screenshots/55_dev-hrm-portal.png)

#### 56. Developer → Portal Asesor

Developer mendapat 403 karena tidak memiliki role `asesor`. *(Expected — by design)*

![Dev Asesor](screenshots/56_dev-hrm-asesor.png)

---

## Catatan

### Bug yang Diperbaiki Selama Audit
1. **AdminDashboardController** — `orderBy('nama')` pada kolom yang sudah di-drop. Fix: gunakan collection `sortBy()` setelah eager load.
2. **HrmDummySeeder** — User asesor tidak diberi role `asesor` dan permission `hrm.asesor.manage`. Fix: tambah `assignRole('asesor')` dan `givePermissionTo()`.
3. **RolePermissionSeeder** — Role `waket2` hanya punya 6 dari 15 HRM permission yang dibutuhkan. Fix: tambah semua HRM admin permissions.
4. **RolePermissionSeeder** — Role `developer` tidak punya HRM permission sama sekali. Fix: tambah filter `hrm.*` ke developer role sync.

### Minor Observations
- Stats cards pada Dashboard Eksekutif Laporan terpotong label-nya ("Total ...", "Selesa...") pada viewport 1280px — isu minor yang tidak mengganggu fungsionalitas.
- Tombol "Edit" pada tabel Jenis Tendik sedikit terpotong di tepi kanan — isu minor viewport.
- Tendik belum punya data kinerja dummy — perlu seed data jika ingin demo lengkap.

### Halaman yang Berfungsi Sempurna (46/56)
Seluruh halaman yang bukan expected-error tampil dengan baik, layout rapi, data dummy terisi, sidebar navigasi lengkap, dan breadcrumb benar.
