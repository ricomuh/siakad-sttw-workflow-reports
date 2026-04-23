# Login Test Report — All Demo Users

**Tanggal**: 2026-04-23
**Tooling**: Playwright (Node, headless Chromium)
**Script**: `scripts/test-login-all.mjs`
**Hasil JSON**: `scripts/test-login-results.json`
**Branch**: `dev/seeder-completeness` (commit b20297b)

## Ringkasan

- Total user: **26**
- Berhasil login + dashboard 200: **26 / 26** ✅
- Gagal: **0**

## Latar Belakang

Setelah `php artisan migrate:fresh --seed` di MySQL lokal, dilakukan
test login otomatis untuk **seluruh kredensial demo** (lihat `CREDENTIALS.md`)
guna memastikan semua role bisa membuka dashboard tanpa error 500.

## Bug yang Ditemukan & Diperbaiki

### 1. Dashboard 500 untuk role admin/ketua/waket1/akademik

**Root cause**: `P3mDummySeeder.php` masih memakai backing value lowercase
(`'penelitian'`, `'disetujui'`, `'revisi'`, `'diajukan'`, `'selesai'`,
`'pelaksanaan'`, `'seleksi'`, `'diterima'`) sementara enum aktual sudah
TitleCase (`Penelitian`, `Diterima`, dll).

Saat `dashboard/unified.blade.php` melakukan hydrate model P3M lewat enum
cast → `ValueError: 'penelitian' is not a valid backing value for enum App\Enums\JenisP3m`.

**Roles yang terdampak**: admin, ketua, waket1, akademik (semua melihat
widget P3M di unified dashboard). Role lain memakai widget berbeda → tidak crash.

**Fix**: Commit `b20297b` di `dev/seeder-completeness` — sinkronkan semua
backing value ke kasus TitleCase sesuai enum.

## Hasil Akhir

Setelah fix + `migrate:fresh --seed` ulang, **26 / 26 user** berhasil login
dan dashboard return 200. Lihat `scripts/test-login-results.json` untuk
detail per-user.

## Cara Reproduce

```bash
# Dari root project siakad-sttw
php artisan serve            # pastikan jalan di 127.0.0.1:8000
php artisan migrate:fresh --seed --force
node .workflow-reports/scripts/test-login-all.mjs
```
