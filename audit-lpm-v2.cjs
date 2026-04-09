const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PAGES = {
  'lpm-admin': [
    ['01_dashboard', '/lpm/admin'],
    ['02_kebijakan-index', '/lpm/admin/kebijakan'],
    ['03_standar-institusi-index', '/lpm/admin/standar-institusi'],
    ['04_standar-lain-index', '/lpm/admin/standar-lain'],
    ['05_standar-pt-index', '/lpm/admin/standar-pt'],
    ['06_dokumen-spmi-index', '/lpm/admin/dokumen-spmi'],
    ['07_formulir-index', '/lpm/admin/formulir'],
    ['08_sk-akreditasi-index', '/lpm/admin/sk-akreditasi'],
    ['09_sk-pendirian-index', '/lpm/admin/sk-pendirian'],
    ['10_profil-pt-index', '/lpm/admin/profil-pt'],
    ['11_prodi-index', '/lpm/admin/prodi'],
    ['12_pelaksanaan-index', '/lpm/admin/pelaksanaan'],
    ['13_evaluasi-index', '/lpm/admin/evaluasi'],
    ['14_pengendalian-index', '/lpm/admin/pengendalian'],
    ['15_peningkatan-index', '/lpm/admin/peningkatan'],
    ['16_ami-jadwal-index', '/lpm/admin/ami-jadwal'],
    ['17_ami-formulir-template-index', '/lpm/admin/ami-formulir-template'],
    ['18_ami-temuan-index', '/lpm/admin/ami-temuan'],
    ['19_dokumen-index', '/lpm/admin/dokumen'],
    ['20_setting-index', '/lpm/admin/setting'],
  ],
  'lpm-auditor': [
    ['01_auditor-dashboard', '/lpm/auditor'],
    ['02_auditor-penugasan', '/lpm/auditor/penugasan'],
    ['03_auditor-temuan', '/lpm/auditor/temuan'],
  ],
  'lpm-kaprodi': [
    ['01_kaprodi-dashboard', '/lpm/kaprodi'],
    ['02_kaprodi-standar', '/lpm/kaprodi/standar'],
    ['03_kaprodi-temuan', '/lpm/kaprodi/temuan'],
  ],
  'lpm-portal': [
    ['01_portal-home', '/lpm/portal'],
    ['02_portal-profil', '/lpm/portal/profil'],
    ['03_portal-penetapan', '/lpm/portal/penetapan'],
    ['04_portal-pelaksanaan', '/lpm/portal/pelaksanaan'],
    ['05_portal-evaluasi', '/lpm/portal/evaluasi'],
    ['06_portal-pengendalian', '/lpm/portal/pengendalian'],
    ['07_portal-peningkatan', '/lpm/portal/peningkatan'],
    ['08_portal-prodi', '/lpm/portal/prodi'],
    ['09_portal-akreditasi', '/lpm/portal/akreditasi'],
    ['10_portal-dokumen', '/lpm/portal/dokumen'],
  ],
};

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  
  // Login
  await page.goto('http://127.0.0.1:8000/login');
  await page.fill('input[name="login"]', 'developer@sttw.ac.id');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard**');
  console.log('Logged in');
  
  let total = 0, ok = 0, errors = [];
  
  for (const [group, pages] of Object.entries(PAGES)) {
    const dir = path.join('.workflow-reports', group, 'screenshots');
    fs.mkdirSync(dir, { recursive: true });
    
    for (const [name, url] of pages) {
      total++;
      try {
        const resp = await page.goto('http://127.0.0.1:8000' + url, { waitUntil: 'networkidle', timeout: 15000 });
        const status = resp?.status() || 0;
        const content = await page.content();
        const hasError = content.includes('Whoops') || content.includes('Server Error') || 
                        content.includes('Not Found') || status >= 400;
        
        await page.screenshot({ path: path.join(dir, name + '.png'), fullPage: true });
        
        if (hasError) {
          errors.push({ group, name, url, status, error: 'Page error detected' });
          console.log(`  ERROR: ${name} (${status})`);
        } else {
          ok++;
          console.log(`  OK: ${name}`);
        }
      } catch (e) {
        errors.push({ group, name, url, error: e.message });
        console.log(`  FAIL: ${name} - ${e.message}`);
      }
    }
  }
  
  console.log(`\n=== RESULTS: ${ok}/${total} OK, ${errors.length} errors ===`);
  errors.forEach(e => console.log(`  ${e.group}/${e.name}: ${e.error}`));
  
  await browser.close();
})();
