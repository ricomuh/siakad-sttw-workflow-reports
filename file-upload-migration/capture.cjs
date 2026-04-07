const { chromium } = require('playwright');
const path = require('path');

const SCREENSHOTS = path.join(__dirname, 'screenshots');
const BASE = 'http://127.0.0.1:8000';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  // Login as developer
  await page.goto(`${BASE}/login`);
  await page.fill('input[name=login]', 'developer@sttw.ac.id');
  await page.fill('input[name=password]', 'password');
  await page.click('button[type=submit]');
  await page.waitForURL('**/dashboard**', { timeout: 10000 });
  console.log('Logged in');

  const pages = [
    // Waket2
    { url: '/waket2/organisasi/create', name: '01_waket2-organisasi-create', desc: 'Waket2 Organisasi Create - Logo Upload' },
    
    // HRM Portal Kinerja
    { url: '/hrm/portal/kinerja/bahan-ajar/create', name: '02_hrm-bahan-ajar-create', desc: 'HRM Bahan Ajar Create' },
    { url: '/hrm/portal/kinerja/bimbingan/create', name: '03_hrm-bimbingan-create', desc: 'HRM Bimbingan Create' },
    { url: '/hrm/portal/kinerja/pengujian/create', name: '04_hrm-pengujian-create', desc: 'HRM Pengujian Create' },
    { url: '/hrm/portal/kinerja/penghargaan/create', name: '05_hrm-penghargaan-create', desc: 'HRM Penghargaan Create' },
    { url: '/hrm/portal/kinerja/penunjang/create', name: '06_hrm-penunjang-create', desc: 'HRM Penunjang Create' },
    { url: '/hrm/portal/kinerja/tugas-tambahan/create', name: '07_hrm-tugas-tambahan-create', desc: 'HRM Tugas Tambahan Create' },
    
    // HRM Profil (has 6 modals)
    { url: '/hrm/portal/profil', name: '08_hrm-portal-profil', desc: 'HRM Portal Profil' },
    
    // HRM Admin Presensi
    { url: '/hrm/admin/presensi', name: '09_hrm-admin-presensi', desc: 'HRM Admin Presensi Import' },
    
    // Mahasiswa
    { url: '/mahasiswa/pengajuan-surat/create', name: '10_mhs-pengajuan-surat', desc: 'Mahasiswa Pengajuan Surat' },
    { url: '/mahasiswa/organisasi/create', name: '11_mhs-organisasi-create', desc: 'Mahasiswa Organisasi Create' },
    { url: '/mahasiswa/prestasi/create', name: '12_mhs-prestasi-create', desc: 'Mahasiswa Prestasi Create' },
    
    // SISKA PKL
    { url: '/siska/pkl/registrations/create', name: '13_siska-pkl-registration', desc: 'SISKA PKL Registration' },
    
    // P3M
    { url: '/p3m/admin/panduan/create', name: '14_p3m-panduan-create', desc: 'P3M Panduan Create' },
    
    // PMB
    { url: '/pmb/steps/2', name: '15_pmb-pembayaran', desc: 'PMB Pembayaran' },
    
    // Admin Kemahasiswaan
    { url: '/admin-kemahasiswaan/pengajuan', name: '16_admin-kemahasiswaan', desc: 'Admin Kemahasiswaan Pengajuan' },
  ];

  for (const p of pages) {
    try {
      await page.goto(`${BASE}${p.url}`, { timeout: 15000 });
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}.png`), fullPage: true });
      console.log(`OK: ${p.name} - ${p.desc}`);
    } catch (e) {
      console.log(`ERR: ${p.name} - ${e.message.substring(0, 80)}`);
      // Screenshot whatever state we're in
      try {
        await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}_error.png`), fullPage: true });
      } catch (_) {}
    }
  }

  await browser.close();
  console.log('Done!');
}

main().catch(e => { console.error(e); process.exit(1); });
