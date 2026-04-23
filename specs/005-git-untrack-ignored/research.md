# Research: Git Untrack Ignored Files

**Branch**: `005-git-untrack-ignored` | **Date**: 2026-04-23
**Resolves**: All NEEDS CLARIFICATION items + user argument about output folder tracking

---

## Decision 1: `.vscode/settings.json` — keep tracked, narrow the ignore rule

**Decision**: Keep `.vscode/settings.json` tracked. Narrow the `.vscode/` gitignore rule by adding a negation line `!.vscode/settings.json` immediately after the `.vscode/` rule.

**Rationale**: Inspecting the file content reveals it contains project-level Speckit configuration:

- `chat.promptFilesRecommendations` — maps Speckit prompt files (`.github/prompts/speckit.*.prompt.md`) for all contributors using GitHub Copilot
- `chat.tools.terminal.autoApprove` — auto-approves Speckit script paths for all contributors

These settings are not personal IDE preferences. They provide the same value to every contributor working on this project. Untracking them would break the Speckit workflow for anyone who clones the repo fresh.

**Spec deviation**: The spec (FR-001, Assumption 1) assumed `.vscode/settings.json` contains only personal preferences and should be untracked. This assumption is incorrect. The plan deviates from FR-001 for this file with full justification.

**Simpler alternative rejected**: Removing `.vscode/` from `.gitignore` entirely would expose any personal VS Code files (e.g., `.vscode/launch.json`, `.vscode/tasks.json`) that a contributor might create. The negation pattern preserves the protection while keeping `settings.json` tracked.

**Implementation**: Add `!.vscode/settings.json` as a new line directly after the `.vscode/` line.

---

## Decision 2: `.DS_Store` — untrack with `git rm --cached`

**Decision**: Run `git rm --cached .DS_Store` to remove the root-level `.DS_Store` from the git index. The existing `.DS_Store` rule in `.gitignore` already prevents future commits of this file at any path depth.

**Rationale**: `.DS_Store` is a macOS filesystem metadata file with no project value. It was committed before the `.gitignore` rule was in place (or the rule was added after the file was already tracked). `git rm --cached` removes it from the index without deleting the physical file.

**Scope**: Only the root-level `.DS_Store` is currently tracked (confirmed by `git ls-files -ci --exclude-standard`). The existing `.DS_Store` pattern in `.gitignore` (without a leading `/`) already applies recursively to all subdirectories — no rule change needed.

---

## Decision 3: `frontend/tests/` gitignore rule — remove entirely

**Decision**: Remove the line `frontend/tests/` from `.gitignore`.

**Rationale**: This rule was added by mistake. Its effect is to mark `frontend/tests/e2e/keyboard-focus.spec.ts` and `frontend/tests/unit/content-schema.test.ts` as tracked-but-ignored — a contradiction that creates a latent risk of losing source test files. The legitimate artefacts that might have motivated this rule (`test-results/`, `coverage/`) are already covered by dedicated rules in `.gitignore`. Removing the rule restores correct tracking of test source files with no side effects.

**Side effect check**: After removing the rule, `frontend/tests/` contains only source test files. No build artefacts reside there. Confirmed by directory inspection. No new untracked artefacts will appear.

---

## Decision 4: `.gitignore` deduplication

**Decision**: Remove duplicate entries while making the targeted edits.

**Rationale**: The current `.gitignore` contains:

- `.vscode/` listed twice (once without comment, once under `# VS Code`)
- `*.log` listed twice
- `*.swp` listed twice
- `coverage/` listed twice

Removing duplicates as part of this edit reduces future confusion. No behavioural change results.

---

## Decision 5: Output folder tracking — confirmed clean, no action needed

**Decision**: No `git rm --cached` actions are required for output folders.

**Rationale**: Auditing tracked files against known output directories confirms:

- `frontend/playwright-report/` — exists on disk, **not tracked** (correctly covered by `playwright-report/` rule)
- `frontend/test-results/` — exists on disk, **not tracked** (correctly covered by `test-results/` rule)
- `test-results/` (root) — exists on disk, **not tracked** (correctly covered by `test-results/` rule)
- `frontend/.next/` — not tracked (covered by `.next/` rule)
- `node_modules/` — not tracked (covered by `node_modules/` rule)
- `out/`, `dist/`, `build/` — not present and not tracked

The user's requirement "make sure no output folder is tracked by accident" is already satisfied for this repository. The plan documents this as a confirmed finding rather than a required action.

---

## Pre-existing `.gitignore` state

```
node_modules/
.next/
out/
dist/
build/
*.log              ← duplicate (appears again below)
.env
.env.local
.env.*.local
npm-debug.log*
.DS_Store
Thumbs.db
*.tmp
*.swp              ← duplicate (appears again below)
.vscode/           ← duplicate (appears again below under # VS Code)
.idea/

playwright-report/
test-results/
coverage/          ← duplicate (appears again below)

# VS Code
.vscode/           ← duplicate

*.log              ← duplicate
*.swp              ← duplicate

# Ignore local test and coverage
coverage/          ← duplicate
frontend/tests/    ← INCORRECT: covers source test files
```

## Target `.gitignore` state

```
node_modules/
.next/
out/
dist/
build/
*.log
.env
.env.local
.env.*.local
npm-debug.log*
.DS_Store
Thumbs.db
*.tmp
*.swp
.vscode/
!.vscode/settings.json
.idea/

playwright-report/
test-results/
coverage/
```
