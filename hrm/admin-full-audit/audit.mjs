import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import path from 'path';

const BASE = 'http://127.0.0.1:8000';
const SCREENSHOTS = path.resolve('.workflow-reports/hrm-full-audit/screenshots');
mkdirSync(SCREENSHOTS, { recursive: true });

let stepNum = 0;
const issues = [];

function nextStep() { return String(++stepNum).padStart(2, '0'); }

async function screenshot(page, name, fullPage = true) {
  const file = path.join(SCREENSHOTS, `${nextStep()}_${name}.png`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: file, fullPage });
  console.log(`📸 ${path.basename(file)}`);
  return file;
}

async function login(page, email, password = 'password') {
  await page.context().clearCookies();
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.fill('input[name="login"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
}

async function visit(page, url, name, opts = {}) {
  try {
    const resp = await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle', timeout: 15000 });
    const status = resp?.status() || 0;
    if (status >= 400) {
      issues.push({ url, status, name });
      console.log(`⚠️  ${url} → HTTP ${status}`);
    }
    await screenshot(page, name, opts.fullPage !== false);
    return status;
  } catch (err) {
    issues.push({ url, status: 0, name, error: err.message });
    console.log(`❌ ${url} → ${err.message.substring(0, 80)}`);
    await screenshot(page, `${name}-error`);
    return 0;
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  // ═══════════════════════════════════════════════════════════
  // SECTION 1: Admin HRM (waket2)
  // ═══════════════════════════════════════════════════════════
  console.log('\n🔑 === WAKET2 (Admin HRM) ===');
  await login(page, 'waket2@sttw.ac.id');
  await screenshot(page, 'waket2-dashboard');

  await visit(page, '/hrm/admin', 'admin-hrm-dashboard');
  await visit(page, '/hrm/admin/jadwal-kinerja', 'admin-jadwal-kinerja');
  await visit(page, '/hrm/admin/jadwal-kinerja/create', 'admin-jadwal-create');
  await visit(page, '/hrm/admin/asesor', 'admin-asesor-index');
  await visit(page, '/hrm/admin/asesor-assign', 'admin-asesor-assign');
  await visit(page, '/hrm/admin/presensi', 'admin-presensi-import');
  await visit(page, '/hrm/admin/dosen', 'admin-dosen-list');
  await visit(page, '/hrm/admin/tendik', 'admin-tendik-list');
  await visit(page, '/hrm/admin/jenis-tendik', 'admin-jenis-tendik');
  await visit(page, '/hrm/admin/jenis-tendik/create', 'admin-jenis-tendik-create');
  await visit(page, '/hrm/admin/kuesioner', 'admin-kuesioner');
  await visit(page, '/hrm/admin/kuesioner/create', 'admin-kuesioner-create');
  await visit(page, '/hrm/admin/kuesioner-distribusi', 'admin-kuesioner-distribusi');
  await visit(page, '/hrm/admin/penugasan-atasan', 'admin-penugasan-atasan');
  await visit(page, '/hrm/admin/scoring-config', 'admin-scoring-config');

  // Laporan (waket2 has hrm.laporan.view)
  await visit(page, '/hrm/laporan', 'admin-laporan-dashboard');
  await visit(page, '/hrm/laporan/dosen', 'admin-laporan-dosen');
  await visit(page, '/hrm/laporan/tendik', 'admin-laporan-tendik');

  // ═══════════════════════════════════════════════════════════
  // SECTION 2: Asesor (Dr. Budi Santoso)
  // ═══════════════════════════════════════════════════════════
  console.log('\n🔑 === ASESOR (Dr. Budi Santoso) ===');
  await login(page, 'budi.santoso@sttw.ac.id');
  await screenshot(page, 'budi-dashboard');

  await visit(page, '/hrm/asesor', 'asesor-dashboard');
  await visit(page, '/hrm/asesor/rekap', 'asesor-rekap');

  // ═══════════════════════════════════════════════════════════
  // SECTION 3: Portal Dosen (Siti Nurhaliza)
  // ═══════════════════════════════════════════════════════════
  console.log('\n🔑 === DOSEN (Siti Nurhaliza) ===');
  await login(page, 'siti.nurhaliza@sttw.ac.id');
  await screenshot(page, 'siti-dashboard');

  await visit(page, '/hrm/portal', 'portal-dosen-dashboard');
  await visit(page, '/hrm/portal/profil', 'portal-profil');
  await visit(page, '/hrm/portal/profil/kepangkatan', 'portal-kepangkatan');
  await visit(page, '/hrm/portal/profil/jabatan-fungsional', 'portal-jabfung');
  await visit(page, '/hrm/portal/profil/inpassing', 'portal-inpassing');
  await visit(page, '/hrm/portal/kinerja/bimbingan', 'portal-bimbingan');
  await visit(page, '/hrm/portal/kinerja/pengujian', 'portal-pengujian');
  await visit(page, '/hrm/portal/kinerja/bahan-ajar', 'portal-bahan-ajar');
  await visit(page, '/hrm/portal/kinerja/tugas-tambahan', 'portal-tugas-tambahan');
  await visit(page, '/hrm/portal/kinerja/penunjang', 'portal-penunjang');
  await visit(page, '/hrm/portal/kinerja/penghargaan', 'portal-penghargaan');
  await visit(page, '/hrm/portal/kinerja/pengajaran', 'portal-pengajaran');
  await visit(page, '/hrm/portal/kinerja/penelitian', 'portal-penelitian');
  await visit(page, '/hrm/portal/kinerja/pengabdian', 'portal-pengabdian');
  await visit(page, '/hrm/portal/kinerja/diklat', 'portal-diklat');
  await visit(page, '/hrm/portal/kinerja/sertifikasi', 'portal-sertifikasi');
  await visit(page, '/hrm/portal/kinerja/tes-kompetensi', 'portal-tes-kompetensi');
  await visit(page, '/hrm/portal/presensi-cico', 'portal-presensi-cico');
  // Laporan Dosen
  await visit(page, '/hrm/portal/laporan/lkd', 'portal-laporan-lkd');
  await visit(page, '/hrm/portal/laporan/ikd', 'portal-laporan-ikd');
  await visit(page, '/hrm/portal/laporan/kehadiran', 'portal-laporan-kehadiran');
  await visit(page, '/hrm/portal/laporan/skor', 'portal-laporan-skor');

  // ═══════════════════════════════════════════════════════════
  // SECTION 4: Portal Tendik (Rina Sulistiani)
  // ═══════════════════════════════════════════════════════════
  console.log('\n🔑 === TENDIK (Rina Sulistiani) ===');
  await login(page, 'rina.tendik@sttw.ac.id');
  await screenshot(page, 'rina-dashboard');

  await visit(page, '/hrm/tendik', 'tendik-dashboard');
  await visit(page, '/hrm/tendik/profil', 'tendik-profil');
  await visit(page, '/hrm/tendik/kinerja/pelayanan', 'tendik-pelayanan');
  await visit(page, '/hrm/tendik/kinerja/tugas-tambahan', 'tendik-tugas-tambahan');
  await visit(page, '/hrm/tendik/kinerja/penunjang', 'tendik-penunjang');
  await visit(page, '/hrm/tendik/kinerja/penghargaan', 'tendik-penghargaan');
  await visit(page, '/hrm/tendik/presensi-cico', 'tendik-presensi-cico');

  // ═══════════════════════════════════════════════════════════
  // SECTION 5: Developer (full access test)
  // ═══════════════════════════════════════════════════════════
  console.log('\n🔑 === DEVELOPER (full access) ===');
  await login(page, 'developer@sttw.ac.id');
  await visit(page, '/hrm/admin', 'dev-hrm-admin');
  await visit(page, '/hrm/portal', 'dev-hrm-portal');
  await visit(page, '/hrm/asesor', 'dev-hrm-asesor');

  await browser.close();

  // Print summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`✅ Audit complete! ${stepNum} screenshots taken.`);
  if (issues.length) {
    console.log(`\n⚠️  ${issues.length} issues found:`);
    for (const i of issues) {
      console.log(`   ${i.status || 'ERR'} ${i.url} (${i.name})`);
    }
  } else {
    console.log('🎉 No issues found!');
  }
}

run().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
