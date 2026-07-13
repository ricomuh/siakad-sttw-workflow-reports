# QA Planner — Modul E-Learning SIAKAD STTW

> PR #521 (merged) — Fitur: Submit Ujian Mahasiswa, Validasi Soal Kaprodi, Penjamu Monitoring Detail.

---

## CRUD Completeness Check

### 1. Mahasiswa — Submit Ujian

| Route | Method | View | Auth |
|---|---|---|---|
| `/siakad/mahasiswa/ujian` | GET | `mahasiswa.elearning.ujian.index` | `role:mahasiswa` |
| `/siakad/mahasiswa/ujian/{ujian}/upload` | POST | — (redirect back) | `role:mahasiswa` |
| `/siakad/mahasiswa/ujian/{ujian_mahasiswa}/edit` | PUT | — (redirect back) | `role:mahasiswa` |

- **Create**: POST upload jawaban + store `ujian-jawaban/*.pdf` di storage `public`
- **Read**: GET list ujian dari `JadwalUjian` (join `Krs.status=Disetujui`, `is_active=true`, `status=Disetujui`) + attach submission status
- **Update**: PUT edit jawaban (ganti file, hapus file lama)
- **Delete**: ❌ Tidak ada. Mahasiswa tidak bisa menghapus submission.

### 2. Kaprodi — Validasi Soal

| Route | Method | View | Auth |
|---|---|---|---|
| `/siakad/validasi-soal` | GET | `kaprodi.ujian.validasi.index` | `permission:siakad.ujian.validasi-soal` |
| `/siakad/validasi-soal/{id}/setujui` | POST | — (redirect) | `permission:siakad.ujian.validasi-soal` + cross-prodi gate |
| `/siakad/validasi-soal/{id}/tolak` | POST | — (redirect) | `permission:siakad.ujian.validasi-soal` + cross-prodi gate |

- **Read**: GET list jadwal UAS scoped ke prodi kaprodi (`KaprodiService::getProdiId`)
- **Update**: POST setujui (`status_validasi='disetujui'`), POST tolak (`status_validasi='ditolak'` + `catatan_validasi`)
- **Create**: ❌ Tidak ada — validasi hanya update state
- **Delete**: ❌ Tidak ada

### 3. Penjamu — Monitoring Detail Dosen

| Route | Method | View | Auth |
|---|---|---|---|
| `/siakad/penjamu` | GET | `siakad.penjamu.index` | `permission:siakad.penjamu.view` |
| `/siakad/penjamu/data` | POST | `siakad.penjamu.data` | `permission:siakad.penjamu.view` |
| `/siakad/penjamu/{dosenId}` | GET | `siakad.penjamu.show` | `permission:siakad.penjamu.view` |
| `/siakad/penjamu/{dosen}/detail` | GET | `siakad.penjamu.detail` | `permission:siakad.penjamu.detail` |

- **Read**: Semua method adalah GET/POST read-only. Detail menampilkan 4 tab data.
- **Create/Update/Delete**: ❌ Tidak ada — monitoring read-only.

---

## Skenario Submit Ujian Mahasiswa

### S1 — Upload PDF Berhasil
- **Precondition**: Mahasiswa login, memiliki KRS disetujui, jadwal ujian aktif + disetujui, deadline belum lewat, belum pernah submit.
- **Steps**:
  1. Buka halaman daftar ujian (`/siakad/mahasiswa/ujian`)
  2. Klik "Kumpulkan Jawaban" pada kartu ujian
  3. Modal upload muncul → pilih file PDF ≤25MB
  4. Klik "Upload"
- **Expected**:
  - File tersimpan di `storage/app/public/ujian-jawaban/`
  - Record `ujian_mahasiswa` dibuat (jadwal_ujian_id, mahasiswa_id, file_path, submitted_at)
  - Flash message: "Jawaban ujian berhasil dikumpulkan."
  - Kartu ujian berubah: tampil badge "Sudah dikumpulkan" + tombol "Edit Jawaban"

