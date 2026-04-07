const { chromium } = require('playwright');
const path = require('path');

const DIR = path.join(__dirname, 'screenshots');
const BASE = 'http://127.0.0.1:8000';

async function createSession(browser, email) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/login`, { timeout: 10000 });
  await page.waitForSelector('input[name=login]', { timeout: 5000 });
  await page.fill('input[name=login]', email);
  await page.fill('input[name=password]', 'password');
  await page.click('button[type=submit]');
  await page.waitForURL('**/dashboard**', { timeout: 10000 });
  console.log(`  Logged in as: ${email}`);
  return { ctx, page };
}

async function capture(page, url, name, desc) {
  try {
    const resp = await page.goto(`${BASE}${url}`, { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);
    const status = resp ? resp.status() : 0;

    const bodyText = await page.textContent('body').catch(() => '');
    const is403 = status === 403 || bodyText.includes('403') || bodyText.includes('Unauthorized') || bodyText.includes('User does not have');
    const is500 = status === 500 || bodyText.includes('Server Error') || bodyText.includes('Whoops');
    const is404 = status === 404;

    if (is403) {
      console.log(`  FAIL 403: ${name} - ${url}`);
      await page.screenshot({ path: path.join(DIR, `${name}_403.png`), fullPage: true });
      return false;
    }
    if (is500) {
      console.log(`  FAIL 500: ${name} - ${url}`);
      await page.screenshot({ path: path.join(DIR, `${name}_500.png`), fullPage: true });
      return false;
    }
    if (is404) {
      console.log(`  FAIL 404: ${name} - ${url}`);
      await page.screenshot({ path: path.join(DIR, `${name}_404.png`), fullPage: true });
      return false;
    }

    await page.screenshot({ path: path.join(DIR, `${name}.png`), fullPage: true });
    console.log(`  OK: ${name} - ${desc}`);
    return true;
  } catch (e) {
    console.log(`  ERR: ${name} - ${e.message.substring(0, 80)}`);
    try { await page.screenshot({ path: path.join(DIR, `${name}_error.png`), fullPage: true }); } catch (_) {}
    return false;
  }
}

async function main() {
  const browser = await chromium.launch();
  let ok = 0, fail = 0;

  // ═══════════════════════ ADMIN ═══════════════════════
  console.log('\n=== ADMIN (admin@sttw.ac.id) ===');
  {
    const { ctx, page } = await createSession(browser, 'admin@sttw.ac.id');
    if (await capture(page, '/siakad/mahasiswa', '01_siakad-mahasiswa-list', 'Siakad Daftar Mahasiswa')) ok++; else fail++;
    if (await capture(page, '/siakad/program-studi', '02_siakad-prodi-list', 'Siakad Daftar Program Studi')) ok++; else fail++;
    if (await capture(page, '/p3m/admin/panduan/create', '03_p3m-panduan-create', 'P3M Admin Panduan Create')) ok++; else fail++;
    await ctx.close();
  }

  // ═══════════════════════ WAKET2 (HRM Admin) ═══════════════════════
  console.log('\n=== WAKET2 (waket2@sttw.ac.id) ===');
  {
    const { ctx, page } = await createSession(browser, 'waket2@sttw.ac.id');
    if (await capture(page, '/hrm/admin/presensi', '04_hrm-admin-presensi', 'HRM Admin Presensi Import')) ok++; else fail++;
    await ctx.close();
  }

  // ═══════════════════════ DOSEN ═══════════════════════
  console.log('\n=== DOSEN (budi.santoso@sttw.ac.id) ===');
  {
    const { ctx, page } = await createSession(browser, 'budi.santoso@sttw.ac.id');
    if (await capture(page, '/hrm/portal/kinerja/bahan-ajar/create', '05_hrm-bahan-ajar-create', 'HRM Bahan Ajar Create')) ok++; else fail++;
    if (await capture(page, '/hrm/portal/kinerja/bimbingan/create', '06_hrm-bimbingan-create', 'HRM Bimbingan Create')) ok++; else fail++;
    if (await capture(page, '/hrm/portal/kinerja/pengujian/create', '07_hrm-pengujian-create', 'HRM Pengujian Create')) ok++; else fail++;
    if (await capture(page, '/hrm/portal/kinerja/penghargaan/create', '08_hrm-penghargaan-create', 'HRM Penghargaan Create')) ok++; else fail++;
    if (await capture(page, '/hrm/portal/kinerja/penunjang/create', '09_hrm-penunjang-create', 'HRM Penunjang Create')) ok++; else fail++;
    if (await capture(page, '/hrm/portal/kinerja/tugas-tambahan/create', '10_hrm-tugas-tambahan-create', 'HRM Tugas Tambahan Create')) ok++; else fail++;
    if (await capture(page, '/hrm/portal/profil', '11_hrm-portal-profil', 'HRM Portal Profil')) ok++; else fail++;
    if (await capture(page, '/hrm/portal/laporan/ikd', '12_hrm-laporan-ikd', 'HRM Laporan IKD')) ok++; else fail++;
    if (await capture(page, '/hrm/portal/laporan/lkd', '13_hrm-laporan-lkd', 'HRM Laporan LKD')) ok++; else fail++;
    await ctx.close();
  }

  // ═══════════════════════ TENDIK ═══════════════════════
  console.log('\n=== TENDIK (rina.tendik@sttw.ac.id) ===');
  {
    const { ctx, page } = await createSession(browser, 'rina.tendik@sttw.ac.id');
    if (await capture(page, '/hrm/tendik/kinerja/penghargaan/create', '14_hrm-tendik-penghargaan', 'HRM Tendik Penghargaan Create')) ok++; else fail++;
    if (await capture(page, '/hrm/tendik/kinerja/penunjang/create', '15_hrm-tendik-penunjang', 'HRM Tendik Penunjang Create')) ok++; else fail++;
    if (await capture(page, '/hrm/tendik/kinerja/tugas-tambahan/create', '16_hrm-tendik-tugas-tambahan', 'HRM Tendik Tugas Tambahan Create')) ok++; else fail++;
    if (await capture(page, '/hrm/tendik/kinerja/pelayanan/create', '17_hrm-tendik-pelayanan', 'HRM Tendik Pelayanan Create')) ok++; else fail++;
    if (await capture(page, '/hrm/tendik/profil', '18_hrm-tendik-profil', 'HRM Tendik Profil')) ok++; else fail++;
    await ctx.close();
  }

  // ═══════════════════════ MAHASISWA ═══════════════════════
  console.log('\n=== MAHASISWA (ahmad.rizki@student.ac.id) ===');
  {
    const { ctx, page } = await createSession(browser, 'ahmad.rizki@student.ac.id');
    if (await capture(page, '/mahasiswa/pengajuan-surat/create', '19_mhs-pengajuan-surat', 'Mahasiswa Pengajuan Surat')) ok++; else fail++;
    if (await capture(page, '/mahasiswa/prestasi/create', '20_mhs-prestasi-create', 'Mahasiswa Prestasi Create')) ok++; else fail++;
    if (await capture(page, '/mahasiswa/bimbingan', '21_mhs-bimbingan', 'Mahasiswa Bimbingan')) ok++; else fail++;
    await ctx.close();
  }

  await browser.close();
  console.log(`\n=== RESULTS: ${ok} OK, ${fail} FAIL ===`);
  if (fail > 0) process.exit(1);
}

main().catch(e => { console.error(e.message); process.exit(1); });
