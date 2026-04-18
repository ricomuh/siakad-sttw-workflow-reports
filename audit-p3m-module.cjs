const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const { accounts, features } = require('./p3m-workflow-config.cjs');

const BASE_URL = process.env.WORKFLOW_BASE_URL || 'http://127.0.0.1:8000';
const P3M_ROOT = path.resolve(__dirname, 'p3m');
const RESULTS_PATH = path.join(P3M_ROOT, '.scan-results.json');
const ACCOUNT_HOME_PATHS = {
  admin: '/p3m/admin/dashboard',
  dosen_budi: '/p3m/dosen/dashboard',
  dosen_siti: '/p3m/dosen/dashboard',
  dosen_ahmad: '/p3m/dosen/dashboard',
  reviewer_budi: '/p3m/dosen/dashboard',
};

class ScanIssueError extends Error {
  constructor(category, message) {
    super(message);
    this.name = 'ScanIssueError';
    this.category = category;
  }
}

function todayJakarta() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function resetDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toMatcher(value) {
  if (value instanceof RegExp) {
    return value;
  }

  return new RegExp(`^\\s*${escapeRegex(value)}\\s*$`, 'i');
}

async function settlePage(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(500);
}

async function firstVisible(locator) {
  const count = await locator.count();

  for (let index = 0; index < count; index += 1) {
    const item = locator.nth(index);

    if (await item.isVisible().catch(() => false)) {
      return item;
    }
  }

  return null;
}

async function saveStepScreenshot(page, screenshotsDir, stepFile, isError = false) {
  const filename = isError ? `err_${stepFile}.png` : `${stepFile}.png`;
  const absolutePath = path.join(screenshotsDir, filename);

  await page.screenshot({
    path: absolutePath,
    fullPage: true,
    animations: 'disabled',
  });

  return `screenshots/${filename}`;
}

async function fillFirstVisible(page, selectors, value) {
  for (const selector of selectors) {
    const field = page.locator(selector).first();

    if (await field.isVisible().catch(() => false)) {
      await field.fill(value);
      return;
    }
  }

  throw new ScanIssueError('auth', `Field login tidak ditemukan: ${selectors.join(', ')}`);
}

async function clickVisible(locator, options = {}) {
  const element = await firstVisible(locator);

  if (!element) {
    return null;
  }

  await element.scrollIntoViewIfNeeded().catch(() => {});
  await element.click(options);

  return element;
}

async function clickSidebarLabel(page, label, expectNavigation = false) {
  const matcher = toMatcher(label);
  const candidates = [
    page.locator('aside a, aside button, aside [role="button"], aside div.cursor-pointer, aside [class*="cursor-pointer"]'),
    page.locator('nav a, nav button, nav [role="button"], nav div.cursor-pointer, nav [class*="cursor-pointer"]'),
    page.locator('[class*="sidebar"] a, [class*="sidebar"] button, [class*="sidebar"] [role="button"], [class*="sidebar"] div.cursor-pointer, [class*="sidebar"] [class*="cursor-pointer"]'),
  ];

  for (const candidate of candidates) {
    const element = await firstVisible(candidate.filter({ hasText: matcher }));

    if (!element) {
      continue;
    }

    if (expectNavigation) {
      const currentUrl = page.url();
      const href = await element.getAttribute('href').catch(() => null);

      if (!href || href === '#' || /^javascript:/i.test(href)) {
        throw new ScanIssueError('missing-feature', `Menu sidebar "${label}" tidak memiliki route tujuan yang valid.`);
      }

      const navigation = page.waitForNavigation({
        waitUntil: 'domcontentloaded',
        timeout: 5000,
      }).catch(() => null);

      await element.scrollIntoViewIfNeeded().catch(() => {});
      await element.click();
      const response = await navigation;
      await settlePage(page);

      if (!response && page.url() === currentUrl) {
        throw new ScanIssueError('missing-feature', `Klik menu sidebar "${label}" tidak membuka halaman tujuan.`);
      }

      return response;
    }

    await element.scrollIntoViewIfNeeded().catch(() => {});
    await element.click();
    await page.waitForTimeout(350);

    return null;
  }

  throw new ScanIssueError('missing-sidebar', `Menu sidebar "${label}" tidak ditemukan.`);
}

async function isSidebarLabelVisible(page, label) {
  const matcher = toMatcher(label);
  const candidates = [
    page.locator('aside a, aside button, aside [role="button"], aside div.cursor-pointer, aside [class*="cursor-pointer"]'),
    page.locator('nav a, nav button, nav [role="button"], nav div.cursor-pointer, nav [class*="cursor-pointer"]'),
    page.locator('[class*="sidebar"] a, [class*="sidebar"] button, [class*="sidebar"] [role="button"], [class*="sidebar"] div.cursor-pointer, [class*="sidebar"] [class*="cursor-pointer"]'),
  ];

  for (const candidate of candidates) {
    const element = await firstVisible(candidate.filter({ hasText: matcher }));

    if (element) {
      return true;
    }
  }

  return false;
}