### S2 — Deadline Gate (Upload Ditolak)
- **Precondition**: `deadline_submit` sudah lewat (`now() > deadline_submit`)
- **Steps**: Buka halaman → tombol "Kumpulkan Jawaban" sudah disabled → ditampilkan badge "Deadline Terlewati"
- **Edge**: Coba POST langsung via curl/tool → server-side validation menolak → `errors('deadline')` → "Batas waktu pengumpulan ujian telah berakhir."
- **Test**: `tests/Feature/Elearning/UjianMahasiswaTest.php::upload fails when past deadline`

### S3 — Duplicate Submit (Upload Ditolak)
- **Precondition**: Mahasiswa sudah pernah upload
- **Steps**: Coba upload lagi (POST) untuk jadwal yang sama
- **Expected**: Server menolak → `errors('submitted')` → "Anda sudah mengumpulkan jawaban ujian ini."
- **Test**: `tests/Feature/Elearning/UjianMahasiswaTest.php::cannot re-upload when already submitted`

### S4 — Edit Jawaban (Sebelum Deadline)
- **Precondition**: Sudah submit, deadline belum lewat
- **Steps**:
  1. Klik "Edit Jawaban" pada kartu ujian
  2. Pilih file PDF baru
  3. Submit
- **Expected**:
  - File lama dihapus dari storage
  - `file_path` + `submitted_at` diupdate
  - Flash: "Jawaban ujian berhasil diperbarui."
- **Test**: `tests/Feature/Elearning/UjianMahasiswaTest.php::mahasiswa can edit answer before deadline`

### S5 — Edit Jawaban (Setelah Deadline)
- **Precondition**: Sudah submit, deadline sudah lewat
- **Steps**: Tombol "Edit Jawaban" tidak muncul (diganti "Deadline Terlewati" disabled)
- **Edge**: PUT langsung → server-side menolak → `errors('deadline')`
- **Test**: `tests/Feature/Elearning/UjianMahasiswaTest.php::cannot edit answer when past deadline`

### S6 — Edit Submission Milik Mahasiswa Lain (403)
- **Steps**: Coba PUT `/siakad/mahasiswa/ujian/{id_milik_orang_lain}/edit`
- **Expected**: `abort(403)` → "Anda tidak memiliki akses ke submission ini."
- **Test**: `tests/Feature/Elearning/UjianMahasiswaTest.php::cannot edit another mahasiswas submission`

### S7 — Validasi File
- **Format salah** (non-PDF): server reject → `errors('file')` → "File harus dalam format PDF."
- **Size >25MB** (max: 25600 KB): server reject → `errors('file')` → "Ukuran file maksimal 25MB."
- **Tests**: `upload fails when file is not PDF`, `upload fails when file exceeds 25MB`

---

## Skenario Validasi Soal Kaprodi

### V1 — Kaprodi Melihat Daftar Validasi (Scoped Prodi)
- **Precondition**: Login sebagai kaprodi dengan permission `siakad.ujian.validasi-soal`
- **Steps**: Buka `/siakad/validasi-soal`
- **Expected**:
  - Halaman menampilkan tabel jadwal UAS (kolom: Mata Kuliah, Dosen, Tanggal Ujian, Status Validasi, Aksi)
  - Hanya jadwal dari prodi kaprodi yang muncul (filter `whereHas('formasiDosen', program_studi_id = $prodiId)`)
  - Status validasi ditampilkan dengan badge warna: pending (kuning), disetujui (hijau), ditolak (merah)
- **Test**: `KaprodiValidasiSoalTest::kaprodi can view validasi soal list scoped to their prodi`

### V2 — Kaprodi Menyetujui Soal
- **Precondition**: Jadwal dengan `status_validasi = 'pending'`
- **Steps**: Klik tombol "Setujui" (form POST)
- **Expected**:
  - `status_validasi` berubah menjadi `'disetujui'`
  - Redirect + flash success: "Soal UAS berhasil disetujui."
  - Baris di tabel berubah: badge hijau "Disetujui", tombol aksi hilang
