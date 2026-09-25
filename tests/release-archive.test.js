const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('bundle:release creates a tarball from the public distribution payload', () => {
  const result = spawnSync('node', ['scripts/archive-release.js'], {
    cwd: root,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  const tarball = path.join(root, 'dist', 'tmw-rp-release.tar.gz');
  assert.equal(fs.existsSync(tarball), true, 'release tarball was not created');
  assert.match(result.stdout, /Release tarball created/i);
});
