# Data Model: Git Untrack Ignored Files

**Branch**: `005-git-untrack-ignored` | **Date**: 2026-04-23

---

## Overview

This feature has no domain data model. There are no entities, database schemas, API resources, or application state to design. The feature operates entirely on the git repository's index and the `.gitignore` configuration file.

The "data" in scope is documented below as the before/after state of the git index and `.gitignore`.

---

## Git Index State

| File                                         | Before                                                   | After                                      | Method                                       |
| -------------------------------------------- | -------------------------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| `.DS_Store`                                  | Tracked (ignored by `.gitignore`)                        | Untracked, present on disk                 | `git rm --cached .DS_Store`                  |
| `.vscode/settings.json`                      | Tracked (ignored by `.gitignore`)                        | Tracked, not ignored (negation rule added) | Add `!.vscode/settings.json` to `.gitignore` |
| `frontend/tests/e2e/keyboard-focus.spec.ts`  | Tracked, classified as ignored by `frontend/tests/` rule | Tracked, not ignored                       | Remove `frontend/tests/` from `.gitignore`   |
| `frontend/tests/unit/content-schema.test.ts` | Tracked, classified as ignored by `frontend/tests/` rule | Tracked, not ignored                       | Remove `frontend/tests/` from `.gitignore`   |

---

## `.gitignore` Rule Changes

| Rule                                                        | Change                 | Reason                                                            |
| ----------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| `frontend/tests/`                                           | REMOVE                 | Incorrectly ignores source test files                             |
| `!.vscode/settings.json`                                    | ADD (after `.vscode/`) | Allow project settings file to be tracked despite `.vscode/` rule |
| Duplicate `*.log`, `*.swp`, `coverage/`, `.vscode/` entries | REMOVE                 | Deduplication — no behavioural change                             |

---

## Validation Commands

| Command                                                     | Expected Result                                 |
| ----------------------------------------------------------- | ----------------------------------------------- |
| `git ls-files -ci --exclude-standard`                       | Empty output — no tracked-but-ignored files     |
| `git ls-files \| grep "frontend/tests"`                     | Shows both source test files — they are tracked |
| `git ls-files \| grep "\.DS_Store"`                         | Empty — `.DS_Store` not tracked                 |
| `git ls-files \| grep "\.vscode/settings"`                  | Shows `.vscode/settings.json` — still tracked   |
| `git ls-files \| grep -E "playwright-report\|test-results"` | Empty — output folders not tracked              |
| `git status`                                                | Clean working tree after the commit             |
