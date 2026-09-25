#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execSync } = require('node:child_process');

function run(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
}

const targetDir = path.join(process.cwd(), '.artifacts');
fs.mkdirSync(targetDir, { recursive: true });

let commitId = 'unborn-head';
let status = 'unborn-head';
let sha256 = crypto.createHash('sha256').update(`status=${status}:workspace=${process.cwd()}`).digest('hex');

try {
  const commitObject = run('git cat-file commit HEAD');
  commitId = run('git rev-parse HEAD');
  const digestSource = commitObject;
  sha256 = crypto.createHash('sha256').update(digestSource).digest('hex');
  status = 'head-commit';
} catch (error) {
  status = 'unborn-head';
  const snapshot = `repo=${process.cwd()}|status=unborn-head|files=${fs.readdirSync(process.cwd()).sort().join(',')}`;
  sha256 = crypto.createHash('sha256').update(snapshot).digest('hex');
  console.log('No HEAD commit exists yet; generated a deterministic provisional hash for the current working tree snapshot.');
}

const output = [
  `commit_id=${commitId}`,
  `status=${status}`,
  `sha256=${sha256}`,
  `timestamp=${new Date().toISOString()}`,
  ''
].join('\n');

fs.writeFileSync(path.join(targetDir, 'commit-hash.txt'), output, 'utf8');
console.log(`Commit identity: ${commitId}`);
console.log(`SHA256 digest: ${sha256}`);
console.log(`Artifact written to ${path.join(targetDir, 'commit-hash.txt')}`);
