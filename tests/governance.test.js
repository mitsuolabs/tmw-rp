const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.join(__dirname, '..');

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

test('repository contains required GitHub governance files', () => {
  const required = [
    '.github',
    '.github/workflows',
    '.github/ISSUE_TEMPLATE',
    '.github/PULL_REQUEST_TEMPLATE',
    '.github/CODEOWNERS',
    '.github/workflows/branch-protection.yml',
    'scripts/check-signoff.js',
    'scripts/commit-hash.js',
    'scripts/check-branch-policy.js',
    'package.json',
    'corporate.md'
  ];

  required.forEach((entry) => {
    assert.equal(fs.existsSync(path.join(root, entry)), true, `missing: ${entry}`);
  });
});

test('branch policy uses indie-branch and corporate language', () => {
  const workflow = read('.github/workflows/pages.yml');
  const codeowners = read('.github/CODEOWNERS');
  const corporate = read('corporate.md');

  assert.match(workflow, /indie-branch/i, 'GitHub Pages should deploy from indie-branch');
  assert.match(codeowners, /@DanMit-Dev/i, 'CODEOWNERS must grant maintainers access');
  assert.match(corporate, /main.*compliance.*complicity|master.*better than you|indie-branch/i, 'corporate.md should reject main/master language and point to indie-branch');
});

test('bot identity and branch protection policy are declared for the release pipeline', () => {
  const files = [
    '.github/workflows/release.yml',
    '.github/workflows/pages.yml',
    '.github/workflows/review-gate.yml',
    '.github/workflows/tests.yml'
  ];

  files.forEach((entry) => {
    const content = read(entry);
    assert.match(content, /TMW-PR_Musikly|indie-branch/i, `missing bot identity or branch policy in ${entry}`);
  });
});

test('browser app keeps no i18n markers and contains a valid script block', () => {
  const html = read('index.html');
  assert.equal(/data-i18n|i18n/i.test(html), false, 'i18n markers should not be left in the app');
  assert.equal(/<script[\s\S]*?<\/script>/.test(html), true, 'expected at least one script block');
});

test('project documentation stays aligned with the browser-first radio concept', () => {
  const readme = read('README.md');
  const guide = read('GUIDE.md');

  assert.match(readme, /single-file|browser-native|no-backend/i);
  assert.match(guide, /Radio Browser|direct stream|CSV/i);
});

test('workflow contracts exist for CI, release, GitHub Pages, signoff, and commit hash tracking', () => {
  const workflowNames = [
    '.github/workflows/tests.yml',
    '.github/workflows/release.yml',
    '.github/workflows/pages.yml',
    '.github/workflows/commit-signoff.yml',
    '.github/workflows/commit-hash.yml',
    '.github/workflows/branch-protection.yml'
  ];

  workflowNames.forEach((entry) => {
    assert.equal(fs.existsSync(path.join(root, entry)), true, `missing workflow: ${entry}`);
  });
});

test('commit hash script works even before the first commit exists', () => {
  const result = spawnSync('node', ['scripts/commit-hash.js'], {
    cwd: root,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(fs.existsSync(path.join(root, '.artifacts', 'commit-hash.txt')), true);
});
