#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const maintainerFile = path.join(root, 'MAINTAINERS.md');
const reviewCount = Number(process.env.REVIEW_COUNT || process.env.PR_REVIEW_COUNT || '0');
const actor = (process.env.GITHUB_ACTOR || process.env.PR_AUTHOR || '').trim();
const isMaintainerBypass = fs.existsSync(maintainerFile)
  ? fs.readFileSync(maintainerFile, 'utf8').includes(actor)
  : false;

if (isMaintainerBypass) {
  console.log(`Maintainer bypass granted for ${actor}.`);
  process.exit(0);
}

if (reviewCount >= 1) {
  console.log(`At least one review was recorded (count=${reviewCount}).`);
  process.exit(0);
}

console.error('Review gate failed: at least one review is required unless the author is listed in MAINTAINERS.md.');
process.exit(1);
