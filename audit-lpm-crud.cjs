const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:8000';
const WR = '.workflow-reports';

// ─── FEATURE CONFIGURATIONS ─────────────────────────────────────────────────

const ADMIN_CRUD = [
  {
    name: 'lpm-admin-kebijakan', title: 'Kebijakan SPMI',
    basePath: '/lpm/admin/kebijakan',
    create: { nama: 'Kebijakan Mutu Akademik 2026', deskripsi: 'Kebijakan standar mutu akademik tahun 2026 untuk seluruh program studi', tanggal_ditetapkan: '2026-01-15', tautan: 'https://sttw.ac.id/kebijakan-mutu' },
    edit: { nama: 'Kebijakan Mutu Akademik 2026 (Revisi)' },
  },
  {
    name: 'lpm-admin-standar-institusi', title: 'Standar Institusi',
    basePath: '/lpm/admin/standar-institusi',
    create: { nama: 'Standar Kompetensi Lulusan 2026', deskripsi: 'Standar kompetensi lulusan yang harus dicapai', tanggal: '2026-02-01', tautan: 'https://sttw.ac.id/standar-kl' },
    selects: ['kategori', 'status_dokumen', 'akses_dokumen'],
    edit: { nama: 'Standar Kompetensi Lulusan 2026 (Update)' },
  },
  {
    name: 'lpm-admin-standar-lain', title: 'Standar Lain',
    basePath: '/lpm/admin/standar-lain',
    create: { nama: 'Standar Sarana Prasarana Lab', deskripsi: 'Standar kelengkapan sarana prasarana laboratorium', tanggal: '2026-03-01', tautan: 'https://sttw.ac.id/standar-sapras' },
    selects: ['kategori', 'status_dokumen', 'akses_dokumen'],
    edit: { nama: 'Standar Sarana Prasarana Lab (Revisi)' },
  },
  {
    name: 'lpm-admin-dokumen-spmi', title: 'Dokumen SPMI',
    basePath: '/lpm/admin/dokumen-spmi',
    create: { nama_arsip: 'Manual Mutu STTW 2026', nomor_urut: '10', tautan: 'https://sttw.ac.id/manual-mutu' },
    selects: ['status_dokumen', 'akses_dokumen'],
    edit: { nama_arsip: 'Manual Mutu STTW 2026 (Edisi Revisi)' },
  },
  {
    name: 'lpm-admin-formulir', title: 'Formulir LPM',
    basePath: '/lpm/admin/formulir',
    create: { nama_formulir: 'Formulir Evaluasi Dosen Terbaru', tautan: 'https://sttw.ac.id/form-eval' },
    selects: ['status_dokumen', 'akses_dokumen'],
    edit: { nama_formulir: 'Formulir Evaluasi Dosen (v2)' },
  },
  {
    name: 'lpm-admin-sk-akreditasi', title: 'SK Akreditasi',
    basePath: '/lpm/admin/sk-akreditasi',
    create: { nama: 'SK Akreditasi D3 Teknik Sipil', nomor_sk: 'SK/BAN-PT/2026/001', tahun: '2026', tanggal: '2026-04-01', deskripsi: 'SK Akreditasi program studi D3 Teknik Sipil' },
    selects: ['akses_dokumen'],
    edit: { nama: 'SK Akreditasi D3 Teknik Sipil (Perpanjangan)' },
  },
  {
    name: 'lpm-admin-sk-pendirian', title: 'SK Pendirian',
    basePath: '/lpm/admin/sk-pendirian',
    create: { nama: 'SK Pendirian Program Studi Baru', nomor_sk: 'SK/DIKTI/2026/100', tahun: '2026', tanggal: '2026-05-01', deskripsi: 'SK Pendirian program studi S1 Informatika' },
    selects: ['akses_dokumen'],
    edit: { nama: 'SK Pendirian Program Studi S1 Informatika' },
  },
  {
    name: 'lpm-admin-pelaksanaan', title: 'Pelaksanaan',
    basePath: '/lpm/admin/pelaksanaan',
    create: { nama: 'Workshop Kurikulum Berbasis OBE', deskripsi: 'Workshop penyusunan kurikulum berbasis Outcome Based Education', tanggal: '2026-06-15', tautan: 'https://sttw.ac.id/workshop-obe' },
    selects: ['status_pelaksanaan', 'akses_dokumen'],
    edit: { nama: 'Workshop Kurikulum OBE (Batch 2)' },
  },
  {
    name: 'lpm-admin-evaluasi', title: 'Evaluasi',
    basePath: '/lpm/admin/evaluasi',
    create: { nama: 'Evaluasi Kinerja Dosen Semester Ganjil', bentuk_evaluasi: 'Survei & Peer Review', deskripsi: 'Evaluasi komprehensif kinerja dosen melalui survei mahasiswa dan peer review', tanggal: '2026-07-01', tautan: 'https://sttw.ac.id/eval-dosen' },
    selects: ['jenis', 'akses_dokumen'],
    edit: { nama: 'Evaluasi Kinerja Dosen Sem. Ganjil 2026' },
  },
  {
    name: 'lpm-admin-pengendalian', title: 'Pengendalian',
    basePath: '/lpm/admin/pengendalian',
    create: { nama_bidang: 'Pengendalian Mutu Pembelajaran', deskripsi: 'Monitoring dan pengendalian mutu proses pembelajaran', dokumen_rtm: 'https://sttw.ac.id/rtm-pembelajaran', bukti_rtm: 'https://sttw.ac.id/bukti-rtm' },
    selects: ['status_rtm', 'status_rtl', 'akses_dokumen'],
    edit: { nama_bidang: 'Pengendalian Mutu Pembelajaran (Semester 2)' },
  },
  {
    name: 'lpm-admin-peningkatan', title: 'Peningkatan',
    basePath: '/lpm/admin/peningkatan',
    create: { nama: 'Program Peningkatan Kompetensi Dosen', deskripsi: 'Program pelatihan dan sertifikasi dosen untuk meningkatkan kualitas pengajaran', tanggal: '2026-08-01', tautan: 'https://sttw.ac.id/peningkatan-dosen' },
    selects: ['lpm_kebijakan_id', 'akses_dokumen'],
    edit: { nama: 'Program Peningkatan Kompetensi Dosen (Lanjutan)' },
  },
  {
    name: 'lpm-admin-ami-jadwal', title: 'Jadwal AMI',
    basePath: '/lpm/admin/ami-jadwal',
    create: { judul: 'AMI Semester Genap 2025/2026', tahun: '2026', periode: 'Semester Genap', tanggal_mulai: '2026-09-01', tanggal_selesai: '2026-12-31', deskripsi: 'Audit mutu internal untuk semester genap tahun akademik 2025/2026' },
    selects: ['status'],
    edit: { judul: 'AMI Semester Genap 2025/2026 (Revisi Jadwal)' },
  },
  {
    name: 'lpm-admin-ami-formulir-template', title: 'Template Formulir AMI',
    basePath: '/lpm/admin/ami-formulir-template',
    create: { nama: 'Template Audit Standar Pendidikan', deskripsi: 'Template formulir untuk mengaudit standar pendidikan tinggi' },
    edit: { nama: 'Template Audit Standar Pendidikan (v2)' },
  },
  {
    name: 'lpm-admin-dokumen', title: 'Bank Dokumen',
    basePath: '/lpm/admin/dokumen',
    create: { judul: 'Laporan Kinerja LPM 2025', deskripsi: 'Laporan tahunan kinerja Lembaga Penjaminan Mutu tahun 2025', tahun: '2025', tags: 'laporan, kinerja, lpm, 2025' },
    selects: ['kategori', 'akses_dokumen'],
    edit: { judul: 'Laporan Kinerja LPM 2025 (Final)' },
  },
];