async function openSidebarPath(page, pathSegments) {
  let finalResponse = null;

  for (let index = 0; index < pathSegments.length; index += 1) {
    const currentLabel = pathSegments[index];
    const isLast = index === pathSegments.length - 1;

    if (!isLast) {
      let descendantVisible = false;

      for (let childIndex = index + 1; childIndex < pathSegments.length; childIndex += 1) {
        if (await isSidebarLabelVisible(page, pathSegments[childIndex])) {
          descendantVisible = true;
          break;
        }
      }

      if (descendantVisible) {
        continue;
      }
    }

    finalResponse = await clickSidebarLabel(page, currentLabel, isLast);
  }

  return { response: finalResponse, missingSidebar: false };
}

async function clickMainText(page, text, targetIndex = 0) {
  const matcher = toMatcher(text);
  const candidates = [
    page.locator('main a, main button, main [role="button"]'),
    page.locator('#app a, #app button, #app [role="button"]'),
    page.locator('a, button, [role="button"]'),
  ];

  for (const candidate of candidates) {
    const matches = candidate.filter({ hasText: matcher });
    const count = await matches.count();
    let visibleIndex = -1;
    let element = null;

    for (let index = 0; index < count; index += 1) {
      const item = matches.nth(index);

      if (!await item.isVisible().catch(() => false)) {
        continue;
      }

      visibleIndex += 1;
      if (visibleIndex === targetIndex) {
        element = item;
        break;
      }
    }

    if (!element) {
      continue;
    }

    const currentUrl = page.url();
    const navigation = page.waitForNavigation({
      waitUntil: 'domcontentloaded',
      timeout: 5000,
    }).catch(() => null);

    await element.scrollIntoViewIfNeeded().catch(() => {});
    await element.click();
    const response = await navigation;
    await settlePage(page);

    if (!response && page.url() === currentUrl) {
      throw new ScanIssueError('missing-feature', `Klik aksi "${text}" tidak membuka halaman tujuan yang berbeda.`);
    }

    return response;
  }

  throw new ScanIssueError('missing-feature', `Elemen aksi "${text}" tidak ditemukan pada area utama halaman.`);
}

function inferMissingSidebar(step, openSpec) {
  if (step.allowNoSidebar || openSpec.allowNoSidebar) {
    return false;
  }

  if (openSpec.mode === 'path') {
    return true;
  }

  if (openSpec.mode !== 'click') {
    return false;
  }

  if (/Form Tambah/i.test(step.title)) {
    return false;
  }

  return true;
}

