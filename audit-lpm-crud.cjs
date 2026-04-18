const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:8000';
const WR = path.resolve(__dirname, 'lpm');
const RESULTS_PATH = path.join(WR, '.scan-results.json');

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
  { name: 'lpm-admin-standar-pt', title: 'Standar PT', basePath: '/lpm/admin/standar-pt', type: 'inline-edit' },
  {
    name: 'lpm-admin-profil-pt', title: 'Profil PT',
    basePath: '/lpm/admin/profil-pt', type: 'edit-only',
    editFields: { nama_pt: 'Sekolah Tinggi Teknologi Warga Surakarta' },
  },
  { name: 'lpm-admin-prodi', title: 'Data Program Studi', basePath: '/lpm/admin/prodi', type: 'read-show' },
  { name: 'lpm-admin-ami-temuan', title: 'Temuan AMI (Admin)', basePath: '/lpm/admin/ami-temuan', type: 'read-show' },
  { name: 'lpm-admin-setting', title: 'Pengaturan LPM', basePath: '/lpm/admin/setting', type: 'settings' },
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

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function resetScreenshotsDir(dir) {
  ensureDir(dir);

  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function featureDir(name) {
  return path.join(WR, name.replace(/^lpm-/, ''));
}

async function ss(page, dir, name) {
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true });
}

async function captureError(page, dir, step) {
  const filename = `err_${step}.png`;

  try {
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(dir, filename), fullPage: true });

    return `screenshots/${filename}`;
  } catch {
    return null;
  }
}

function categorizeError(message) {
  if (/returned HTTP 500|application error page|Internal Server Error|RelationNotFoundException|ErrorException|Undefined variable|SQLSTATE/i.test(message)) {
    return 'server-error';
  }

  if (/returned HTTP 401|returned HTTP 403|Unauthorized|Forbidden/i.test(message)) {
    return 'permission';
  }

  if (/returned HTTP 404|Not Found/i.test(message)) {
    return 'client-error';
  }

  if (/validation failed|required field|same page without a success message/i.test(message)) {
    return 'validation';
  }

  return 'workflow-error';
}

async function assertHealthy(page, response, context) {
  if (response && response.status() >= 400) {
    throw new Error(`${context} returned HTTP ${response.status()}`);
  }

  const bodyText = await page.locator('body').innerText().catch(() => '');

  if (/Internal Server Error|ErrorException|RelationNotFoundException|Undefined variable|Exception trace|SQLSTATE/i.test(bodyText)) {
    throw new Error(`${context} rendered an application error page`);
  }
}

async function openPage(page, url, context) {
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

  try {
    await page.waitForLoadState('networkidle', { timeout: 5000 });
  } catch {
  }

  await assertHealthy(page, response, context);

  return response;
}

async function hasSuccessMessage(page) {
  const bodyText = await page.locator('body').innerText().catch(() => '');
  return /berhasil|sukses|success/i.test(bodyText);
}