const ADMIN_SPECIAL = [
  { name: 'lpm-admin-dashboard', title: 'Dashboard Admin', basePath: '/lpm/admin', type: 'view' },
  {
    name: 'lpm-admin-standar-pt', title: 'Standar PT',
    basePath: '/lpm/admin/standar-pt', type: 'inline-edit',
  },
  {
    name: 'lpm-admin-profil-pt', title: 'Profil PT',
    basePath: '/lpm/admin/profil-pt', type: 'edit-only',
    editFields: { nama_pt: 'Sekolah Tinggi Teknologi Warga Surakarta' },
  },
  { name: 'lpm-admin-prodi', title: 'Data Program Studi', basePath: '/lpm/admin/prodi', type: 'read-show' },
  { name: 'lpm-admin-ami-temuan', title: 'Temuan AMI (Admin)', basePath: '/lpm/admin/ami-temuan', type: 'read-show' },
  {
    name: 'lpm-admin-setting', title: 'Pengaturan LPM',
    basePath: '/lpm/admin/setting', type: 'settings',
  },
];

const AUDITOR_FEATURES = [
  { name: 'lpm-auditor-dashboard', title: 'Dashboard Auditor', basePath: '/lpm/auditor', type: 'view' },
  { name: 'lpm-auditor-penugasan', title: 'Penugasan Auditor', basePath: '/lpm/auditor/penugasan', type: 'view' },
  {
    name: 'lpm-auditor-temuan', title: 'Temuan Auditor',
    basePath: '/lpm/auditor/temuan', type: 'crud',
    create: { judul: 'Temuan: Kurikulum Belum Sesuai KKNI', deskripsi: 'Ditemukan beberapa mata kuliah yang belum sesuai dengan kerangka KKNI', kesesuaian: 'Tidak sesuai dengan Standar Kompetensi Lulusan poin 3.2', rekomendasi: 'Lakukan revisi kurikulum sesuai panduan KKNI terbaru', bukti: 'https://sttw.ac.id/bukti-kurikulum' },
    selects: ['lpm_ami_unit_id', 'kategori_temuan', 'status_temuan'],
    edit: { judul: 'Temuan: Kurikulum Belum Sesuai KKNI (Diperbarui)' },
  },
];

