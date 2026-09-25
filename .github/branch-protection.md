# Branch protection policy

The protected branch for this project is `indie-branch`.

## Required protections

- no direct pushes to `indie-branch` without review
- pull requests must target `indie-branch`
- at least one review is required unless the author is a listed maintainer
- CODEOWNERS must authorize the modified paths
- release and Pages workflows must run only from `indie-branch`
- `main` and `master` are explicitly rejected as operational branch names

The repository intentionally rejects the corporate branch logic described in `corporate.md` and uses `indie-branch` as the single source of truth.
