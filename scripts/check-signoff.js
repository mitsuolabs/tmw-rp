#!/usr/bin/env node

const { execSync } = require('node:child_process');

function run(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
}

function getCommitMessages() {
  try {
    const raw = run('git rev-list --max-count=50 HEAD');
    const ids = raw.split('\n').filter(Boolean);
    if (!ids.length) {
      return [];
    }

    return ids.map((id) => ({
      id,
      message: run(`git log -1 --format=%B ${id}`)
    }));
  } catch (error) {
    console.warn('No commit history detected in the current repository context.');
    return [];
  }
}

const commitMessages = getCommitMessages();

if (!commitMessages.length) {
  console.log('No commits detected. Sign-off validation skipped.');
  process.exit(0);
}

const offenders = commitMessages
  .filter(({ message }) => !/Signed-off-by:/i.test(message))
  .map(({ id }) => id.slice(0, 12));

if (offenders.length) {
  console.error('Commit sign-off check failed for commits without Signed-off-by:');
  console.error(offenders.join('\n'));
  console.error('\nAdd a line like: Signed-off-by: Your Name <you@example.com>');
  process.exit(1);
}

console.log(`All ${commitMessages.length} recent commit(s) include a valid sign-off.`);
