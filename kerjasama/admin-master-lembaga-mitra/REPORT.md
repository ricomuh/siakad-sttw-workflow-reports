# Workflow Report: Master Lembaga Mitra

**Tanggal**: 2026-04-24
**Role**: admin
**Modul**: kerjasama (SIMKERMA)
**Fitur**: Master Data — Lembaga Mitra
**Status**: ✅ Berhasil

## Deskripsi Workflow

CRUD master data lembaga/instansi mitra kerjasama (PT, Pemerintah, Industri, dll). Diakses dari sidebar SIMKERMA → Master Data → Lembaga Mitra. Permission tunggal: `kerjasama.master.manage`.

## Ringkasan

Halaman index, create, dan edit semua render normal. Sidebar SIMKERMA → Master Data ter-expand menampilkan 5 sub-item (Lembaga Mitra, Unit Pelaksana, Kategori Mitra, Bentuk Kerjasama, Kategori Bukti) — confirms master data sub-menu **lengkap** (sebelumnya report hanya cover 1 dari 5).

## Langkah-langkah

### 1. Index — Daftar Lembaga Mitra

**Deskripsi**: Klik sidebar SIMKERMA → Master Data → Lembaga Mitra. Tabel menampilkan semua record dengan kolom utama dan aksi Edit/Hapus. Tombol "+ Tambah" di kanan atas.

**URL**: `http://127.0.0.1:8000/kerjasama/master/lembaga-mitra`

![Daftar Lembaga Mitra](screenshots/01_index.png)

### 2. Create — Form Tambah

**Deskripsi**: Klik tombol "+ Tambah". Form dengan field: Kode, Nama, Kategori (FK), Alamat, Kota, Provinsi, Negara, Website, Email, Telepon, PIC, status Aktif. Tombol Simpan/Batal.

**URL**: `http://127.0.0.1:8000/kerjasama/master/lembaga-mitra/create`

![Form tambah Lembaga Mitra](screenshots/02_create.png)

### 3. Edit — Form Ubah

**Deskripsi**: Klik aksi Edit pada salah satu baris. Form pre-filled dengan data existing.

**URL**: `http://127.0.0.1:8000/kerjasama/master/lembaga-mitra/{id}/edit`

![Form edit Lembaga Mitra](screenshots/03_edit.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| - | - | - | - | Tidak ada — halaman 200 OK, sidebar lengkap | - | - |

## Catatan

- Master Lembaga Mitra di-seed via `MasterKerjasamaSeeder`.
- Hapus menggunakan soft delete (kolom `deleted_at`); record tetap aman jika sudah direferensi surat.
