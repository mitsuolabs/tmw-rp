#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = process.cwd();
const distDir = path.join(root, 'dist');
const tarballPath = path.join(distDir, 'tmw-rp-release.tar.gz');

const entries = [
  'index.html',
  'index.html',
  'README.md',
  'GUIDE.md',
  'CONTRIBUTING.md',
  'MAINTAINERS.md',
  'LICENSE',
  'CodeOfConduct.md',
  'CodeOfDrivingCars.md'
].filter((file) => fs.existsSync(path.join(root, file)));

if (!entries.length) {
  throw new Error('No release payload files were found in the repository root.');
}

fs.mkdirSync(distDir, { recursive: true });

const result = spawnSync('tar', ['-czf', tarballPath, ...entries], {
  cwd: root,
  stdio: 'inherit'
});

if (result.status !== 0) {
  throw new Error('Failed to generate the release tarball.');
}

console.log(`Release tarball created at ${tarballPath}`);
