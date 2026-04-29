# P3M — Portal Public

- **Tanggal:** 2026-04-22
- **Role:** guest (no auth)
- **Modul:** P3M → Portal Publik
- **Status:** ❌ Gap — **portal publik P3M tidak ada di codebase**

## Ringkasan

Audit `routes/web.php` dan `php artisan route:list --path=p3m` menunjukkan bahwa P3M **tidak memiliki route publik (guest)** untuk repositori penelitian/pengabdian, katalog HKI, publikasi, atau panduan.

Semua route P3M berada di bawah:

- `p3m/admin/*` — operator/admin P3M (auth + permission `p3m.*.manage`).
- `p3m/dosen/*` — dosen pengusul (auth + role `dosen`).
- `api/p3m/repositori/*` — REST API (auth/session protected; share token endpoint memerlukan token spesifik).

**Tidak ada landing page** seperti `/p3m`, `/p3m/repositori`, `/p3m/publikasi` untuk publik.

## Halaman

| # | Halaman | URL | Status |
|---|---|---|---|
| — | (tidak ada route publik) | — | — |

## Screenshots

Tidak ada screenshot — tidak ada halaman publik untuk di-record.

## Temuan & Masalah

### ❌ Gap fitur — Portal publik P3M belum dibangun

Sesuai spesifikasi awal SIMP3M, portal publik biasanya menampilkan:

- Repositori publikasi & penelitian terbuka (read-only).
- Daftar HKI & paten yang sudah granted.
- Panduan / dokumen-dokumen P3M (pedoman, template, jadwal kompetitif).
- Berita/pengumuman P3M.

Saat ini fitur tersebut hanya bisa diakses internal (admin/dosen). Diperlukan keputusan product owner: apakah portal publik P3M diperlukan untuk akreditasi/transparansi, atau dianggap di luar scope (informasi P3M dipublikasikan via situs lembaga lain).

**Tidak diangkat sebagai bug** karena ini adalah missing-feature, bukan defect dari fitur eksisting. Rekomendasi: buat issue tersendiri "Feature: P3M Public Portal" jika stakeholder menginginkannya.

## Catatan Skenario

- Audit dilakukan via `php artisan route:list --path=p3m` + grep `routes/web.php`.
- Endpoint `api/p3m/repositori/share/{token}` menyediakan akses publik per-dokumen via share-link tetapi bukan portal browseable.
