const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('review gate fails without a review and without maintainer bypass', () => {
  const result = spawnSync('node', ['scripts/check-review-policy.js'], {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      REVIEW_COUNT: '0',
      GITHUB_ACTOR: 'external-contributor'
    }
  });

  assert.equal(result.status, 1, result.stdout || result.stderr);
  assert.match(result.stderr || result.stdout, /Review gate failed/i);
});

test('review gate passes when a review exists', () => {
  const result = spawnSync('node', ['scripts/check-review-policy.js'], {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      REVIEW_COUNT: '1',
      GITHUB_ACTOR: 'external-contributor'
    }
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout || result.stderr, /At least one review/i);
});