- **Test**: `KaprodiValidasiSoalTest::kaprodi can approve soal`

### V3 — Kaprodi Menolak Soal + Catatan
- **Precondition**: Jadwal dengan `status_validasi = 'pending'`
- **Steps**:
  1. Klik "Tolak" → modal muncul dengan textarea "Catatan Penolakan"
  2. Isi catatan (required, max 1000 chars)
  3. Submit
- **Expected**:
  - `status_validasi` = `'ditolak'`, `catatan_validasi` tersimpan
  - Redirect + flash: "Soal UAS telah ditolak."
  - Baris tabel: badge merah "Ditolak" + catatan ditampilkan
- **Test**: `KaprodiValidasiSoalTest::kaprodi can reject soal with catatan`

### V4 — Cross-Prodi Block
- **Precondition**: Kaprodi Prodi A mencoba akses jadwal Prodi B
- **Steps**: POST `/siakad/validasi-soal/{id_jadwal_prodi_B}/setujui` (atau tolak)
- **Expected**: `abort(403)` → "Jadwal ujian tidak dalam prodi Anda."
- **Test**: `KaprodiValidasiSoalTest::other kaprodi cannot access different prodi jadwal`

### V5 — Non-Kaprodi Ditolak
- **Precondition**: User tanpa permission `siakad.ujian.validasi-soal`
- **Steps**: Akses halaman validasi
- **Expected**: 403 Forbidden
- **Test**: `KaprodiValidasiSoalTest::non-kaprodi cannot access validasi soal`

### V6 — Jadwal Tidak Muncul Jika Bukan UAS
- **Logic**: Controller filter `->where('jenis_ujian', 'UAS')` — validasi hanya untuk UAS.
- **Expected**: Jadwal UTS/tugas tidak muncul di list validasi.

---

## Skenario Penjamu Monitoring Detail

### P1 — Filter Prodi + Periode
- **Precondition**: Login waket1/penjamu dengan permission `siakad.penjamu.view`
- **Steps**:
  1. `/siakad/penjamu` → pilih Program Studi + Periode Akademik
  2. Submit form → POST `/siakad/penjamu/data`
  3. Muncul daftar dosen yang mengajar di prodi+periode tersebut (grouped by dosen_id)
- **Expected**: Formasi dosen difilter berdasarkan `program_studi_id` + `periode_akademik_id`

### P2 — Akses Detail Dosen (4 Tabs)
- **Precondition**: Waket1 dengan permission `siakad.penjamu.detail`
- **Steps**: GET `/siakad/penjamu/{dosen}/detail?program_studi_id=X&periode_akademik_id=Y`
- **Expected**: Halaman menampilkan:
  - Header: Nama dosen, NIDN, Program Studi, Periode
  - 4 tabs: Materi | Tugas | Nilai | Diskusi
- **Test**: `PenjamuMonitoringDetailTest::shows 4 tabs: Materi, Tugas, Nilai, Diskusi`

### P3 — Tab 1: Materi
- **Data Source**: `MateriSap` → `whereIn(jadwal_perkuliahan_id, $jadwalIds)` + `is_published=true`, ordered by `pertemuan_ke`
- **Kolom**: No, Pertemuan, Judul, Deskripsi (limit 80), Tanggal Upload
- **Empty State**: "Belum ada materi yang dipublikasikan."
- **Test**: `PenjamuMonitoringDetailTest::shows materi data in materi tab`

### P4 — Tab 2: Tugas
- **Data Source**: `Tugas` → `whereIn(jadwal_perkuliahan_id, $jadwalIds)` + `is_published=true`, ordered by `deadline`
- **Kolom**: No, Judul, Deskripsi (limit 80), Deadline, Bobot
- **Empty State**: "Belum ada tugas yang dipublikasikan."
- **Test**: `PenjamuMonitoringDetailTest::shows tugas data in tugas tab`

