# Feature Specification: Git Untrack Ignored Files

**Feature Branch**: `005-git-untrack-ignored`
**Created**: 2026-04-23
**Status**: Draft
**Input**: User description: "I want to clean up the repo from already tracked files that should have been ignored by git"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Remove machine-generated files from tracking (Priority: P1)

A developer cloning or pulling the repo encounters machine-generated and IDE-specific files (`.DS_Store`, `.vscode/settings.json`) that are committed to version control. These files carry no project value, differ between machines, and pollute the commit history. They must be removed from tracking so they no longer appear in `git status` or diffs.

**Why this priority**: These files are already in `.gitignore` and have no legitimate reason to be tracked. Removing them is a pure clean-up with no risk to source code.

**Independent Test**: Can be fully tested by running `git ls-files -ci --exclude-standard` after the change and confirming `.DS_Store` and `.vscode/settings.json` are no longer listed as tracked-but-ignored.

**Acceptance Scenarios**:

1. **Given** `.DS_Store` is currently tracked, **When** the clean-up is applied, **Then** `.DS_Store` is no longer listed by `git ls-files` and does not appear in `git status`.
2. **Given** `.vscode/settings.json` is currently tracked, **When** the clean-up is applied, **Then** `.vscode/settings.json` is no longer tracked and does not appear in diffs or `git status`.
3. **Given** both files have been untracked, **When** macOS regenerates `.DS_Store` or VS Code writes `settings.json`, **Then** neither file is staged or committed by git.

---

### User Story 2 - Fix incorrect ignore rule covering source test files (Priority: P2)

The `.gitignore` contains the rule `frontend/tests/` which causes git to treat `frontend/tests/e2e/keyboard-focus.spec.ts` and `frontend/tests/unit/content-schema.test.ts` as ignored files — even though they are real source files that must be tracked. If these files were ever untracked, the E2E and unit test suites would be lost from the repository. The incorrect rule must be removed or corrected so that real test source files are tracked normally.

**Why this priority**: The incorrect rule is a latent risk. If a developer runs `git rm --cached` broadly or another tool honours the gitignore, real source files could be silently dropped from the repository.

**Independent Test**: Can be fully tested by running `git ls-files -ci --exclude-standard` after removing the incorrect rule and confirming `frontend/tests/e2e/keyboard-focus.spec.ts` and `frontend/tests/unit/content-schema.test.ts` are no longer listed as tracked-but-ignored.

**Acceptance Scenarios**:

1. **Given** `frontend/tests/` is currently in `.gitignore`, **When** the rule is removed or corrected, **Then** `git ls-files -ci --exclude-standard` returns no results for those test files.
2. **Given** the rule is corrected, **When** `git status` is run, **Then** the test files appear as tracked and unmodified (not ignored, not untracked).
3. **Given** the corrected `.gitignore`, **When** a new test file is added to `frontend/tests/`, **Then** git tracks it normally without requiring a `--force` flag.

---

### User Story 3 - Verify the repository is clean after the fix (Priority: P3)

After both clean-up actions, a developer running the standard diagnostic commands should find zero tracked-but-ignored files, all test source files fully tracked, and the working tree clean on the feature branch.

**Why this priority**: This is a verification gate, not new capability. It confirms the first two stories are complete and nothing was missed.

**Independent Test**: Can be fully tested by running `git ls-files -ci --exclude-standard` and confirming the output is empty, then running `git status` and confirming the working tree is clean.

**Acceptance Scenarios**:

1. **Given** all clean-up actions are applied, **When** `git ls-files -ci --exclude-standard` is run, **Then** the output is empty.
2. **Given** all clean-up actions are applied, **When** `git status` is run, **Then** the working tree is clean with no unexpected staged, unstaged, or untracked files.
3. **Given** the repository is clean, **When** a fresh clone is made, **Then** the cloned repo contains all source test files and none of the machine-generated files.

---

### Edge Cases

- What if `.DS_Store` files exist in subdirectories as well as the root? The `.gitignore` rule `**/.DS_Store` or `.DS_Store` (without path prefix) covers all locations, but `git rm --cached` must be run recursively.
- What if `.vscode/` contains files other than `settings.json` that should remain tracked (e.g., recommended extensions)? Only `settings.json` is currently tracked and matched by the ignore rule; other files, if present, would be evaluated separately.
- What if removing `frontend/tests/` from `.gitignore` causes previously untracked test-result artefacts in that directory to become visible? Any build artefacts that were silently hidden by the rule would appear as untracked and must be evaluated individually.
- What happens if the clean-up commit is merged onto a branch where these files are still tracked? The `git rm --cached` commit will remove them from that branch's index as expected.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The files `.DS_Store` and `.vscode/settings.json` MUST be removed from git's index (untracked) while remaining on disk.
- **FR-002**: The `.gitignore` entry `frontend/tests/` MUST be removed or replaced so that source test files in `frontend/tests/` are tracked normally.
- **FR-003**: After the change, `git ls-files -ci --exclude-standard` MUST return an empty result (no tracked-but-ignored files remain).
- **FR-004**: After the change, `frontend/tests/e2e/keyboard-focus.spec.ts` and `frontend/tests/unit/content-schema.test.ts` MUST appear as tracked and unmodified in `git status`.
- **FR-005**: The `.gitignore` MUST continue to ignore legitimate build and machine artefacts: `node_modules/`, `.next/`, `out/`, `playwright-report/`, `test-results/`, `coverage/`, `.DS_Store`, `.vscode/`.
- **FR-006**: The clean-up MUST be applied as a single commit on the feature branch so it can be reviewed and reverted independently.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: `git ls-files -ci --exclude-standard` returns zero lines after the clean-up commit is applied.
- **SC-002**: `git status` shows a clean working tree immediately after the clean-up commit with no unexpected entries.
- **SC-003**: Both `frontend/tests/e2e/keyboard-focus.spec.ts` and `frontend/tests/unit/content-schema.test.ts` appear in `git ls-files` (confirmed tracked) after the fix.
- **SC-004**: `.DS_Store` and `.vscode/settings.json` do not appear in `git ls-files` (confirmed untracked) after the fix.

## Assumptions

- `.vscode/settings.json` contains only personal IDE preferences and carries no project-level configuration that other contributors need. If it contains shared settings (e.g., recommended extensions), that content should be moved to `.vscode/extensions.json` before untracking.
- No other directories or files are currently tracked but matched by `.gitignore` beyond the four items identified by `git ls-files -ci --exclude-standard`: `.DS_Store`, `.vscode/settings.json`, `frontend/tests/e2e/keyboard-focus.spec.ts`, `frontend/tests/unit/content-schema.test.ts`.
- The `frontend/tests/` rule in `.gitignore` was added by mistake, intended perhaps for `test-results/` or `coverage/`. Those artefact directories are already covered by separate rules.
- Removing `frontend/tests/` from `.gitignore` will not expose previously hidden artefact files in that directory; the subdirectory contains only source test files.
