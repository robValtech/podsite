# Tasks: Git Untrack Ignored Files

**Input**: Design documents from `specs/005-git-untrack-ignored/`
**Prerequisites**: plan.md ✓ spec.md ✓ research.md ✓ data-model.md ✓ quickstart.md ✓

---

## Phase 1: Setup (Audit)

**Purpose**: Confirm the current state of the git index before making any changes.

- [x] T001 Confirm tracked-but-ignored files by running `git ls-files -ci --exclude-standard` from the repo root and verifying the output lists exactly: `.DS_Store`, `.vscode/settings.json`, `frontend/tests/e2e/keyboard-focus.spec.ts`, `frontend/tests/unit/content-schema.test.ts`
- [x] T002 Confirm output folders are not tracked by running `git ls-files | grep -E "playwright-report|test-results|\.next|node_modules"` and verifying the output is empty

**Checkpoint**: Baseline state confirmed — proceed with edits.

---

## Phase 2: Foundational (Fix `.gitignore`)

**Purpose**: The `.gitignore` must be corrected BEFORE any `git rm --cached` commands are run. Running `git rm --cached` before fixing the gitignore risks accidentally untracking source test files.

**⚠️ CRITICAL**: T003 MUST be complete before T004.

- [x] T003 [US2] Edit `.gitignore` at the repo root: (1) remove the `frontend/tests/` line, (2) add `!.vscode/settings.json` on a new line directly after the `.vscode/` line, (3) remove duplicate entries for `*.log`, `*.swp`, `coverage/`, and the second `.vscode/` block with its `# VS Code` comment. The final file must match the target state in `research.md`.

**Checkpoint**: `.gitignore` is corrected — safe to run index operations.

---

## Phase 3: User Story 1 — Remove machine-generated files from tracking (Priority: P1)

**Goal**: `.DS_Store` removed from the git index; `.vscode/settings.json` reclassified from tracked-but-ignored to cleanly tracked.

**Independent Test**: `git ls-files -ci --exclude-standard` returns no lines containing `.DS_Store` or `.vscode/settings.json`. `git ls-files | grep ".vscode/settings"` shows `.vscode/settings.json` is tracked.

- [x] T004 [US1] Run `git rm --cached .DS_Store` from the repo root to remove the file from the git index (file must remain on disk)
- [x] T005 [US1] Verify `.DS_Store` is removed: `git ls-files | grep "\.DS_Store"` returns empty
- [x] T006 [US1] Verify `.vscode/settings.json` is still tracked: `git ls-files | grep ".vscode/settings"` returns `.vscode/settings.json`

**Checkpoint**: `.DS_Store` untracked. `.vscode/settings.json` cleanly tracked. US1 complete.

---

## Phase 4: User Story 2 — Fix incorrect ignore rule covering source test files (Priority: P2)

**Goal**: Source test files in `frontend/tests/` are no longer classified as tracked-but-ignored.

**Independent Test**: `git ls-files -ci --exclude-standard` returns no lines for `frontend/tests/e2e/keyboard-focus.spec.ts` or `frontend/tests/unit/content-schema.test.ts`. `git ls-files | grep "frontend/tests"` shows both files as tracked.

> Note: The `.gitignore` edit for this story was done in T003 (foundational). Tasks here verify the outcome.

- [x] T007 [US2] Verify source test files are tracked and not ignored: run `git ls-files -ci --exclude-standard` and confirm neither `frontend/tests/e2e/keyboard-focus.spec.ts` nor `frontend/tests/unit/content-schema.test.ts` appears in the output
- [x] T008 [US2] Verify both test files appear as tracked: `git ls-files | grep "frontend/tests"` must return both `frontend/tests/e2e/keyboard-focus.spec.ts` and `frontend/tests/unit/content-schema.test.ts`

**Checkpoint**: Source test files correctly tracked. US2 complete.

---

## Phase 5: User Story 3 — Verify the repository is clean (Priority: P3)

**Goal**: Zero tracked-but-ignored files remain. Working tree clean. All source files intact.

**Independent Test**: `git ls-files -ci --exclude-standard` returns empty. `git status` shows clean working tree.

- [x] T009 [US3] Run `git ls-files -ci --exclude-standard` and confirm the output is completely empty (zero lines)
- [x] T010 [US3] Confirm output folders are still not tracked: `git ls-files | grep -E "playwright-report|test-results|\.next|coverage"` must return empty
- [x] T011 [US3] Stage all changes: `git add .gitignore` (`.DS_Store` removal is already staged by `git rm --cached`)

**Checkpoint**: All acceptance criteria met — ready to commit.

---

## Phase 6: Polish & Commit

**Purpose**: Apply the change as a single, reviewable commit on the feature branch.

- [x] T012 Commit all staged changes with message: `chore: fix gitignore and untrack ignored files` — body: remove frontend/tests/ rule (incorrectly ignored source test files), add !.vscode/settings.json negation (settings.json contains project-level Speckit config), untrack .DS_Store via git rm --cached, remove duplicate .gitignore entries
- [x] T013 Run final validation: `git ls-files -ci --exclude-standard` returns empty; `git status` shows clean working tree (only the feature branch commit ahead)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Audit)**: No dependencies — start immediately
- **Phase 2 (Fix .gitignore)**: Depends on Phase 1 — BLOCKS Phases 3 and 4
- **Phase 3 (US1)**: Depends on Phase 2 completion
- **Phase 4 (US2)**: Depends on Phase 2 completion — can run in parallel with Phase 3
- **Phase 5 (US3)**: Depends on Phases 3 and 4 completion
- **Phase 6 (Commit)**: Depends on Phase 5 completion

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 (`.gitignore` fixed before `git rm --cached`)
- **US2 (P2)**: Depends on Phase 2 — can run in parallel with US1 (verification only)
- **US3 (P3)**: Depends on US1 and US2 completion (verification gate)

### No Parallel Opportunities

All tasks are sequential git operations on a single file and the git index. Parallelism is not applicable.

---

## Implementation Strategy

### MVP (User Story 1 Only)

1. Complete Phase 1: Audit
2. Complete Phase 2: Fix `.gitignore` (CRITICAL gate)
3. Complete Phase 3: US1 (`git rm --cached .DS_Store`)
4. **Validate**: `git ls-files -ci --exclude-standard` returns only the two test files
5. Continue to Phase 4/5/6 for full clean-up

### Full Delivery (Recommended — all in one commit)

1. Phase 1: Audit → confirm baseline
2. Phase 2: Edit `.gitignore`
3. Phase 3: `git rm --cached .DS_Store`
4. Phase 4: Verify test files (no new commands needed — just validation)
5. Phase 5: Final verification + stage
6. Phase 6: Single commit

**Total tasks**: 13 | **Commit count**: 1 | **Files changed**: 1 (`.gitignore`) + git index