async function clickSubmit(page) {
  const btn = page
    .locator('main button[type="submit"], form button[type="submit"]')
    .filter({ hasText: /simpan|submit|update|kirim/i })
    .first();

  if (await btn.count() > 0 && await btn.isVisible()) {
    await btn.click();
    return;
  }

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

async function fillField(page, name, value) {
  const loc = page.locator(`[name="${name}"]`);
  if (await loc.count() === 0) {
    return;
  }

  const tag = await loc.evaluate((el) => el.tagName.toLowerCase());
  if (tag === 'select') {
    const options = await loc.locator('option').count();
    if (options > 1) {
      await loc.selectOption({ index: 1 });
    }
    return;
  }

  if (tag === 'textarea') {
    await loc.fill(value);
    return;
  }

  const type = await loc.getAttribute('type');
  if (type === 'checkbox') {
    if (!(await loc.isChecked())) {
      await loc.check();
    }
    return;
  }

  await loc.fill(value);
}

async function selectAllSelects(page, names) {
  for (const name of names || []) {
    const loc = page.locator(`select[name="${name}"]`);
    if (await loc.count() === 0) {
      continue;
    }

    const options = await loc.locator('option').count();
    if (options > 1) {
      await loc.selectOption({ index: 1 });
    }
  }
}

async function fillFeatureSpecificCreateFields(page, feature) {
  if (feature.basePath === '/lpm/admin/ami-formulir-template') {
    await fillField(page, 'items[0][urutan]', '1');
    await fillField(page, 'items[0][standar_yang_diperiksa]', 'Standar audit proses pembelajaran');
    await fillField(page, 'items[0][deskripsi]', 'Periksa kesesuaian proses pembelajaran dengan standar mutu.');
  }
}

async function submitAndConfirmSuccess(page) {
  const beforeUrl = page.url();

  await clickSubmit(page);
  await page.waitForTimeout(500);

  try {
    await page.waitForLoadState('networkidle', { timeout: 5000 });
  } catch {
  }

  await assertHealthy(page, null, `Submitting ${beforeUrl}`);

  if (page.url() === beforeUrl && !(await hasSuccessMessage(page))) {
    throw new Error('Submission stayed on the same page without a success message; likely validation failed');
  }
}

async function findFirstItemUrl(page, basePath) {
  return page.evaluate((bp) => {
    const re = new RegExp(bp.replace(/\//g, '\\/') + '\\/\\d+$');
    for (const a of document.querySelectorAll('a')) {
      if (a.href && re.test(a.href)) {
        return a.href;
      }
    }
    return null;
  }, basePath);
}

async function findFirstEditUrl(page, basePath) {
  return page.evaluate((bp) => {
    const re = new RegExp(bp.replace(/\//g, '\\/') + '\\/\\d+\\/edit');
    for (const a of document.querySelectorAll('a')) {
      if (a.href && re.test(a.href)) {
        return a.href;
      }
    }
    return null;
  }, basePath);
}

function createLogger(results, featureName, dir, page) {
  return async (step, ok, error = null, url = null, extra = {}) => {
    const message = error ? (error.message || String(error)) : null;
    let screenshot = extra.screenshot || null;

    if (!ok && !screenshot) {
      screenshot = await captureError(page, dir, step);
    }

    results.push({
      step,
      ok,
      err: message,
      url: url || page.url(),
      screenshot,
      note: extra.note || null,
      category: ok ? null : categorizeError(message || ''),
    });

    console.log(`  ${ok ? 'OK' : 'ERR'}: ${featureName}/${step}${message ? ` — ${message}` : ''}`);
  };
}

async function handleCrud(page, feature) {
  const dir = path.join(featureDir(feature.name), 'screenshots');
  resetScreenshotsDir(dir);

  const results = [];
  const log = createLogger(results, feature.name, dir, page);

  try {
    await openPage(page, BASE + feature.basePath, `${feature.name} index`);
    await ss(page, dir, '01_index');
    await log('01_index', true, null, page.url());
  } catch (error) {
    await log('01_index', false, error, BASE + feature.basePath);
  }

  try {
    await openPage(page, BASE + feature.basePath + '/create', `${feature.name} create form`);
    await ss(page, dir, '02_create-form');
    await log('02_create-form', true, null, page.url());
  } catch (error) {
    await log('02_create-form', false, error, BASE + feature.basePath + '/create');
  }

  try {
    for (const [key, value] of Object.entries(feature.create || {})) {
      await fillField(page, key, value);
    }
    await selectAllSelects(page, feature.selects);
    await fillFeatureSpecificCreateFields(page, feature);
    await ss(page, dir, '03_create-filled');
    await log('03_create-filled', true, null, page.url());
  } catch (error) {
    await log('03_create-filled', false, error, page.url());
  }

  try {
    await submitAndConfirmSuccess(page);
    await ss(page, dir, '04_create-success');
    await log('04_create-success', true, null, page.url());
  } catch (error) {
    await log('04_create-success', false, error, page.url());
  }

  let showUrl = null;
  let editUrl = null;

  try {
    await openPage(page, BASE + feature.basePath, `${feature.name} index for show`);
    showUrl = await findFirstItemUrl(page, feature.basePath);

    if (showUrl) {
      await openPage(page, showUrl, `${feature.name} show`);
      await ss(page, dir, '05_show');
      await log('05_show', true, null, page.url());
      editUrl = `${showUrl}/edit`;
    } else {
      editUrl = await findFirstEditUrl(page, feature.basePath);
      if (!editUrl) {
        throw new Error('No item link found');
      }

      await log('05_show', true, null, editUrl, { note: 'No show route (edit-only feature)' });
    }
  } catch (error) {
    await log('05_show', false, error, showUrl || BASE + feature.basePath);
  }

  try {
    if (!editUrl) {
      throw new Error('No edit URL found');
    }

    await openPage(page, editUrl, `${feature.name} edit form`);
    await ss(page, dir, '06_edit-form');
    await log('06_edit-form', true, null, page.url());
  } catch (error) {
    await log('06_edit-form', false, error, editUrl || page.url());
  }

  try {
    for (const [key, value] of Object.entries(feature.edit || {})) {
      const loc = page.locator(`[name="${key}"]`);
      if (await loc.count() === 0) {
        continue;
      }

      await loc.clear();
      await loc.fill(value);
    }

    await ss(page, dir, '07_edit-modified');
    await log('07_edit-modified', true, null, page.url());
  } catch (error) {
    await log('07_edit-modified', false, error, page.url());
  }

  try {
    await submitAndConfirmSuccess(page);
    await ss(page, dir, '08_edit-success');
    await log('08_edit-success', true, null, page.url());
  } catch (error) {
    await log('08_edit-success', false, error, page.url());
  }

  return results;
}

async function handleView(page, feature) {
  const dir = path.join(featureDir(feature.name), 'screenshots');
  resetScreenshotsDir(dir);

  const results = [];
  const log = createLogger(results, feature.name, dir, page);

  try {
    await openPage(page, BASE + feature.basePath, `${feature.name} index`);
    await ss(page, dir, '01_index');
    await log('01_index', true, null, page.url());
  } catch (error) {
    await log('01_index', false, error, BASE + feature.basePath);
  }

  return results;
}

async function handleReadShow(page, feature) {
  const dir = path.join(featureDir(feature.name), 'screenshots');
  resetScreenshotsDir(dir);

  const results = [];
  const log = createLogger(results, feature.name, dir, page);

  try {
    await openPage(page, BASE + feature.basePath, `${feature.name} index`);
    await ss(page, dir, '01_index');
    await log('01_index', true, null, page.url());
  } catch (error) {
    await log('01_index', false, error, BASE + feature.basePath);
  }

  try {
    const showUrl = await findFirstItemUrl(page, feature.basePath);
    if (!showUrl) {
      throw new Error('No item link found');
    }

    await openPage(page, showUrl, `${feature.name} show`);
    await ss(page, dir, '02_show');
    await log('02_show', true, null, page.url());
  } catch (error) {
    await log('02_show', false, error, page.url());
  }

  return results;
}

async function handleEditOnly(page, feature) {
  const dir = path.join(featureDir(feature.name), 'screenshots');
  resetScreenshotsDir(dir);

  const results = [];
  const log = createLogger(results, feature.name, dir, page);

  try {
    await openPage(page, BASE + feature.basePath, `${feature.name} index`);
    await ss(page, dir, '01_index');
    await log('01_index', true, null, page.url());
  } catch (error) {
    await log('01_index', false, error, BASE + feature.basePath);
  }

  try {
    await openPage(page, BASE + feature.basePath + '/edit', `${feature.name} edit form`);
    await ss(page, dir, '02_edit-form');
    await log('02_edit-form', true, null, page.url());
  } catch (error) {
    await log('02_edit-form', false, error, BASE + feature.basePath + '/edit');
  }

  if (feature.editFields) {
    try {
      for (const [key, value] of Object.entries(feature.editFields)) {
        await fillField(page, key, value);
      }
      await ss(page, dir, '03_edit-modified');
      await log('03_edit-modified', true, null, page.url());
    } catch (error) {
      await log('03_edit-modified', false, error, page.url());
    }

    try {
      await submitAndConfirmSuccess(page);
      await ss(page, dir, '04_edit-success');
      await log('04_edit-success', true, null, page.url());
    } catch (error) {
      await log('04_edit-success', false, error, page.url());
    }
  }

  return results;
}

async function handleInlineEdit(page, feature) {
  const dir = path.join(featureDir(feature.name), 'screenshots');
  resetScreenshotsDir(dir);

  const results = [];
  const log = createLogger(results, feature.name, dir, page);

  try {
    await openPage(page, BASE + feature.basePath, `${feature.name} index`);
    await ss(page, dir, '01_index');
    await log('01_index', true, null, page.url());
  } catch (error) {
    await log('01_index', false, error, BASE + feature.basePath);
  }

  try {
    const firstInput = page.locator('input[type="number"]').first();
    if (await firstInput.count() === 0) {
      throw new Error('No inline number input found');
    }

    const current = await firstInput.inputValue();
    await firstInput.clear();
    await firstInput.fill(current || '50');
    await ss(page, dir, '02_inline-modified');
    await log('02_inline-modified', true, null, page.url());
  } catch (error) {
    await log('02_inline-modified', false, error, page.url());
  }

  try {
    await submitAndConfirmSuccess(page);
    await ss(page, dir, '03_save-success');
    await log('03_save-success', true, null, page.url());
  } catch (error) {
    await log('03_save-success', false, error, page.url());
  }

  return results;
}

async function handleSettings(page, feature) {
  const dir = path.join(featureDir(feature.name), 'screenshots');
  resetScreenshotsDir(dir);

  const results = [];
  const log = createLogger(results, feature.name, dir, page);

  try {
    await openPage(page, BASE + feature.basePath, `${feature.name} settings`);
    await ss(page, dir, '01_settings');
    await log('01_settings', true, null, page.url());
  } catch (error) {
    await log('01_settings', false, error, BASE + feature.basePath);
  }

  try {
    await submitAndConfirmSuccess(page);
    await ss(page, dir, '02_settings-saved');
    await log('02_settings-saved', true, null, page.url());
  } catch (error) {
    await log('02_settings-saved', false, error, page.url());
  }

  return results;
}

async function handlePortal(page) {
  const results = {};

  for (const pageConfig of PORTAL_PAGES) {
    const dir = path.join(featureDir(pageConfig.name), 'screenshots');
    resetScreenshotsDir(dir);

    const featureResults = [];
    const log = createLogger(featureResults, pageConfig.name, dir, page);

    try {
      await openPage(page, BASE + pageConfig.path, `${pageConfig.name} page`);
      await ss(page, dir, '01_page');
      await log('01_page', true, null, page.url());
    } catch (error) {
      await log('01_page', false, error, BASE + pageConfig.path);
    }

    results[pageConfig.name] = featureResults;
  }

  return results;
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  ensureDir(WR);

  console.log('Logging in...');
  await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded' });
  await page.fill('input[name="login"]', 'developer@sttw.ac.id');
  await page.fill('input[name="password"]', 'password');
  await clickSubmit(page);
  await page.waitForURL('**/dashboard**');
  console.log('Logged in\n');

  let totalSteps = 0;
  let okSteps = 0;
  const failedSteps = [];
  const featureResults = {};

  const collectResults = (featureName, results) => {
    featureResults[featureName] = results;

    for (const result of results) {
      totalSteps += 1;
      if (result.ok) {
        okSteps += 1;
        continue;
      }

      failedSteps.push({
        feature: featureName,
        step: result.step,
        err: result.err,
        url: result.url,
        category: result.category,
      });
    }
  };

  console.log('=== ADMIN CRUD FEATURES ===');
  for (const feature of ADMIN_CRUD) {
    console.log(`\n[${feature.name}]`);
    collectResults(feature.name, await handleCrud(page, feature));
  }

  console.log('\n=== ADMIN SPECIAL FEATURES ===');
  for (const feature of ADMIN_SPECIAL) {
    console.log(`\n[${feature.name}]`);

    let results;
    switch (feature.type) {
      case 'view':
        results = await handleView(page, feature);
        break;
      case 'read-show':
        results = await handleReadShow(page, feature);
        break;
      case 'edit-only':
        results = await handleEditOnly(page, feature);
        break;
      case 'inline-edit':
        results = await handleInlineEdit(page, feature);
        break;
      case 'settings':
        results = await handleSettings(page, feature);
        break;
      default:
        results = await handleView(page, feature);
        break;
    }

    collectResults(feature.name, results);
  }

  console.log('\n=== AUDITOR FEATURES ===');
  for (const feature of AUDITOR_FEATURES) {
    console.log(`\n[${feature.name}]`);
    collectResults(
      feature.name,
      feature.type === 'crud' ? await handleCrud(page, feature) : await handleView(page, feature),
    );
  }

  console.log('\n=== KAPRODI FEATURES ===');
  for (const feature of KAPRODI_FEATURES) {
    console.log(`\n[${feature.name}]`);
    collectResults(
      feature.name,
      feature.type === 'read-show' ? await handleReadShow(page, feature) : await handleView(page, feature),
    );
  }

  console.log('\n=== PORTAL PAGES ===');
  const portalResults = await handlePortal(page);
  for (const [featureName, results] of Object.entries(portalResults)) {
    collectResults(featureName, results);
  }

  fs.writeFileSync(RESULTS_PATH, JSON.stringify({
    generatedAt: new Date().toISOString(),
    summary: { totalSteps, okSteps, failedSteps: failedSteps.length },
    failures: failedSteps,
    features: featureResults,
  }, null, 2));

  console.log(`\n${'='.repeat(60)}`);
  console.log(`RESULTS: ${okSteps}/${totalSteps} OK, ${failedSteps.length} errors`);
  if (failedSteps.length > 0) {
    console.log('\nFailed steps:');
    for (const failure of failedSteps) {
      console.log(`  ${failure.feature}/${failure.step}: ${failure.err}`);
    }
  }

  console.log(`\nScan results saved to ${RESULTS_PATH}`);

  await browser.close();
})();
