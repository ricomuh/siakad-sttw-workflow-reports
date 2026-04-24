# Workflow Report: Master Kategori Bukti

**Tanggal**: 2026-04-24
**Role**: admin
**Modul**: kerjasama (SIMKERMA)
**Fitur**: Master Data — Kategori Bukti
**Status**: ✅ Berhasil

## Deskripsi Workflow

CRUD master kategori bukti pelaksanaan kerjasama (Foto, Notulen, Dokumen MoU, Laporan, dll) yang dipakai saat upload bukti. Diakses dari sidebar SIMKERMA → Master Data → Kategori Bukti. Permission tunggal: `kerjasama.master.manage`.

## Ringkasan

Halaman index, create, dan edit semua render normal. Sidebar SIMKERMA → Master Data ter-expand menampilkan 5 sub-item (Lembaga Mitra, Unit Pelaksana, Kategori Mitra, Bentuk Kerjasama, Kategori Bukti) — confirms master data sub-menu **lengkap** (sebelumnya report hanya cover 1 dari 5).

## Langkah-langkah

### 1. Index — Daftar Kategori Bukti

**Deskripsi**: Klik sidebar SIMKERMA → Master Data → Kategori Bukti. Tabel menampilkan semua record dengan kolom utama dan aksi Edit/Hapus. Tombol "+ Tambah" di kanan atas.

**URL**: `http://127.0.0.1:8000/kerjasama/master/kategori-bukti`

![Daftar Kategori Bukti](screenshots/01_index.png)

### 2. Create — Form Tambah

**Deskripsi**: Klik tombol "+ Tambah". Form dengan field: Kode, Nama, Deskripsi, Urutan, status Aktif. Tombol Simpan/Batal.

**URL**: `http://127.0.0.1:8000/kerjasama/master/kategori-bukti/create`

![Form tambah Kategori Bukti](screenshots/02_create.png)

### 3. Edit — Form Ubah

**Deskripsi**: Klik aksi Edit pada salah satu baris. Form pre-filled dengan data existing.

**URL**: `http://127.0.0.1:8000/kerjasama/master/kategori-bukti/{id}/edit`

![Form edit Kategori Bukti](screenshots/03_edit.png)

## Temuan & Masalah

| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |
|---|---------|-----|----------|-----------|------------|-----------|
| - | - | - | - | Tidak ada — halaman 200 OK, sidebar lengkap | - | - |

## Catatan

- Master Kategori Bukti di-seed via `MasterKerjasamaSeeder`.
- Hapus menggunakan soft delete (kolom `deleted_at`); record tetap aman jika sudah direferensi surat.