const KAPRODI_FEATURES = [
  { name: 'lpm-kaprodi-dashboard', title: 'Dashboard Kaprodi', basePath: '/lpm/kaprodi', type: 'view' },
  { name: 'lpm-kaprodi-standar', title: 'Standar Prodi', basePath: '/lpm/kaprodi/standar', type: 'view' },
  { name: 'lpm-kaprodi-temuan', title: 'Temuan Prodi', basePath: '/lpm/kaprodi/temuan', type: 'read-show' },
];

const PORTAL_PAGES = [
  { name: 'lpm-portal-home', title: 'Portal LPM - Home', path: '/lpm/portal' },
  { name: 'lpm-portal-profil', title: 'Portal LPM - Profil', path: '/lpm/portal/profil' },
  { name: 'lpm-portal-penetapan', title: 'Portal LPM - Penetapan', path: '/lpm/portal/penetapan' },
  { name: 'lpm-portal-pelaksanaan', title: 'Portal LPM - Pelaksanaan', path: '/lpm/portal/pelaksanaan' },
  { name: 'lpm-portal-evaluasi', title: 'Portal LPM - Evaluasi', path: '/lpm/portal/evaluasi' },
  { name: 'lpm-portal-pengendalian', title: 'Portal LPM - Pengendalian', path: '/lpm/portal/pengendalian' },
  { name: 'lpm-portal-peningkatan', title: 'Portal LPM - Peningkatan', path: '/lpm/portal/peningkatan' },
  { name: 'lpm-portal-prodi', title: 'Portal LPM - Program Studi', path: '/lpm/portal/prodi' },
  { name: 'lpm-portal-akreditasi', title: 'Portal LPM - Akreditasi', path: '/lpm/portal/akreditasi' },
  { name: 'lpm-portal-dokumen', title: 'Portal LPM - Dokumen', path: '/lpm/portal/dokumen' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

async function ss(page, dir, name) {
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(dir, name + '.png'), fullPage: true });
}

// Click visible submit button inside main content (not the logout button in dropdown)
async function clickSubmit(page) {
  // Target the primary submit button inside a form or main area, visible only
  const btn = page.locator('main button[type="submit"], form button[type="submit"]').filter({ hasText: /simpan|submit|update|kirim/i }).first();
  if (await btn.count() > 0 && await btn.isVisible()) {
    await btn.click();
  } else {
    // Fallback: any visible submit button
    const all = page.locator('button[type="submit"]:visible');
    const count = await all.count();
    for (let i = 0; i < count; i++) {
      const text = await all.nth(i).textContent();
      if (text && !text.match(/keluar|logout/i)) {
        await all.nth(i).click();
        return;
      }
    }
    throw new Error('No suitable submit button found');
  }
}

async function fillField(page, name, value) {
  const loc = page.locator(`[name="${name}"]`);
  if (await loc.count() === 0) return;
  const tag = await loc.evaluate(el => el.tagName.toLowerCase());
  if (tag === 'select') {
    const options = await loc.locator('option').count();
    if (options > 1) await loc.selectOption({ index: 1 });
  } else if (tag === 'textarea') {
    await loc.fill(value);
  } else {
    const type = await loc.getAttribute('type');
    if (type === 'checkbox') {
      if (!(await loc.isChecked())) await loc.check();
    } else {
      await loc.fill(value);
    }
  }
}

