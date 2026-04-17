# Workflow Report: Skripsi — Mahasiswa

**Tanggal**: 2026-04-14
**Role**: Mahasiswa (ahmad.rizki@student.ac.id — Ahmad Rizki Nugraha, 202110001)
**Modul**: SISKA — Skripsi
**Status**: ✅ Berhasil (6/6 halaman OK)

## Ringkasan

Dokumentasi alur kerja mahasiswa dalam modul Skripsi. Mahasiswa dapat mengajukan proposal, mengisi logbook bimbingan, melihat jadwal sidang, dan mengunggah berkas mandiri. Akses memerlukan mata kuliah "Skripsi" dalam KRS yang disetujui.

## Langkah-langkah

### 1. Daftar Proposal
**URL**: `/siska/skripsi/proposals`
**Status**: ✅ OK

Menampilkan daftar proposal skripsi milik mahasiswa. Ahmad memiliki 1 proposal dengan status "Disetujui". Tombol "+ Ajukan Proposal Baru" dan "Lihat Detail" tersedia.

![Proposals Index](screenshots/01_proposals-index.png)

---

### 2. Logbook Bimbingan — Daftar
**URL**: `/siska/skripsi/logbooks`
**Status**: ✅ OK

Daftar logbook bimbingan skripsi. Tabel: No, Tanggal, Kegiatan, Status Validasi, Komentar Dosen, Aksi. Tombol "Tambah Logbook" tersedia.

![Logbook Index](screenshots/02_logbook-index.png)

---

### 3. Tambah Logbook Bimbingan
**URL**: `/siska/skripsi/logbooks/create`
**Status**: ✅ OK

Form input logbook bimbingan baru:
- **Tanggal**: Date picker
- **Kegiatan**: Textarea deskripsi kegiatan
- **File Pendukung**: Upload lampiran (opsional)

![Logbook Create](screenshots/03_logbook-create.png)

---

### 4. Jadwal Sidang
**URL**: `/siska/skripsi/sidangs`
**Status**: ✅ OK

Jadwal sidang skripsi mahasiswa. Informasi: tanggal, ruangan, penguji, status.

![Sidang Index](screenshots/04_sidang-index.png)

---

### 5. Unggah Mandiri
**URL**: `/siska/skripsi/unggah-mandiri`
**Status**: ✅ OK

Unggah berkas skripsi mandiri untuk perpustakaan. Mahasiswa lulus sidang dapat mengunggah file laporan final.

![Unggah Mandiri](screenshots/05_unggah-mandiri.png)

---

### 6. Detail Proposal
**URL**: `/siska/skripsi/proposals/{id}`
**Status**: ✅ OK

Detail proposal skripsi. Menampilkan judul, abstrak, dosen pembimbing, status approval, dan riwayat revisi.

![Proposal Detail](screenshots/06_proposal-detail.png)

---

## Catatan

- Semua halaman mahasiswa Skripsi berfungsi tanpa error
- Akses memerlukan mata kuliah "Skripsi" di KRS aktif (Disetujui)
- Ahmad memiliki 1 proposal skripsi (Disetujui) dan registrasi berstatus "bimbingan"
