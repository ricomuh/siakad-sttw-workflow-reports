# Bug Report: Scan Sarpras Admin

**Tanggal**: 2026-05-31  
**Role**: Admin (`admin@sttw.ac.id`)  
**Modul**: Sarpras  
**Status Scan**: ⚠️ Partial karena menu Sarpras tidak tersedia di sidebar

## Ringkasan Bug

| # | Severity | Kategori | Halaman | Status |
|---|----------|----------|---------|--------|
| 1 | Critical | `missing-sidebar` | Sidebar Sarpras Admin | Open |
| 2 | High | `missing-sidebar` | Kategori Aset | Open |
| 3 | High | `missing-sidebar` | Aset | Open |
| 4 | High | `missing-sidebar` | Laporan Kerusakan | Open |
| 5 | High | `missing-sidebar` | Peminjaman | Open |
| 6 | Medium | `incomplete-data` | Notifikasi Bell | Open |

## Detail Bug

### BUG-001 — Menu Sarpras tidak muncul di sidebar admin

**Severity**: Critical  
**Kategori**: `missing-sidebar`  
**Halaman**: Dashboard/sidebar admin  
**URL**: `http://127.0.0.1:9090/dashboard`  
**Screenshot**: ![](screenshots/03_sidebar-expanded-no-sarpras.png)

**Deskripsi**: User admin memiliki role `admin_sarpras`, tetapi sidebar tidak menampilkan grup atau link Sarpras setelah semua grup menu dibuka. Ini memblokir scan seluruh modul Sarpras karena task mewajibkan navigasi lewat sidebar.

**Steps to reproduce**:

1. Buka `http://127.0.0.1:9090/login`.
2. Login dengan `admin@sttw.ac.id / password` melalui field `input[name="login"]`.
3. Di dashboard, buka seluruh grup sidebar: SIAKAD, SISKA, P3M, SIMKERMA, LPM, PMB, CDC, System, dan Perpustakaan.
4. Amati tidak ada grup/link Sarpras.

**Expected**: Sidebar menampilkan grup Sarpras berisi Kategori Aset, Aset, Laporan Kerusakan, dan Peminjaman untuk role `admin_sarpras`.  
**Actual**: Tidak ada menu Sarpras sama sekali.  
**Dampak**: Admin tidak dapat menjalankan workflow Sarpras melalui navigasi resmi; scan halaman Sarpras tidak bisa dilanjutkan tanpa direct URL.

### BUG-002 — Link sidebar Kategori Aset tidak tersedia

**Severity**: High  
**Kategori**: `missing-sidebar`  
**Halaman**: Kategori Aset  
**URL yang seharusnya ditautkan**: `/sarpras/admin/kategori-aset`  
**Screenshot**: ![](screenshots/03_sidebar-expanded-no-sarpras.png)

**Steps to reproduce**:

1. Login sebagai admin.
2. Buka semua grup sidebar.
3. Cari menu "Kategori Aset".

**Expected**: Ada link sidebar menuju index Kategori Aset.  
**Actual**: Tidak ada link.  
**Dampak**: CRUD kategori aset tidak dapat diakses dari sidebar.

### BUG-003 — Link sidebar Aset tidak tersedia

**Severity**: High  
**Kategori**: `missing-sidebar`  
**Halaman**: Aset  
**URL yang seharusnya ditautkan**: `/sarpras/admin/aset`  
**Screenshot**: ![](screenshots/03_sidebar-expanded-no-sarpras.png)

**Steps to reproduce**:

1. Login sebagai admin.
2. Buka semua grup sidebar.
3. Cari menu "Aset".

**Expected**: Ada link sidebar menuju index Aset.  
**Actual**: Tidak ada link.  
**Dampak**: Inventaris aset tidak dapat diakses dari sidebar.

### BUG-004 — Link sidebar Laporan Kerusakan tidak tersedia

**Severity**: High  
**Kategori**: `missing-sidebar`  
**Halaman**: Laporan Kerusakan  
**URL yang seharusnya ditautkan**: `/sarpras/admin/laporan`  
**Screenshot**: ![](screenshots/03_sidebar-expanded-no-sarpras.png)

**Steps to reproduce**:

1. Login sebagai admin.
2. Buka semua grup sidebar.
3. Cari menu "Laporan Kerusakan".

**Expected**: Ada link sidebar menuju monitoring laporan kerusakan.  
**Actual**: Tidak ada link.  
**Dampak**: Admin tidak dapat memproses laporan kerusakan dari navigasi resmi.

### BUG-005 — Link sidebar Peminjaman tidak tersedia

**Severity**: High  
**Kategori**: `missing-sidebar`  
**Halaman**: Peminjaman  
**URL yang seharusnya ditautkan**: `/sarpras/admin/peminjaman`  
**Screenshot**: ![](screenshots/03_sidebar-expanded-no-sarpras.png)

**Steps to reproduce**:

1. Login sebagai admin.
2. Buka semua grup sidebar.
3. Cari menu "Peminjaman".

**Expected**: Ada link sidebar menuju monitoring peminjaman.  
**Actual**: Tidak ada link.  
**Dampak**: Admin tidak dapat approve/tolak/kelola peminjaman dari navigasi resmi.

### BUG-006 — Notifikasi bell tidak menampilkan 5 test notifikasi

**Severity**: Medium  
**Kategori**: `incomplete-data`  
**Halaman**: Dashboard notification bell  
**URL**: `http://127.0.0.1:9090/dashboard`  
**Screenshot**: ![](screenshots/02_dashboard-notification-bell.png)

**Deskripsi**: Bell notifikasi dapat dibuka, tetapi dropdown menampilkan "Tidak ada notifikasi". Ini tidak sesuai konteks scan yang menyebutkan 5 test notifikasi sudah terpasang di navbar.

**Steps to reproduce**:

1. Login sebagai admin.
2. Klik icon bell notifikasi di navbar dashboard.
3. Amati isi dropdown.

**Expected**: Dropdown menampilkan 5 test notifikasi.  
**Actual**: Dropdown menampilkan "Tidak ada notifikasi".  
**Dampak**: Test notification tidak terlihat oleh admin; perlu cek query/filter/user target notifikasi.

## Catatan Tambahan

- Direct URL ke halaman Sarpras sengaja tidak digunakan karena instruksi scan mewajibkan navigasi via sidebar.
- Tabel `laporan_kerusakan` dan `peminjaman` terdeteksi kosong, tetapi halaman list tidak dapat diverifikasi visual karena bug sidebar memblokir akses via navigasi resmi.
