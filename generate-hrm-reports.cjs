const fs = require('fs');
const path = require('path');

const { features, accounts } = require('./hrm-workflow-config.cjs');

const HRM_ROOT = path.resolve(__dirname, 'hrm');
const RESULTS_PATH = path.join(HRM_ROOT, '.scan-results.json');

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

function escapeTableText(value) {
  return String(value ?? '-')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .trim();
}

function archiveExistingReport(reportPath, today) {
  if (!fs.existsSync(reportPath)) {
    return;
  }

  const current = fs.readFileSync(reportPath, 'utf8');
  const matchedDate = current.match(/\*\*Tanggal\*\*:\s*(\d{4}-\d{2}-\d{2})/);
  const archiveDate = matchedDate?.[1]
    || new Date(fs.statSync(reportPath).mtime).toISOString().split('T')[0];

  if (archiveDate === today) {
    fs.unlinkSync(reportPath);
    return;
  }

  const archivePath = path.join(path.dirname(reportPath), `${archiveDate}_REPORT.md`);

  if (!fs.existsSync(archivePath)) {
    fs.renameSync(reportPath, archivePath);
    return;
  }

  fs.unlinkSync(reportPath);
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

function summarizeStatus(results) {
  const successfulSteps = results.filter((result) => result.ok);
  const failedSteps = results.filter((result) => !result.ok);
  const warnings = successfulSteps.flatMap((result) => result.issues || []);

  if (results.length === 0) {
    return {
      label: '⚠️ Partial',
      summary: 'Belum ada hasil scan yang bisa dirangkum untuk fitur ini.',
    };
  }

  if (failedSteps.length === results.length) {
    return {
      label: '❌ Gagal',
      summary: `Semua ${failedSteps.length} langkah pada scan ini berakhir gagal dan perlu dicek ulang.`,
    };
  }

  if (failedSteps.length > 0 || warnings.length > 0) {
    return {
      label: '⚠️ Partial',
      summary: `${successfulSteps.length} langkah berhasil, ${failedSteps.length} langkah gagal, dan ${warnings.length} temuan warning tercatat.`,
    };
  }

  return {
    label: '✅ Berhasil',
    summary: `Semua ${successfulSteps.length} langkah pada scan ini lolos tanpa error maupun warning.`,
  };
}

function buildStepDescription(feature, step) {
  if (/Dashboard/i.test(step.title)) {
    return `Halaman dashboard untuk ${feature.summary.toLowerCase()} Screenshot diambil setelah halaman selesai dimuat penuh.`;
  }

  if (/Form Tambah/i.test(step.title)) {
    return `Form dibuka tanpa submit untuk memverifikasi field wajib, struktur input, dan tombol aksi pada ${feature.title.toLowerCase()}.`;
  }

  if (/Daftar|Data|Rekap|Laporan|Presensi|Penelitian|Pengabdian|Pengajaran|Pelayanan|Penghargaan|Penunjang|Bimbingan|Pengujian|Skor|Kehadiran/i.test(step.title)) {
    return `Halaman ini merekam tampilan utama ${step.title.toLowerCase()} sebagai bagian dari alur ${feature.title.toLowerCase()}.`;
  }

  return `${feature.summary} Langkah ini difokuskan pada tampilan ${step.title.toLowerCase()}.`;
}

function buildIssueRows(results) {
  return results.flatMap((result) => {
    const issues = result.issues || [];

    return issues.map((issue) => ({
      stepTitle: result.title,
      url: result.url,
      category: issue.category,
      description: issue.description,
      screenshot: issue.screenshot || result.screenshot || '-',
      priority: issue.priority || getPriority(issue.category),
    }));
  });
}

function accountLabel(accountKey) {
  return accounts[accountKey]?.label || accountKey;
}

function renderIssueTable(issueRows) {
  if (issueRows.length === 0) {
    return 'Tidak ada temuan kritis maupun warning pada scan ini.\n\n';
  }

  let markdown = '| # | Halaman | URL | Kategori | Deskripsi | Screenshot | Prioritas |\n';
  markdown += '|---|---------|-----|----------|-----------|------------|-----------|\n';

  issueRows.forEach((issue, index) => {
    const screenshotCell = issue.screenshot && issue.screenshot !== '-'
      ? `[Lihat](${issue.screenshot})`
      : '-';

    markdown += `| ${index + 1} | ${escapeTableText(issue.stepTitle)} | \`${escapeTableText(issue.url)}\` | \`${escapeTableText(issue.category)}\` | ${escapeTableText(issue.description)} | ${screenshotCell} | ${issue.priority} |\n`;
  });

  return `${markdown}\n`;
}

function renderSteps(feature, results) {
  const successfulSteps = results.filter((result) => result.ok);

  if (successfulSteps.length === 0) {
    return 'Belum ada langkah sukses yang berhasil direkam untuk fitur ini.\n\n';
  }

  let markdown = '';

  successfulSteps.forEach((result, index) => {
    const step = feature.steps.find((item) => item.file === result.step);
    const warnings = (result.issues || []).map((issue) => `${issue.category}: ${issue.description}`);

    markdown += `### ${index + 1}. ${result.title}\n\n`;
    markdown += `**Deskripsi**: ${buildStepDescription(feature, step || { title: result.title })}\n\n`;
    markdown += `**Akun**: ${accountLabel(result.account)}\n\n`;
    markdown += `**URL**: \`${result.url}\`\n\n`;

    if (warnings.length > 0) {
      markdown += `**Catatan langkah**: ${warnings.join(' ')}\n\n`;
    }

    markdown += `![${result.title}](${result.screenshot})\n\n`;
  });

  return markdown;
}

function buildReport(feature, results, today) {
  const issueRows = buildIssueRows(results);
  const status = summarizeStatus(results);

  let markdown = `# Workflow Report: ${feature.title}\n\n`;
  markdown += `**Tanggal**: ${today}  \n`;
  markdown += `**Role**: ${feature.role}  \n`;
  markdown += `**Modul**: ${feature.modul}  \n`;
  markdown += `**Fitur**: ${feature.title}  \n`;
  markdown += `**Status**: ${status.label}\n\n`;
  markdown += `## Deskripsi Workflow\n\n${feature.summary}\n\n`;
  markdown += `## Ringkasan\n\n${status.summary}\n\n`;
  markdown += `## Langkah-langkah\n\n${renderSteps(feature, results)}`;
  markdown += `## Temuan & Masalah\n\n${renderIssueTable(issueRows)}`;
  markdown += '## Catatan\n\n';
  markdown += '- Screenshot diambil otomatis menggunakan Playwright dengan full-page capture.\n';
  markdown += '- Navigasi utama diprioritaskan melalui sidebar; jika sebuah halaman hanya bisa dicapai dari quick action atau tombol sekunder, report akan menandainya sebagai `missing-sidebar`.\n';
  markdown += '- Form pada report ini dibuka untuk verifikasi visual dan field wajib, tidak disubmit secara destruktif agar hasil scan tidak memalsukan status sukses.\n';
  markdown += '- Data yang tampil mengikuti seeder HRM yang aktif saat scan dijalankan.\n';

  return markdown;
}

function main() {
  const today = todayJakarta();
  const scanResults = fs.existsSync(RESULTS_PATH)
    ? JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf8'))
    : { features: {} };

  let generatedCount = 0;

  for (const feature of features) {
    const featureDir = path.join(HRM_ROOT, feature.name);
    const screenshotsDir = path.join(featureDir, 'screenshots');
    const results = scanResults.features?.[feature.name] || [];
    const hasScreenshots = fs.existsSync(screenshotsDir)
      && fs.readdirSync(screenshotsDir).some((file) => file.endsWith('.png'));

    if (!hasScreenshots && results.length === 0) {
      continue;
    }

    ensureDir(featureDir);

    const reportPath = path.join(featureDir, 'REPORT.md');
    archiveExistingReport(reportPath, today);
    fs.writeFileSync(reportPath, buildReport(feature, results, today));

    generatedCount += 1;
    console.log(`OK :: ${feature.name}/REPORT.md`);
  }

  if (fs.existsSync(RESULTS_PATH)) {
    fs.unlinkSync(RESULTS_PATH);
  }

  console.log(`\nGenerated ${generatedCount} HRM reports`);
}

main();
