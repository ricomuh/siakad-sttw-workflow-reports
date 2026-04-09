const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:8000';
const REPORT_DIR = '.workflow-reports';

async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function screenshot(page, dir, name) {
    const filePath = path.join(dir, 'screenshots', `${name}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`  ✅ ${name}`);
    return filePath;
}

async function visitPage(page, url, dir, name, expectError = false) {
    try {
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await delay(500);
        const status = response?.status();
        
        // Check for error pages
        const bodyText = await page.textContent('body').catch(() => '');
        const hasError = bodyText.includes('Server Error') || bodyText.includes('500') && bodyText.includes('error')
            || bodyText.includes('404') || bodyText.includes('403') || bodyText.includes('Whoops');
        
        if (hasError && !expectError) {
            console.log(`  ❌ ERROR on ${url} (status: ${status})`);
            await screenshot(page, dir, `ERROR_${name}`);
            return { url, name, status, error: true, errorText: bodyText.substring(0, 200) };
        }
        
        await screenshot(page, dir, name);
        return { url, name, status, error: false };
    } catch (err) {
        console.log(`  ❌ TIMEOUT/ERROR on ${url}: ${err.message.substring(0, 100)}`);
        await page.screenshot({ path: path.join(dir, 'screenshots', `ERROR_${name}.png`), fullPage: true }).catch(() => {});
        return { url, name, status: 0, error: true, errorText: err.message };
    }
}

async function main() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    
    const results = { admin: [], auditor: [], kaprodi: [], portal: [] };
    const errors = [];
    
    // ============ LOGIN AS DEVELOPER ============
    console.log('\n🔐 Logging in as developer...');
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
    await page.fill('input[name="login"]', 'developer@sttw.ac.id');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard**', { timeout: 10000 }).catch(() => {});
    await delay(1000);
    console.log('  ✅ Logged in\n');
    
    // ============ ADMIN PAGES ============
    const adminDir = path.join(REPORT_DIR, 'lpm-admin');
    console.log('📋 ADMIN PAGES:');
    
    // Dashboard
    let r = await visitPage(page, `${BASE}/lpm/admin`, adminDir, '01_dashboard');
    results.admin.push(r);
    if (r.error) errors.push(r);
    
    // Kebijakan CRUD
    r = await visitPage(page, `${BASE}/lpm/admin/kebijakan`, adminDir, '02_kebijakan-index');
    results.admin.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/admin/kebijakan/create`, adminDir, '03_kebijakan-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Get first kebijakan ID for show/edit
    let kebijakanId = await page.evaluate(() => {
        return document.querySelector('table tbody tr td a')?.href?.match(/kebijakan\/(\d+)/)?.[1];
    }).catch(() => null);
    if (!kebijakanId) {
        await page.goto(`${BASE}/lpm/admin/kebijakan`, { waitUntil: 'networkidle' });
        kebijakanId = await page.evaluate(() => {
            const links = document.querySelectorAll('a[href*="kebijakan/"]');
            for (const l of links) { const m = l.href.match(/kebijakan\/(\d+)/); if (m) return m[1]; }
            return null;
        }).catch(() => null);
    }
    if (kebijakanId) {
        r = await visitPage(page, `${BASE}/lpm/admin/kebijakan/${kebijakanId}`, adminDir, '04_kebijakan-show');
        results.admin.push(r); if (r.error) errors.push(r);
        r = await visitPage(page, `${BASE}/lpm/admin/kebijakan/${kebijakanId}/edit`, adminDir, '05_kebijakan-edit');
        results.admin.push(r); if (r.error) errors.push(r);
    }
    
    // Standar Institusi
    r = await visitPage(page, `${BASE}/lpm/admin/standar-institusi`, adminDir, '06_standar-institusi-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/standar-institusi/create`, adminDir, '07_standar-institusi-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Dokumen SPMI
    r = await visitPage(page, `${BASE}/lpm/admin/dokumen-spmi`, adminDir, '08_dokumen-spmi-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/dokumen-spmi/create`, adminDir, '09_dokumen-spmi-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Formulir
    r = await visitPage(page, `${BASE}/lpm/admin/formulir`, adminDir, '10_formulir-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/formulir/create`, adminDir, '11_formulir-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // SK Pendirian
    r = await visitPage(page, `${BASE}/lpm/admin/sk-pendirian`, adminDir, '12_sk-pendirian-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/sk-pendirian/create`, adminDir, '13_sk-pendirian-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // SK Akreditasi
    r = await visitPage(page, `${BASE}/lpm/admin/sk-akreditasi`, adminDir, '14_sk-akreditasi-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/sk-akreditasi/create`, adminDir, '15_sk-akreditasi-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Standar Lain
    r = await visitPage(page, `${BASE}/lpm/admin/standar-lain`, adminDir, '16_standar-lain-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/standar-lain/create`, adminDir, '17_standar-lain-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Standar PT
    r = await visitPage(page, `${BASE}/lpm/admin/standar-pt`, adminDir, '18_standar-pt-index');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Profil PT
    r = await visitPage(page, `${BASE}/lpm/admin/profil-pt`, adminDir, '19_profil-pt-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/profil-pt/edit`, adminDir, '20_profil-pt-edit');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Prodi
    r = await visitPage(page, `${BASE}/lpm/admin/prodi`, adminDir, '21_prodi-index');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // PPEPP: Pelaksanaan
    r = await visitPage(page, `${BASE}/lpm/admin/pelaksanaan`, adminDir, '22_pelaksanaan-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/pelaksanaan/create`, adminDir, '23_pelaksanaan-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // PPEPP: Evaluasi
    r = await visitPage(page, `${BASE}/lpm/admin/evaluasi`, adminDir, '24_evaluasi-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/evaluasi/create`, adminDir, '25_evaluasi-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // PPEPP: Pengendalian
    r = await visitPage(page, `${BASE}/lpm/admin/pengendalian`, adminDir, '26_pengendalian-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/pengendalian/create`, adminDir, '27_pengendalian-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // PPEPP: Peningkatan
    r = await visitPage(page, `${BASE}/lpm/admin/peningkatan`, adminDir, '28_peningkatan-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/peningkatan/create`, adminDir, '29_peningkatan-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // AMI Jadwal
    r = await visitPage(page, `${BASE}/lpm/admin/ami-jadwal`, adminDir, '30_ami-jadwal-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/ami-jadwal/create`, adminDir, '31_ami-jadwal-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Get AMI Jadwal ID
    await page.goto(`${BASE}/lpm/admin/ami-jadwal`, { waitUntil: 'networkidle' });
    const jadwalId = await page.evaluate(() => {
        const links = document.querySelectorAll('a[href*="ami-jadwal/"]');
        for (const l of links) { const m = l.href.match(/ami-jadwal\/(\d+)/); if (m) return m[1]; }
        return null;
    }).catch(() => null);
    if (jadwalId) {
        r = await visitPage(page, `${BASE}/lpm/admin/ami-jadwal/${jadwalId}`, adminDir, '32_ami-jadwal-show');
        results.admin.push(r); if (r.error) errors.push(r);
    }
    
    // AMI Formulir Template
    r = await visitPage(page, `${BASE}/lpm/admin/ami-formulir-template`, adminDir, '33_ami-formulir-template-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/ami-formulir-template/create`, adminDir, '34_ami-formulir-template-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Get AMI Formulir Template ID
    await page.goto(`${BASE}/lpm/admin/ami-formulir-template`, { waitUntil: 'networkidle' });
    const templateId = await page.evaluate(() => {
        const links = document.querySelectorAll('a[href*="ami-formulir-template/"]');
        for (const l of links) { const m = l.href.match(/ami-formulir-template\/(\d+)/); if (m) return m[1]; }
        return null;
    }).catch(() => null);
    if (templateId) {
        r = await visitPage(page, `${BASE}/lpm/admin/ami-formulir-template/${templateId}`, adminDir, '35_ami-formulir-template-show');
        results.admin.push(r); if (r.error) errors.push(r);
    }
    
    // AMI Temuan
    r = await visitPage(page, `${BASE}/lpm/admin/ami-temuan`, adminDir, '36_ami-temuan-index');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Dokumen Bank
    r = await visitPage(page, `${BASE}/lpm/admin/dokumen`, adminDir, '37_dokumen-index');
    results.admin.push(r); if (r.error) errors.push(r);
    r = await visitPage(page, `${BASE}/lpm/admin/dokumen/create`, adminDir, '38_dokumen-create');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // Export pages (these download files, just visit them)
    r = await visitPage(page, `${BASE}/lpm/admin/export/kebijakan`, adminDir, '39_export-kebijakan');
    results.admin.push(r); // exports may redirect, that's ok
    
    // Settings
    r = await visitPage(page, `${BASE}/lpm/admin/setting`, adminDir, '40_setting-index');
    results.admin.push(r); if (r.error) errors.push(r);
    
    // ============ AUDITOR PAGES ============
    const auditorDir = path.join(REPORT_DIR, 'lpm-auditor');
    console.log('\n📋 AUDITOR PAGES:');
    
    r = await visitPage(page, `${BASE}/lpm/auditor`, auditorDir, '01_auditor-dashboard');
    results.auditor.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/auditor/penugasan`, auditorDir, '02_auditor-penugasan');
    results.auditor.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/auditor/temuan`, auditorDir, '03_auditor-temuan-index');
    results.auditor.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/auditor/temuan/create`, auditorDir, '04_auditor-temuan-create');
    results.auditor.push(r); if (r.error) errors.push(r);
    
    // ============ KAPRODI PAGES ============
    const kaprodiDir = path.join(REPORT_DIR, 'lpm-kaprodi');
    console.log('\n📋 KAPRODI PAGES:');
    
    r = await visitPage(page, `${BASE}/lpm/kaprodi`, kaprodiDir, '01_kaprodi-dashboard');
    results.kaprodi.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/kaprodi/standar`, kaprodiDir, '02_kaprodi-standar');
    results.kaprodi.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/kaprodi/temuan`, kaprodiDir, '03_kaprodi-temuan-index');
    results.kaprodi.push(r); if (r.error) errors.push(r);
    
    // ============ PORTAL (PUBLIC) PAGES ============
    const portalDir = path.join(REPORT_DIR, 'lpm-portal');
    console.log('\n📋 PORTAL PAGES:');
    
    r = await visitPage(page, `${BASE}/lpm/portal`, portalDir, '01_portal-home');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/profil`, portalDir, '02_portal-profil');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/penetapan`, portalDir, '03_portal-penetapan');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/pelaksanaan`, portalDir, '04_portal-pelaksanaan');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/evaluasi`, portalDir, '05_portal-evaluasi');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/pengendalian`, portalDir, '06_portal-pengendalian');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/peningkatan`, portalDir, '07_portal-peningkatan');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/prodi`, portalDir, '08_portal-prodi');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/akreditasi`, portalDir, '09_portal-akreditasi');
    results.portal.push(r); if (r.error) errors.push(r);
    
    r = await visitPage(page, `${BASE}/lpm/portal/dokumen`, portalDir, '10_portal-dokumen-index');
    results.portal.push(r); if (r.error) errors.push(r);
    
    // ============ SUMMARY ============
    const total = [...results.admin, ...results.auditor, ...results.kaprodi, ...results.portal];
    const errorCount = errors.length;
    const okCount = total.length - errorCount;
    
    console.log('\n' + '='.repeat(60));
    console.log(`📊 SUMMARY: ${okCount} OK, ${errorCount} ERRORS out of ${total.length} pages`);
    if (errors.length > 0) {
        console.log('\n❌ ERRORS:');
        errors.forEach(e => console.log(`  - ${e.url} (${e.name}): ${(e.errorText || '').substring(0, 100)}`));
    }
    console.log('='.repeat(60));
    
    // Write results JSON
    fs.writeFileSync(path.join(REPORT_DIR, 'audit-results.json'), JSON.stringify({ results, errors, total: total.length, ok: okCount, errors_count: errorCount }, null, 2));
    
    await browser.close();
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
