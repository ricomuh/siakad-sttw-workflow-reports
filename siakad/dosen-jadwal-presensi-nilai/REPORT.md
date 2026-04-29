# SIAKAD — Dosen: Jadwal Mengajar, Presensi, & Input Nilai

**Modul:** SIAKAD → Dosen
**Aktor:** Dr. Budi Santoso, M.Kom (`budi.santoso@sttw.ac.id`, role `dosen` + `asesor`)
**Tanggal:** 2026-04-22
**Pelaksana:** Workflow Reporter (Session B)

## Skenario

Dosen melihat jadwal mengajarnya, masuk ke mata kuliah yang diampu, lalu mengelola presensi mahasiswa & input nilai per komponen.

## Langkah Pengujian

1. Buka **`/siakad/dosen/jadwal-mengajar`** — daftar jadwal mengajar dosen pada periode aktif.
   ![Jadwal Mengajar Dosen](screenshots/01_jadwal-mengajar.png)

2. Buka **`/siakad/dosen/mata-kuliah`** — daftar mata kuliah yang diampu, masing-masing dengan tombol **Lihat Detail**.
   ![Daftar Mata Kuliah](screenshots/02_mata-kuliah-list.png)

3. Klik salah satu detail (`/siakad/dosen/mata-kuliah/7`). Halaman detail menampilkan tab navigasi: **Penilaian**, **Presensi**, **Kuesioner**, **Grafik Kuesioner**.
   ![Detail Mata Kuliah](screenshots/03_mata-kuliah-detail.png)

4. Buka tab **Presensi** (`?tab=presensi`) — tabel presensi per pertemuan, dengan kolom mahasiswa & tombol absensi (hadir / izin / sakit / alpa). Dosen juga dapat input pertemuan baru jika sesi berlangsung.
   ![Tab Presensi](screenshots/04_mk-presensi.png)

5. Buka tab **Penilaian** (`?tab=penilaian`) — tabel input nilai per komponen (UTS, UAS, Tugas, dll) sesuai bobot yang ditetapkan admin/Waket1. Tersedia tombol export ke Excel via endpoint `siakad.dosen.mata-kuliah.nilai.export`.
   ![Tab Penilaian](screenshots/05_mk-penilaian.png)

## Fitur Yang Diuji

| Fitur | Endpoint | Status |
|---|---|---|
| Jadwal Mengajar | `siakad.dosen.jadwal-mengajar.index` | ✅ |
| Daftar Mata Kuliah | `siakad.dosen.mata-kuliah.index` | ✅ |
| Detail Mata Kuliah (4 tab) | `siakad.dosen.mata-kuliah.show` | ✅ |
| Tab Presensi | `?tab=presensi` (sub-action: input absensi pertemuan) | ✅ (UI) |
| Tab Penilaian | `?tab=penilaian` (sub-action: `…nilai.update` + `…nilai.export`) | ✅ (UI) |
| Tab Kuesioner & Grafik | `?tab=kuesioner` / `?tab=grafik-kuesioner` | ✅ (link) |

## Temuan & Masalah

Tidak ada error. Input absensi & nilai diuji pada level UI/route saja — tidak melakukan POST aktual untuk menjaga data dosen ini bersih.

## Catatan

- Sesi ini menutup **TASK-010** (dosen jadwal/presensi/nilai) yang sebelumnya berstatus ⚠️ Partial pada plan `2026-04-21-process-workflow-reporter-all-modules-1.md`.
- Validasi presensi mahasiswa (sisi mahasiswa) ada di laporan `siakad/mahasiswa-jadwal-presensi/`.
- Validasi presensi sebagai admin sudah ada di `siakad/admin-presensi-dosen/` & `siakad/admin-presensi-mahasiswa/`.