async function executeOpen(page, step, openSpec, accountKey) {
  if (openSpec.mode === 'account-home') {
    const homePath = ACCOUNT_HOME_PATHS[accountKey];

    if (!homePath) {
      throw new ScanIssueError('client-error', `Home route untuk akun "${accountKey}" tidak tersedia.`);
    }

    const response = await page.goto(`${BASE_URL}${homePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    await settlePage(page);

    return { response, missingSidebar: false };
  }

  if (openSpec.mode === 'sidebar') {
    const homePath = ACCOUNT_HOME_PATHS[accountKey];

    if (homePath && openSpec.resetToAccountHome !== false) {
      await page.goto(`${BASE_URL}${homePath}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });
      await settlePage(page);
    }

    return openSidebarPath(page, openSpec.path);
  }

  if (openSpec.mode === 'click') {
    if (openSpec.from) {
      await executeOpen(page, step, openSpec.from, accountKey);
    }

    const response = await clickMainText(page, openSpec.text, openSpec.index ?? 0);

    return {
      response,
      missingSidebar: inferMissingSidebar(step, openSpec),
    };
  }

  if (openSpec.mode === 'path') {
    const response = await page.goto(`${BASE_URL}${openSpec.path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    await settlePage(page);

    return {
      response,
      missingSidebar: inferMissingSidebar(step, openSpec),
    };
  }

  throw new ScanIssueError('client-error', `Mode navigasi tidak dikenali: ${openSpec.mode}`);
}

function getBodyTextFlags(bodyText) {
  const lowered = bodyText.toLowerCase();

  return {
    isServerError:
      /internal server error|errorexception|relationnotfoundexception|undefined variable|laravel/i.test(bodyText) ||
      (lowered.includes('server error') && lowered.includes('exception trace')),
    isPermissionError:
      /\b403\b/.test(bodyText) ||
      lowered.includes('anda tidak memiliki akses') ||
      lowered.includes('forbidden') ||
      lowered.includes('unauthorized'),
    isClientError:
      /\b404\b/.test(bodyText) ||
      lowered.includes('not found') ||
      lowered.includes('halaman tidak ditemukan') ||
      lowered.includes('method not allowed'),
    isLogin:
      lowered.includes('login') &&
      lowered.includes('password') &&
      lowered.includes('ingat saya'),
    noData:
      /tidak ada data|belum ada data|data kosong|belum ada riwayat|belum ada catatan|tidak ditemukan data/i.test(bodyText),
    incompleteData:
      /integrasi|sinkron|akan muncul setelah integrasi|akan tersedia setelah integrasi|menunggu integrasi|placeholder/i.test(bodyText),
    missingFeature:
      /coming soon|belum tersedia|segera hadir|fitur belum tersedia/i.test(bodyText),
  };
}

function getPriority(category) {
  switch (category) {
    case 'server-error':
      return 'Critical';
    case 'permission':
    case 'auth':
    case 'client-error':
    case 'missing-feature':
      return 'High';
    case 'missing-sidebar':
    case 'incomplete-data':
      return 'Medium';
    case 'no-data':
    default:
      return 'Low';
  }
}

async function analyzeStep(page, response, step, openMeta, screenshot) {
  const bodyText = await page.locator('body').innerText().catch(() => '');
  const contentText = await page.locator('main').innerText().catch(() => bodyText);
  const bodyFlags = getBodyTextFlags(bodyText);
  const contentFlags = getBodyTextFlags(contentText);
  const statusCode = response?.status() ?? null;
  const url = page.url();

  if (url.includes('/login') || bodyFlags.isLogin || statusCode === 401) {
    return {
      ok: false,
      url,
      statusCode,
      screenshot,
      issues: [{
        category: 'auth',
        description: 'Halaman mengarah ke login atau sesi tidak aktif saat membuka langkah ini.',
        screenshot,
        priority: getPriority('auth'),
      }],
    };
  }

  if (statusCode === 500 || bodyFlags.isServerError || contentFlags.isServerError) {
    return {
      ok: false,
      url,
      statusCode,
      screenshot,
      issues: [{
        category: 'server-error',
        description: 'Halaman menampilkan error server atau exception Laravel.',
        screenshot,
        priority: getPriority('server-error'),
      }],
    };
  }

  if (statusCode === 403 || bodyFlags.isPermissionError || contentFlags.isPermissionError) {
    return {
      ok: false,
      url,
      statusCode,
      screenshot,
      issues: [{
        category: 'permission',
        description: 'Akses ke halaman ini ditolak untuk role yang sedang digunakan.',
        screenshot,
        priority: getPriority('permission'),
      }],
    };
  }

  if (statusCode === 404 || statusCode === 405 || bodyFlags.isClientError || contentFlags.isClientError) {
    return {
      ok: false,
      url,
      statusCode,
      screenshot,
      issues: [{
        category: 'client-error',
        description: 'Halaman tidak ditemukan atau metode aksesnya tidak sesuai.',
        screenshot,
        priority: getPriority('client-error'),
      }],
    };
  }

  const issues = [];
  const isFormStep = /Form/i.test(step.title);

  if (!isFormStep && contentFlags.noData) {
    issues.push({
      category: 'no-data',
      description: 'Halaman tampil tetapi data yang ditampilkan masih kosong atau belum tersedia.',
      screenshot,
      priority: getPriority('no-data'),
    });
  }

  if (!isFormStep && contentFlags.incompleteData) {
    issues.push({
      category: 'incomplete-data',
      description: 'Halaman menunjukkan data atau integrasi belum lengkap.',
      screenshot,
      priority: getPriority('incomplete-data'),
    });
  }

  if (!isFormStep && contentFlags.missingFeature) {
    issues.push({
      category: 'missing-feature',
      description: 'Halaman menunjukkan fitur belum tersedia atau masih berupa placeholder.',
      screenshot,
      priority: getPriority('missing-feature'),
    });
  }

  if (openMeta.missingSidebar) {
    issues.push({
      category: 'missing-sidebar',
      description: 'Halaman ini dicapai lewat quick action atau tombol sekunder karena tidak ada item sidebar langsung.',
      screenshot,
      priority: getPriority('missing-sidebar'),
    });
  }

  return {
    ok: true,
    url,
    statusCode,
    screenshot,
    issues,
  };
}

async function createSession(browser, accountKey) {
  const account = accounts[accountKey];

  if (!account) {
    throw new Error(`Akun "${accountKey}" tidak didefinisikan.`);
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await settlePage(page);
  await fillFirstVisible(page, ['input[name="login"]', 'input[name="email"]'], account.email);
  await fillFirstVisible(page, ['input[name="password"]'], account.password);

  const navigation = page.waitForNavigation({
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  }).catch(() => null);

  const submitButton = await clickVisible(page.locator('button[type="submit"], input[type="submit"]'));
  if (!submitButton) {
    await clickVisible(page.locator('button').filter({ hasText: /masuk|login|sign in/i }));
  }
  await navigation;
  await settlePage(page);

  const loginFailed = page.url().includes('/login')
    || await page.locator('input[name="password"]').first().isVisible().catch(() => false);

  if (loginFailed) {
    throw new ScanIssueError('auth', `Login gagal untuk akun ${account.email}.`);
  }

  const pendingIssues = [];
  const landingBody = await page.locator('body').innerText().catch(() => '');
  const landingFlags = getBodyTextFlags(landingBody);
  const homePath = ACCOUNT_HOME_PATHS[accountKey];

  if ((landingFlags.isServerError || accountKey === 'tendik') && homePath) {
    if (landingFlags.isServerError) {
      pendingIssues.push({
        category: 'server-error',
        description: `Landing default setelah login menuju ${page.url()} mengalami error, sehingga scan dilanjutkan dari ${homePath}.`,
        screenshot: null,
        priority: getPriority('server-error'),
      });
    }

    await page.goto(`${BASE_URL}${homePath}`, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    await settlePage(page);
  }

  return {
    accountKey,
    account,
    context,
    page,
    pendingIssues,
  };
}

async function ensureSession(browser, session, accountKey) {
  if (session && session.accountKey === accountKey) {
    return session;
  }

  if (session) {
    await session.context.close();
  }

  return createSession(browser, accountKey);
}

function buildFeatureResultsRecord(feature, step, accountKey, result) {
  return {
    step: step.file,
    title: step.title,
    account: accountKey,
    ok: result.ok,
    url: result.url,
    statusCode: result.statusCode,
    screenshot: result.screenshot,
    issues: result.issues,
  };
}

function persistResults(results) {
  ensureDir(P3M_ROOT);
  fs.writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2));
}

async function run() {
  ensureDir(P3M_ROOT);

  const results = {
    date: todayJakarta(),
    baseUrl: BASE_URL,
    features: {},
  };

  const browser = await chromium.launch({
    headless: true,
  });

  let session = null;

  try {
    for (const feature of features) {
      const featureDir = path.join(P3M_ROOT, feature.name);
      const screenshotsDir = path.join(featureDir, 'screenshots');
      resetDir(screenshotsDir);

      results.features[feature.name] = [];

      console.log(`\n=== ${feature.name} :: ${feature.title} ===`);

      for (const step of feature.steps) {
        const accountKey = step.account || feature.account;
        session = await ensureSession(browser, session, accountKey);

        console.log(`→ [${accountKey}] ${step.title}`);

        try {
          const navigationResult = await executeOpen(session.page, step, step.open, accountKey);
          const screenshot = await saveStepScreenshot(session.page, screenshotsDir, step.file, false);
          const analyzed = await analyzeStep(
            session.page,
            navigationResult.response,
            step,
            navigationResult,
            screenshot,
          );

          if (session.pendingIssues?.length) {
            analyzed.issues.push(...session.pendingIssues);
            session.pendingIssues = [];
          }

          results.features[feature.name].push(
            buildFeatureResultsRecord(feature, step, accountKey, analyzed),
          );

          const issueSummary = analyzed.issues.map((issue) => issue.category).join(', ');
          if (!analyzed.ok) {
            console.log(`  FAIL :: ${issueSummary || 'error'}`);
          } else if (issueSummary) {
            console.log(`  WARN :: ${issueSummary}`);
          } else {
            console.log('  OK');
          }
        } catch (error) {
          const category = error instanceof ScanIssueError ? error.category : 'client-error';
          const screenshot = await saveStepScreenshot(session.page, screenshotsDir, step.file, true);

          results.features[feature.name].push({
            step: step.file,
            title: step.title,
            account: accountKey,
            ok: false,
            url: session.page.url(),
            statusCode: null,
            screenshot,
            issues: [{
              category,
              description: error.message,
              screenshot,
              priority: getPriority(category),
            }],
          });

          console.log(`  FAIL :: ${category} :: ${error.message}`);
        }

        persistResults(results);
      }
    }
  } finally {
    if (session) {
      await session.context.close().catch(() => {});
    }

    await browser.close().catch(() => {});
    persistResults(results);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
