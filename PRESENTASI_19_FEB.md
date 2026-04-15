# 📊 Alur Presentasi & Checklist Update Sistem (Meeting 19 Feb 2026)

Dokumen ini adalah panduan navigasi untuk mempresentasikan progress pengembangan sistem SIAKAD STTW. Silakan klik tautan **[Lihat Laporan]** pada poin yang sudah selesai untuk menampilkan bukti *screenshot* (UI/UX) dan alur kerjanya.

---

## 🌟 BAGIAN 1: Modul Utama (Big Features)

Sebelum masuk ke detail 29 poin rapat, presentasikan terlebih dahulu ketiga modul besar yang sudah rampung:

- [x] **HRM (Human Resource Management)**
  - Kinerja Dosen & LKD: [Lihat Laporan](./hrm-full-audit/REPORT.md)
  - Kinerja Tendik & Penilaian: [Lihat Laporan](./hrm-dashboard-tendik/REPORT.md)
  - Penilaian Asesor: [Lihat Laporan](./hrm-asesor/REPORT.md)
- [x] **SIM P3M (Penelitian & Pengabdian)**
  - Dashboard Admin P3M: [Lihat Laporan](./p3m-admin-dashboard/REPORT.md)
  - Pengajuan Proposal (Dosen): [Lihat Laporan](./p3m-dosen-proposal/REPORT.md)
  - Validasi Laporan & Luaran: [Lihat Laporan](./p3m-admin-laporan/REPORT.md)
- [x] **LPM (Lembaga Penjaminan Mutu)**
  - Dashboard Admin LPM & PPEPP: [Lihat Laporan](./lpm-admin-dashboard/REPORT.md)
  - Portal Publik LPM: [Lihat Laporan](./lpm-portal-home/REPORT.md)
  - Audit Mutu Internal (Auditor): [Lihat Laporan](./lpm-auditor-dashboard/REPORT.md)

---

## 📋 BAGIAN 2: Review 29 Poin Hasil Meeting 19 Februari 2026

Berikut adalah tracking penyelesaian 29 poin yang diminta:

### A. Akademik, Nilai & E-Learning
- [x] **1. Integrasi kategori penelitian atau pengabdian**  
  *Modul P3M kini sudah terbagi jelas kategori dan terintegrasi.* ➔ [Lihat Laporan P3M](./p3m-admin-dashboard/REPORT.md)
- [ ] **2. BAP -> kesimpulan dari 1 semester mengajar**  
  *(Fitur E-learning/BAP - Belum didokumentasikan di batch ini)*
- [x] **3. Mhs tidak bisa lihat nilai sebelum yudisium**  
  *(Logic backend sudah diterapkan di core Siakad, membatasi view nilai berdasarkan status kelulusan/yudisium).*
- [x] **4. Export PDF bisa namun masih error (server leolit)**  
  *Error 500 sudah di-* **FIXED**. *Export PDF (seperti KHS, Laporan Kinerja, PPEPP) kini berjalan normal.*
- [x] **5. E-learning Updates**  
  - Kinerja dosen (data mhs anonim) & Jadwal: *(Fitur E-learning)*
  - Materi & Presensi Manual: *(Fitur E-learning)*
  - **Blokir nilai pending sebelum bayar**: Sudah di-*FIXED*. Dosen bisa input nilai komponen, tapi finalisasi ditahan jika tagihan belum lunas. Terdapat *toggle override* oleh Admin. ➔ [Lihat Laporan Block Nilai](./phase2-surat-edaran-tagihan/REPORT.md)
  - Kuesioner mhs: ➔ [Lihat Laporan Kuesioner](./hrm-full-audit/REPORT.md)
- [x] **6 & 7. Form konversi nilai (skala 4 & huruf otomatis) terintegrasi**  
  *Form manajemen konversi nilai (blended/kampus lama) sudah tersedia.* ➔ [Lihat Laporan Konversi](./konversi-nilai/REPORT.md)
- [x] **12. Presensi ujian bisa cetak**  
  *(Fitur tersedia di modul Ujian SIAKAD).*
- [x] **13. KHS cetak massal 1 angkatan**  
  *Fitur bulk-print dokumen akademik sudah tersedia.*
- [x] **23. Kuesioner seperti di elearning**  
  *Sistem kuesioner dinamis terintegrasi (seperti IKD di HRM).* ➔ [Lihat Laporan Kuesioner](./hrm-full-audit/REPORT.md)
- [x] **25. Export excel status KRS mahasiswa hasil filter**  
  *Fitur export rekap, status, dan belum KRS sudah tersedia.*
- [x] **26. Pengakuan makul di tempat lain (nilai kampus sebelumnya)**  
  *Terakomodasi di fitur Konversi Nilai.* ➔ [Lihat Laporan Konversi](./konversi-nilai/REPORT.md)
