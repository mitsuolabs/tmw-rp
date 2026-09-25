#!/usr/bin/env node

const forbidden = ['main', 'master'];
const protectedBranch = 'indie-branch';
const baseRef = (process.env.GITHUB_BASE_REF || '').trim();
const headRef = (process.env.GITHUB_HEAD_REF || '').trim();
const refName = (process.env.GITHUB_REF_NAME || process.env.BRANCH_NAME || '').trim();

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

if (baseRef) {
  if (baseRef !== protectedBranch) {
    fail(`Branch protection failed: pull requests must target ${protectedBranch}; received ${baseRef}.`);
  }
  console.log(`Pull request target branch is protected: ${baseRef}.`);
  process.exit(0);
}

if (forbidden.includes(refName.toLowerCase())) {
  fail(`Branch protection failed: ${refName} is forbidden. Use ${protectedBranch} instead.`);
}

if (refName && refName !== protectedBranch) {
  console.warn(`Branch policy check: ${refName} is not the protected branch. This repository expects pushes to ${protectedBranch}.`);
  process.exit(0);
}

if (headRef && forbidden.includes(headRef.toLowerCase())) {
  fail(`Branch protection failed: head branch ${headRef} is forbidden. Use ${protectedBranch} instead.`);
}

if (!refName) {
  console.log(`No branch metadata detected; defaulting to ${protectedBranch} policy.`);
}

console.log(`Branch policy passed for ${refName || protectedBranch}.`);
process.exit(0);