### P5 — Tab 3: Nilai
- **Data Source**: `NilaiMahasiswa` (with `mahasiswa`, `mataKuliah`) → `whereIn(mata_kuliah_id, $mataKuliahIds)`, ordered by `created_at desc`
- **Kolom**: No, Mata Kuliah, Mahasiswa, Nilai Angka, Nilai Huruf, Status (Lulus/Tidak Lulus)
- **Empty State**: "Belum ada data nilai."
- **Test**: `PenjamuMonitoringDetailTest::shows nilai data in nilai tab`

### P6 — Tab 4: Diskusi
- **Data Source**: `Diskusi` (with `user`, `replies`) → `whereIn(jadwal_perkuliahan_id, $jadwalIds)`, ordered by `created_at desc`
- **Kolom**: No, Pengirim, Isi Diskusi (limit 100), Balasan (count), Tanggal
- **Empty State**: "Belum ada diskusi."
- **Test**: `PenjamuMonitoringDetailTest::shows diskusi data in diskusi tab`

### P7 — Auth Gate
- **Tanpa login**: redirect ke `/login`
- **Tanpa permission `siakad.penjamu.detail`**: 403 Forbidden
- **Tests**: `blocks unauthenticated user`, `blocks user without penjamu detail permission`

### P8 — Back Link
- Tombol "← Kembali ke Penjamu" di bawah tabs → mengarah ke `route('siakad.penjamu.index')`

---

## Pass Criteria

1. **Semua test Pest lulus** tanpa error/failure:
   - `tests/Feature/Elearning/UjianMahasiswaTest.php` (9 tests)
   - `tests/Feature/Elearning/KaprodiValidasiSoalTest.php` (6 tests)
   - `tests/Feature/Elearning/PenjamuMonitoringDetailTest.php` (9 tests)

2. **CRUD coverage**:
   - Submit ujian: Create (upload), Read (list), Update (edit) → ✅
   - Validasi soal: Read (list), Update (setujui/tolak) → ✅
   - Penjamu detail: Read (4 tab data) → ✅

3. **Auth enforcement**:
   - Mahasiswa routes: hanya `role:mahasiswa` → ✅
   - Validasi soal: `permission:siakad.ujian.validasi-soal` + cross-prodi gate → ✅
   - Penjamu detail: `permission:siakad.penjamu.detail` + login required → ✅

4. **File upload constraints**:
   - Format: PDF only (mimes:pdf) → ✅
   - Size: max 25MB (max:25600 KB) → ✅
   - Storage: `public` disk, path `ujian-jawaban/` → ✅

5. **Deadline enforcement**:
   - Server-side gate pada upload + edit (sebelum redirect, bukan hanya UI disable) → ✅
   - UI menampilkan status deadline (warna merah jika lewat, tombol disabled) → ✅

6. **Duplicate prevention**:
   - Satu mahasiswa hanya bisa satu submission per jadwal → ✅
   - Edit hanya bisa untuk submission milik sendiri → ✅

7. **Prodi scoping validasi**:
   - Kaprodi hanya melihat + memvalidasi jadwal di prodinya sendiri → ✅
   - Cross-prodi attempt → 403 → ✅

8. **Penjamu detail completeness**:
   - 4 tab muncul dan berisi data → ✅
   - Data difilter berdasarkan formasi dosen di prodi+periode yang dipilih → ✅
   - Empty state ada untuk setiap tab → ✅

9. **UI/UX acceptance**:
   - Breadcrumbs benar di semua halaman
   - Modal upload ujian berfungsi (open/close)
   - Modal tolak validasi berfungsi (open/close, form action dinamik)
   - Tabs penjamu detail berfungsi (x-tabs component)
   - Flash messages sukses/error muncul dengan benar
   - Responsive: grid card ujian (1→2→3 kolom)

10. **Edge cases covered**:
    - Periode tidak aktif → halaman ujian tetap bisa dibuka (list kosong)
    - Mahasiswa tanpa data → redirect back + error message
    - File lama dihapus saat edit jawaban (tidak bocor storage)
    - Status validasi hanya bisa diubah dari `pending` (UI hanya tampil tombol jika pending)