- [ ] **27. Fitur remedial**  
  *(Belum ditemukan rute/kodenya, dalam tahap pengembangan).*
- [x] **29. Cetak kartu UTS dihilangkan kuesionernya**  
  *Halaman cetak kartu ujian Mhs sudah disesuaikan.* ➔ [Lihat Laporan Kartu Ujian](./kartu-ujian-mahasiswa/REPORT.md)

### B. Keuangan & Notifikasi
- [x] **8. Rekap data mhs yang belum KRS**  
  *Bisa diekspor ke Excel melalui menu Monitoring KRS.*
- [x] **9. H-1 warning penagihan by WA/Email ke ortu**  
  *(Berjalan di background system / cron job otomatis).*
- [x] **10. Notifikasi SE pembayaran**  
  *Sistem broadcast Surat Edaran via Email & In-App Notification berdasarkan target (Prodi/Angkatan/Status Tagihan) sudah selesai.* ➔ [Lihat Laporan SE](./phase2-surat-edaran-tagihan/REPORT.md)
- [x] **11. Auto synchronize**  
  *(Service sinkronisasi berjalan otomatis di background).*

### C. SISKA & Kemahasiswaan
- [x] **14. SISKA -> keterangan surat apa yang di upload**  
  *Form pengajuan surat telah diperbarui dengan deskripsi file pendukung.* ➔ [Lihat Laporan Pengajuan Surat](./file-upload-migration/REPORT.md)
- [x] **15. Upload LPJ dan pencatatan organisasi**  
  *Modul Organisasi Mahasiswa sudah dapat diakses (Mahasiswa).* Admin Waket2 masih tahap penyempurnaan permission. ➔ [Lihat Laporan Organisasi](./organisasi-mahasiswa/REPORT.md)
- [x] **17. Verifikasi syarat pendaftar PKL, TA, Wisuda (tampilan tahapan mhs)**  
  *Admin dapat melihat "Stepper Status" proses mahasiswa yang sangat jelas (contoh: Diajukan ➔ Verif Dosen ➔ Sidang).* ➔ [Lihat Tahapan PKL (Admin)](./pkl-admin/REPORT.md) | [Tahapan TA (Admin)](./ta-admin/REPORT.md)
- [x] **18. Module wisuda di SISKA**  
  *Modul Wisuda sudah beroperasi meliputi Manajemen Periode, Verifikasi, Pendaftaran Mhs, dan Keuangan.* ➔ [Lihat Laporan Wisuda Admin](./wisuda-admin/REPORT.md) | [Wisuda Mhs](./wisuda-mahasiswa/REPORT.md)
- [x] **19. User bisa lihat tahapan mhs di SISKA**  
  *Mahasiswa kini bisa melihat posisi pengajuan mereka (Tracker visual 7 langkah).* ➔ [Lihat Tracker Mhs (PKL)](./pkl-mahasiswa/REPORT.md)
- [x] **20. Monitoring rekap KKN, PKL, TA (tampilkan status stuck dimana)**  
  *Tersedia Dashboard Monitoring Khusus Admin (dengan filter status komprehensif).* ➔ [Lihat Monitoring PKL](./pkl-admin/REPORT.md) | [Monitoring TA](./ta-admin/REPORT.md) | [Monitoring KKN](./kkn-admin/REPORT.md)
- [x] **21. Edit data dosen -> dropdown Jabatan Fungsional**  
  *Dropdown khusus sudah ditambahkan pada profil dosen.* ➔ [Lihat Laporan Profil Dosen](./hrm-full-audit/REPORT.md)
- [ ] **22. Module PKKMB**  
  *(Masih dalam tahap perancangan/belum masuk di branch).*
- [x] **24. Web utk repository**  
  *Sistem Bank Dokumen LPM dan Repositori Dosen P3M.* ➔ [Lihat Laporan Bank Dokumen](./lpm-admin-dokumen/REPORT.md)
- [x] **28. Rekognisi prestasi mahasiswa**  
  *Mahasiswa bisa mengajukan rekognisi prestasi untuk diverifikasi BAA.* ➔ [Lihat Bukti Upload Prestasi](./file-upload-migration/REPORT.md)

### D. Penerimaan Mahasiswa Baru (PMB)
- [x] **16. PMB Terpadu**  
  - Register menu disamakan ✅
  - VA digenerate setelah register ✅
  - Mengakomodasi NIM untuk seterusnya (Integrasi tombol Konversi Mhs) ✅ ➔ [Lihat Konversi PMB](./pmb-konversi/REPORT.md)
  - Tampilan ceklist tahapan mahasiswa & Cetak Kartu ✅ ➔ [Lihat Detail Verifikasi PMB](./pmb-approval/REPORT.md) | [Dashboard PMB](./pmb-dashboard/REPORT.md)
