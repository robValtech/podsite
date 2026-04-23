# Quickstart: Git Untrack Ignored Files

**Branch**: `005-git-untrack-ignored` | **Date**: 2026-04-23

---

## What this feature does

Fixes the repository's git tracking state in three steps:

1. **Removes `.DS_Store`** from the git index (while keeping the file on disk).
2. **Narrows the `.vscode/` ignore rule** so that `settings.json` (which contains project-level Speckit config) stays tracked, while other VS Code personal files remain ignored.
3. **Removes the `frontend/tests/` rule** from `.gitignore` so that source test files (`keyboard-focus.spec.ts`, `content-schema.test.ts`) are tracked normally.

Output folders (`playwright-report/`, `test-results/`, `.next/`, etc.) are already correctly untracked — no changes needed for them.

---

## Steps to implement

### Step 1: Edit `.gitignore`

Replace the entire `.gitignore` with the cleaned-up version:

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

Changes from the current file:

- `!.vscode/settings.json` added after `.vscode/`
- `frontend/tests/` line removed
- Duplicate rules removed (`*.log`, `*.swp`, `coverage/`, `.vscode/`, `# VS Code` comment block)

### Step 2: Untrack `.DS_Store`

```bash
# From the repository root
git rm --cached .DS_Store
```

This removes `.DS_Store` from the git index but leaves it on disk.

### Step 3: Verify

Run the diagnostic command — output must be empty:

```bash
git ls-files -ci --exclude-standard
```

Verify test source files are still tracked:

```bash
git ls-files | grep "frontend/tests"
# Expected:
# frontend/tests/e2e/keyboard-focus.spec.ts
# frontend/tests/unit/content-schema.test.ts
```

Verify `.vscode/settings.json` is still tracked:

```bash
git ls-files | grep ".vscode"
# Expected:
# .vscode/settings.json
```

Verify output folders are not tracked:

```bash
git ls-files | grep -E "playwright-report|test-results|\.next"
# Expected: empty
```

### Step 4: Commit

```bash
git add .gitignore
git commit -m "chore: fix gitignore and untrack ignored files

- Remove frontend/tests/ rule (was incorrectly ignoring source test files)
- Add !.vscode/settings.json negation (settings.json has project-level Speckit config)
- Untrack .DS_Store via git rm --cached
- Remove duplicate .gitignore entries"
```

---

## Diagnostic background

The problem was diagnosed using:

```bash
git ls-files -ci --exclude-standard
```

Before the fix, this returned four files:

```
.DS_Store
.vscode/settings.json
frontend/tests/e2e/keyboard-focus.spec.ts
frontend/tests/unit/content-schema.test.ts
```

After the fix it returns nothing.

---

## Key clarification vs spec

The feature spec assumed `.vscode/settings.json` should be untracked (personal IDE preferences). However, the file actually contains:

- `chat.promptFilesRecommendations` — Speckit prompt file mappings needed by all contributors
- `chat.tools.terminal.autoApprove` — Speckit script auto-approval needed for the workflow

This file has project value and must remain tracked. The `.gitignore` rule is narrowed with a negation (`!.vscode/settings.json`) instead of removing it entirely.
