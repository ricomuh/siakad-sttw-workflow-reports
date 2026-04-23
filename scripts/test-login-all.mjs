// Test login + dashboard visit for every demo credential.
// Captures HTTP status, page errors, and final URL.
//
// Run: node .workflow-reports/scripts/test-login-all.mjs
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BASE = 'http://127.0.0.1:8000';

const users = [
  { role: 'developer', email: 'developer@sttw.ac.id' },
  { role: 'admin', email: 'admin@sttw.ac.id' },
  { role: 'ketua', email: 'ketua@sttw.ac.id' },
  { role: 'waket1', email: 'waket1@sttw.ac.id' },
  { role: 'waket2', email: 'waket2@sttw.ac.id' },
  { role: 'waket3', email: 'waket3@sttw.ac.id' },
  { role: 'akademik', email: 'akademik@sttw.ac.id' },
  { role: 'admin-lpm', email: 'admin-lpm@sttw.ac.id' },
  { role: 'auditor-internal', email: 'auditor@sttw.ac.id' },
  { role: 'admin-kemahasiswaan', email: 'adminkemahasiswaan@sttw.ac.id' },
  { role: 'kaprodi', email: 'kaprodi@sttw.ac.id' },
  { role: 'dosen', email: 'budi.santoso@sttw.ac.id' },
  { role: 'dosen', email: 'ahmad.subagyo@sttw.ac.id' },
  { role: 'dosen', email: 'siti.nurhaliza@sttw.ac.id' },
  { role: 'dosen', email: 'bambang.s@sttw.ac.id' },
  { role: 'dosen', email: 'pembimbing@sttw.ac.id' },
  { role: 'dosen', email: 'penguji@sttw.ac.id' },
  { role: 'tendik', email: 'rina.tendik@sttw.ac.id' },
  { role: 'tendik', email: 'hendra.tendik@sttw.ac.id' },
  { role: 'mahasiswa', email: 'ahmad.rizki@student.ac.id' },
  { role: 'mahasiswa', email: 'siti.rahma@student.ac.id' },
  { role: 'mahasiswa', email: 'haris.firman@student.ac.id' },
  { role: 'mahasiswa', email: 'mhs1@sttw.ac.id' },
  { role: 'mahasiswa', email: 'mhs2@sttw.ac.id' },
  { role: 'mahasiswa', email: 'mhs3@sttw.ac.id' },
  { role: 'mahasiswa-baru', email: 'mahasiswa-baru@sttw.ac.id' },
];

const results = [];
const browser = await chromium.launch({ headless: true });

for (const u of users) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message.split('\n')[0]));
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text().split('\n')[0].slice(0, 200)); });

  let status = 'FAIL';
  let finalUrl = '';
  let detail = '';

  try {
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.fill('input[name="login"]', u.email);
    await page.fill('input[name="password"]', 'password');
    await Promise.all([
      page.waitForLoadState('networkidle', { timeout: 25000 }),
      page.click('button[type="submit"]'),
    ]);
    finalUrl = page.url();
    if (finalUrl.includes('/login')) {
      status = 'LOGIN_REJECTED';
      const err = await page.locator('.text-red-600, [role="alert"], .invalid-feedback').first().textContent().catch(() => '');
      detail = err?.trim().slice(0, 200) || 'no error message visible';
    } else {
      const resp = await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle', timeout: 25000 }).catch((e) => ({ status: () => 0, _err: e.message }));
      const httpStatus = resp.status?.() ?? 0;
      finalUrl = page.url();
      if (httpStatus >= 500) {
        status = `DASHBOARD_${httpStatus}`;
        const body = await page.content();
        const m = body.match(/<title>([^<]+)<\/title>/i);
        detail = m ? m[1].slice(0, 200) : `HTTP ${httpStatus}`;
      } else if (httpStatus >= 400) {
        status = `DASHBOARD_${httpStatus}`;
        detail = `HTTP ${httpStatus}`;
      } else if (httpStatus === 0) {
        status = 'NAV_ERROR';
        detail = resp._err?.slice(0, 200) || 'unknown';
      } else {
        status = 'OK';
      }
    }
  } catch (e) {
    status = 'EXCEPTION';
    detail = String(e.message).split('\n')[0].slice(0, 200);
  }

  results.push({
    role: u.role, email: u.email, status,
    finalUrl: finalUrl.replace(BASE, '') || '-',
    pageErrors: pageErrors.length,
    consoleErrors: consoleErrors.length,
    firstPageError: pageErrors[0] || '',
    firstConsoleError: consoleErrors[0] || '',
    detail,
  });
  console.log(`[${status}] ${u.role.padEnd(22)} ${u.email.padEnd(36)} -> ${finalUrl.replace(BASE, '')} ${detail ? `(${detail.slice(0, 90)})` : ''}`);
  await ctx.close();
}

await browser.close();
writeFileSync('.workflow-reports/scripts/test-login-results.json', JSON.stringify(results, null, 2));
console.log('\nWrote .workflow-reports/scripts/test-login-results.json');