async function selectAllSelects(page, names) {
  for (const name of (names || [])) {
    const loc = page.locator(`select[name="${name}"]`);
    if (await loc.count() > 0) {
      const options = await loc.locator('option').count();
      if (options > 1) await loc.selectOption({ index: 1 });
    }
  }
}

async function findFirstItemUrl(page, basePath) {
  return page.evaluate((bp) => {
    const re = new RegExp(bp.replace(/\//g, '\\/') + '\\/\\d+$');
    for (const a of document.querySelectorAll('a')) {
      if (a.href && re.test(a.href)) return a.href;
    }
    return null;
  }, basePath);
}

async function findFirstEditUrl(page, basePath) {
  return page.evaluate((bp) => {
    const re = new RegExp(bp.replace(/\//g, '\\/') + '\\/\\d+\\/edit');
    for (const a of document.querySelectorAll('a')) {
      if (a.href && re.test(a.href)) return a.href;
    }
    return null;
  }, basePath);
}

// ─── CRUD HANDLER ────────────────────────────────────────────────────────────

async function handleCrud(page, f) {
  const dir = path.join(WR, f.name, 'screenshots');
  ensureDir(dir);
  const results = [];
  const log = (step, ok, err) => {
    results.push({ step, ok, err });
    console.log(`  ${ok ? 'OK' : 'ERR'}: ${f.name}/${step}${err ? ' — ' + err : ''}`);
  };

  // 1. Index
  try {
    await page.goto(BASE + f.basePath, { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, dir, '01_index');
    log('01_index', true);
  } catch (e) { log('01_index', false, e.message); }

  // 2. Create form (empty)
  try {
    await page.goto(BASE + f.basePath + '/create', { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, dir, '02_create-form');
    log('02_create-form', true);
  } catch (e) { log('02_create-form', false, e.message); }

  // 3. Fill create form
  try {
    for (const [k, v] of Object.entries(f.create || {})) await fillField(page, k, v);
    await selectAllSelects(page, f.selects);
    await ss(page, dir, '03_create-filled');
    log('03_create-filled', true);
  } catch (e) { log('03_create-filled', false, e.message); }

  // 4. Submit create
  try {
    await clickSubmit(page);
    await page.waitForLoadState('networkidle');
    await ss(page, dir, '04_create-success');
    log('04_create-success', true);
  } catch (e) { log('04_create-success', false, e.message); }

  // 5. Show first item (or skip if no show route)
  let showUrl = null;
  let editUrl = null;
  try {
    await page.goto(BASE + f.basePath, { waitUntil: 'networkidle', timeout: 15000 });
    showUrl = await findFirstItemUrl(page, f.basePath);
    if (showUrl) {
      await page.goto(showUrl, { waitUntil: 'networkidle', timeout: 15000 });
      await ss(page, dir, '05_show');
      log('05_show', true);
      editUrl = showUrl + '/edit';
    } else {
      // No show route - find edit link directly
      editUrl = await findFirstEditUrl(page, f.basePath);
      if (editUrl) {
        log('05_show', true, 'No show route (edit-only feature)');
      } else {
        log('05_show', false, 'No item link found');
      }
    }
  } catch (e) { log('05_show', false, e.message); }

  // 6. Edit form
  try {
    if (editUrl) {
      await page.goto(editUrl, { waitUntil: 'networkidle', timeout: 15000 });
      await ss(page, dir, '06_edit-form');
      log('06_edit-form', true);
    } else {
      log('06_edit-form', false, 'No edit URL found');
    }
  } catch (e) { log('06_edit-form', false, e.message); }

  // 7. Modify edit field
  try {
    if (f.edit) {
      for (const [k, v] of Object.entries(f.edit)) {
        const loc = page.locator(`[name="${k}"]`);
        if (await loc.count() > 0) {
          await loc.clear();
          await loc.fill(v);
        }
      }
    }
    await ss(page, dir, '07_edit-modified');
    log('07_edit-modified', true);
  } catch (e) { log('07_edit-modified', false, e.message); }

  // 8. Submit edit
  try {
    await clickSubmit(page);
    await page.waitForLoadState('networkidle');
    await ss(page, dir, '08_edit-success');
    log('08_edit-success', true);
  } catch (e) { log('08_edit-success', false, e.message); }

  return results;
}

// ─── SPECIAL HANDLERS ────────────────────────────────────────────────────────

async function handleView(page, f) {
  const dir = path.join(WR, f.name, 'screenshots');
  ensureDir(dir);
  try {
    await page.goto(BASE + f.basePath, { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, dir, '01_index');
    console.log(`  OK: ${f.name}/01_index`);
    return [{ step: '01_index', ok: true }];
  } catch (e) {
    console.log(`  ERR: ${f.name}/01_index — ${e.message}`);
    return [{ step: '01_index', ok: false, err: e.message }];
  }
}

async function handleReadShow(page, f) {
  const dir = path.join(WR, f.name, 'screenshots');
  ensureDir(dir);
  const results = [];
  const log = (step, ok, err) => {
    results.push({ step, ok, err });
    console.log(`  ${ok ? 'OK' : 'ERR'}: ${f.name}/${step}${err ? ' — ' + err : ''}`);
  };

  try {
    await page.goto(BASE + f.basePath, { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, dir, '01_index');
    log('01_index', true);
  } catch (e) { log('01_index', false, e.message); }

  try {
    const showUrl = await findFirstItemUrl(page, f.basePath);
    if (showUrl) {
      await page.goto(showUrl, { waitUntil: 'networkidle', timeout: 15000 });
      await ss(page, dir, '02_show');
      log('02_show', true);
    } else {
      log('02_show', false, 'No item link found');
    }
  } catch (e) { log('02_show', false, e.message); }

  return results;
}

async function handleEditOnly(page, f) {
  const dir = path.join(WR, f.name, 'screenshots');
  ensureDir(dir);
  const results = [];
  const log = (step, ok, err) => {
    results.push({ step, ok, err });
    console.log(`  ${ok ? 'OK' : 'ERR'}: ${f.name}/${step}${err ? ' — ' + err : ''}`);
  };

  try {
    await page.goto(BASE + f.basePath, { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, dir, '01_index');
    log('01_index', true);
  } catch (e) { log('01_index', false, e.message); }

  try {
    await page.goto(BASE + f.basePath + '/edit', { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, dir, '02_edit-form');
    log('02_edit-form', true);
  } catch (e) { log('02_edit-form', false, e.message); }

  if (f.editFields) {
    try {
      for (const [k, v] of Object.entries(f.editFields)) await fillField(page, k, v);
      await ss(page, dir, '03_edit-modified');
      log('03_edit-modified', true);
    } catch (e) { log('03_edit-modified', false, e.message); }

    try {
      await clickSubmit(page);
      await page.waitForLoadState('networkidle');
      await ss(page, dir, '04_edit-success');
      log('04_edit-success', true);
    } catch (e) { log('04_edit-success', false, e.message); }
  }

  return results;
}

async function handleInlineEdit(page, f) {
  const dir = path.join(WR, f.name, 'screenshots');
  ensureDir(dir);
  const results = [];
  const log = (step, ok, err) => {
    results.push({ step, ok, err });
    console.log(`  ${ok ? 'OK' : 'ERR'}: ${f.name}/${step}${err ? ' — ' + err : ''}`);
  };

  try {
    await page.goto(BASE + f.basePath, { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, dir, '01_index');
    log('01_index', true);
  } catch (e) { log('01_index', false, e.message); }

  // Modify a field inline
  try {
    const firstInput = page.locator('input[type="number"]').first();
    if (await firstInput.count() > 0) {
      const current = await firstInput.inputValue();
      await firstInput.clear();
      await firstInput.fill(current || '50');
      await ss(page, dir, '02_inline-modified');
      log('02_inline-modified', true);
    }
  } catch (e) { log('02_inline-modified', false, e.message); }

  try {
    await clickSubmit(page);
    await page.waitForLoadState('networkidle');
    await ss(page, dir, '03_save-success');
    log('03_save-success', true);
  } catch (e) { log('03_save-success', false, e.message); }

  return results;
}

async function handleSettings(page, f) {
  const dir = path.join(WR, f.name, 'screenshots');
  ensureDir(dir);
  const results = [];
  const log = (step, ok, err) => {
    results.push({ step, ok, err });
    console.log(`  ${ok ? 'OK' : 'ERR'}: ${f.name}/${step}${err ? ' — ' + err : ''}`);
  };

  try {
    await page.goto(BASE + f.basePath, { waitUntil: 'networkidle', timeout: 15000 });
    await ss(page, dir, '01_settings');
    log('01_settings', true);
  } catch (e) { log('01_settings', false, e.message); }

  try {
    await clickSubmit(page);
    await page.waitForLoadState('networkidle');
    await ss(page, dir, '02_settings-saved');
    log('02_settings-saved', true);
  } catch (e) { log('02_settings-saved', false, e.message); }

  return results;
}

async function handlePortal(page) {
  const allResults = [];
  for (const p of PORTAL_PAGES) {
    const dir = path.join(WR, p.name, 'screenshots');
    ensureDir(dir);
    try {
      await page.goto(BASE + p.path, { waitUntil: 'networkidle', timeout: 15000 });
      await ss(page, dir, '01_page');
      console.log(`  OK: ${p.name}/01_page`);
      allResults.push({ feature: p.name, step: '01_page', ok: true });
    } catch (e) {
      console.log(`  ERR: ${p.name}/01_page — ${e.message}`);
      allResults.push({ feature: p.name, step: '01_page', ok: false, err: e.message });
    }
  }
  return allResults;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  // Login
  console.log('Logging in...');
  await page.goto(BASE + '/login');
  await page.fill('input[name="login"]', 'developer@sttw.ac.id');
  await page.fill('input[name="password"]', 'password');
  await clickSubmit(page);
  await page.waitForURL('**/dashboard**');
  console.log('Logged in\n');

  let totalSteps = 0, okSteps = 0, failedSteps = [];

  const collectResults = (featureName, results) => {
    for (const r of results) {
      totalSteps++;
      if (r.ok) okSteps++;
      else failedSteps.push({ feature: featureName, step: r.step, err: r.err });
    }
  };

  // ─── Admin CRUD features ─────────────────────────────────────────────
  console.log('=== ADMIN CRUD FEATURES ===');
  for (const f of ADMIN_CRUD) {
    console.log(`\n[${f.name}]`);
    const results = await handleCrud(page, f);
    collectResults(f.name, results);
  }

  // ─── Admin Special features ───────────────────────────────────────────
  console.log('\n=== ADMIN SPECIAL FEATURES ===');
  for (const f of ADMIN_SPECIAL) {
    console.log(`\n[${f.name}]`);
    let results;
    switch (f.type) {
      case 'view': results = await handleView(page, f); break;
      case 'read-show': results = await handleReadShow(page, f); break;
      case 'edit-only': results = await handleEditOnly(page, f); break;
      case 'inline-edit': results = await handleInlineEdit(page, f); break;
      case 'settings': results = await handleSettings(page, f); break;
      default: results = await handleView(page, f);
    }
    collectResults(f.name, results);
  }

  // ─── Auditor features ─────────────────────────────────────────────────
  console.log('\n=== AUDITOR FEATURES ===');
  for (const f of AUDITOR_FEATURES) {
    console.log(`\n[${f.name}]`);
    let results;
    if (f.type === 'crud') results = await handleCrud(page, f);
    else results = await handleView(page, f);
    collectResults(f.name, results);
  }

  // ─── Kaprodi features ─────────────────────────────────────────────────
  console.log('\n=== KAPRODI FEATURES ===');
  for (const f of KAPRODI_FEATURES) {
    console.log(`\n[${f.name}]`);
    let results;
    if (f.type === 'read-show') results = await handleReadShow(page, f);
    else results = await handleView(page, f);
    collectResults(f.name, results);
  }

  // ─── Portal pages ─────────────────────────────────────────────────────
  console.log('\n=== PORTAL PAGES ===');
  const portalResults = await handlePortal(page);
  for (const r of portalResults) {
    totalSteps++;
    if (r.ok) okSteps++;
    else failedSteps.push({ feature: r.feature, step: r.step, err: r.err });
  }

  // ─── Summary ──────────────────────────────────────────────────────────
  console.log(`\n${'='.repeat(60)}`);
  console.log(`RESULTS: ${okSteps}/${totalSteps} OK, ${failedSteps.length} errors`);
  if (failedSteps.length > 0) {
    console.log('\nFailed steps:');
    for (const f of failedSteps) {
      console.log(`  ${f.feature}/${f.step}: ${f.err}`);
    }
  }

  await browser.close();
})();
