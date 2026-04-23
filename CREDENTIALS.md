# 🔑 Demo Credentials — SIAKAD STTW

> **Tanggal terbit**: 2026-04-23
> **Sumber**: `database/seeders/*` pada branch `dev/seeder-completeness` (PR #151)
> **Password universal**: `password`
> **Cara seed**: `php artisan migrate:fresh --seed`

Daftar ini menjamin **semua 16 role** yang terdaftar di `RolePermissionSeeder` punya minimal satu user demo, sehingga seluruh ekosistem aplikasi bisa diuji end-to-end tanpa perlu bikin user manual.

---

## Manajemen & Pimpinan

| Role | Email | NIP | Sumber Seeder |
|------|-------|-----|---------------|
| `developer` | `developer@sttw.ac.id` | `developer` | UserSeeder |
| `admin` | `admin@sttw.ac.id` | `199001012020011001` | UserSeeder |
| `ketua` | `ketua@sttw.ac.id` | `196501011990011001` | UserSeeder |
| `waket1` (Akademik) | `waket1@sttw.ac.id` | `197801012005011001` | UserSeeder |
| `waket2` (SDM / HRM) | `waket2@sttw.ac.id` | `WAKET2-001` | Waket2Seeder |
| `waket3` (Kemahasiswaan / SISKA) | `waket3@sttw.ac.id` | `WAKET3-001` | Waket3Seeder |

## Staf Akademik & Penjaminan Mutu

| Role | Email | NIP | Sumber Seeder |
|------|-------|-----|---------------|
| `akademik` | `akademik@sttw.ac.id` | `AKADEMIK001` | UserSeeder |
| `admin-lpm` | `admin-lpm@sttw.ac.id` | `LPM001` | UserSeeder |
| `auditor-internal` | `auditor@sttw.ac.id` | `AUDIT001` | UserSeeder |
| `admin-kemahasiswaan` | `adminkemahasiswaan@sttw.ac.id` | `199505052021011001` | AdminKemahasiswaanSeeder |
| `kaprodi` (D3 Teknik Mesin) | `kaprodi@sttw.ac.id` | `197505152005011001` | UserSeeder + KaprodiProdiLinkSeeder |

> **Catatan kaprodi**: User ini awalnya dibuat sebagai `dosen` oleh `UserSeeder` (agar profil `Dosen` ter-create otomatis). Role `kaprodi` baru ditambahkan oleh `KaprodiProdiLinkSeeder` setelah `AkademikSeeder` selesai dan `dosen.program_studi_id` berhasil di-link ke prodi pertama.

## Dosen

| Role | Email | NIP | Catatan |
|------|-------|-----|---------|
| `dosen` | `budi.santoso@sttw.ac.id` | `198505152010011003` | Dosen utama, jadwal lengkap, asesor HRM, pembimbing TA/Skripsi |
| `dosen` | `ahmad.subagyo@sttw.ac.id` | `198103152008011002` | Asesor HRM |
| `dosen` | `siti.nurhaliza@sttw.ac.id` | `198806202012012001` | — |
| `dosen` | `bambang.s@sttw.ac.id` | `197611112005011002` | — |
| `dosen` | `pembimbing@sttw.ac.id` | (PklSeeder) | Pembimbing PKL |
| `dosen` | `penguji@sttw.ac.id` | (PklSeeder) | Penguji PKL |

## Tenaga Kependidikan

| Role | Email | Catatan |
|------|-------|---------|
| `tendik` | `rina.tendik@sttw.ac.id` | Untuk fitur HRM presensi tendik |
| `tendik` | `hendra.tendik@sttw.ac.id` | Untuk fitur HRM presensi tendik |

## Mahasiswa

| Role | Email | NIM | Catatan |
|------|-------|-----|---------|
| `mahasiswa` | `ahmad.rizki@student.ac.id` | `202110001` | Angkatan 2021, KRS lengkap, KHS tersedia |
| `mahasiswa` | `siti.rahma@student.ac.id` | `202110002` | Angkatan 2021 |
| `mahasiswa` | `haris.firman@student.ac.id` | `202210050` | Angkatan 2022 |
| `mahasiswa` | `mhs1@sttw.ac.id` | (PklSeeder) | Skenario PKL — proposal disetujui |
| `mahasiswa` | `mhs2@sttw.ac.id` | (PklSeeder) | Skenario PKL — sedang bimbingan |
| `mahasiswa` | `mhs3@sttw.ac.id` | (PklSeeder) | Skenario PKL — siap sidang |
| `mahasiswa-baru` | `mahasiswa-baru@sttw.ac.id` | `MB2024001` | Untuk testing flow PMB / heregistrasi |

---

## Cara pakai

### Pull terbaru di server

```bash
cd /var/www/siakad-sttw
git pull origin main
php artisan migrate:fresh --seed
```

> ⚠️ `migrate:fresh` akan **menghapus seluruh data**. Pastikan ini server demo, bukan produksi.

### Login di browser

1. Buka `https://sttw-dev.leolitgames.com/login`
2. Masukkan **email** dari tabel di atas
3. Password: `password`
4. Klik **Masuk**

### Verifikasi otomatis

Test `tests/Feature/Auth/UserSeederCoverageTest.php` menjamin:

- Setiap role utama yang dimiliki `UserSeeder` punya user demo
- User `kaprodi@sttw.ac.id` mendapat role `kaprodi` **dan** `dosen.program_studi_id` ter-set setelah `DatabaseSeeder` selesai (penting agar fitur kaprodi-scoped tidak `abort(403)`)

Jalankan dengan:

```bash
php artisan test --compact tests/Feature/Auth/UserSeederCoverageTest.php
```

---

## Riwayat perubahan

| Tanggal | Perubahan | PR |
|---------|-----------|-----|
| 2026-04-23 | Inisialisasi dokumen, sinkron dengan PR #151 (seeder completeness) | #151 |
