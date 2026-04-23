# Data Model: Component Test Setup

**Branch**: `004-component-test-setup` | **Date**: 2026-04-23

> This feature introduces no domain entities or persistent data. The "entities" below are the shared test infrastructure modules that all component tests depend on.

---

## Test Infrastructure Entities

### TestSetupModule

**What it represents**: The global configuration file registered in `vitest.config.ts` via `setupFiles`. Runs once before each test file.

**Responsibility**:

- Extends `expect` with `@testing-library/jest-dom` DOM matchers (e.g., `toBeVisible`, `toHaveAttribute`, `toBeInTheDocument`)
- Extends `expect` with `jest-axe`'s `toHaveNoViolations` matcher
- Registers `afterEach(() => cleanup())` to unmount React trees after each test

**Source path**: `frontend/src/test/setup.ts`

**Relationships**: Referenced by `vitest.config.ts → test.setupFiles`. Applied to every test that runs in the jsdom environment (and the node environment, since it is a global setup file).

---

### RenderUtility

**What it represents**: A thin wrapper around `@testing-library/react`'s `render` function. Provides a single import path for all component tests and allows future extension with React context providers (e.g., theme, router) without changing test files.

**Responsibility**:

- Re-exports `render` from `@testing-library/react` as the default `render` for component tests
- Re-exports all RTL query utilities (`screen`, `within`, `fireEvent`, `waitFor`) for convenience
- Accepts an optional `options` parameter passed through to the underlying RTL render

**Source path**: `frontend/src/test/render.tsx`

**Relationships**: Imported by all component test files (`.test.tsx`) in place of direct `@testing-library/react` imports.

---

### AccessibilityHelper

**What it represents**: A shared asynchronous function that runs jest-axe against a rendered container and asserts no violations. Encapsulates all axe configuration so individual tests remain free of axe-specific boilerplate.

**Responsibility**:

- Accepts an `HTMLElement` (the `container` returned by `render`)
- Calls `axe(container)` from `jest-axe`
- Asserts `expect(results).toHaveNoViolations()`
- Throws on violation, causing the calling test to fail with a clear axe diagnostic message

**Source path**: `frontend/src/test/accessibility.ts`

**Relationships**: Imported by component tests that include accessibility assertions. Called once per key UI state (e.g., collapsed, expanded).

---

### ComponentTestFile

**What it represents**: A test file co-located with a component source file. Not a module per se, but a convention that defines the test authoring contract.

**Key attributes**:

- `location`: Same directory as the component (`src/components/[feature]/`)
- `naming`: `[component-name].test.tsx`
- `imports`: `render`, `screen` from `@/test/render`; `checkA11y` from `@/test/accessibility`; `userEvent` from `@testing-library/user-event`; the component under test
- `pattern`: One `describe` block per component; one `it` block per scenario; `checkA11y` called once per key UI state

**Source path example**: `frontend/src/components/faq/faq-item.test.tsx`

**Relationships**: Discovered by Vitest via `src/**/*.test.tsx` include pattern; runs in jsdom via `environmentMatchGlobs`.

---

## State Transitions: FAQItem (Reference Component)

The reference test covers `FAQItem` which has two key accessibility states:

```
Initial render
  └─► [collapsed state]
        aria-expanded="false"
        answer region: hidden
        checkA11y() ← axe assertion point 1

  → user clicks button
        └─► [expanded state]
              aria-expanded="true"
              answer region: visible
              checkA11y() ← axe assertion point 2
```

This two-state model is the template for documenting axe assertion points in any component with interactive state changes.

---

## Configuration Changes

### vitest.config.ts (updated)

| Field                        | Before                          | After                                   |
| ---------------------------- | ------------------------------- | --------------------------------------- |
| `plugins`                    | absent                          | `[react()]` from `@vitejs/plugin-react` |
| `test.environment`           | `"node"`                        | `"node"` (unchanged; base default)      |
| `test.environmentMatchGlobs` | absent                          | `[["src/**/*.test.tsx", "jsdom"]]`      |
| `test.include`               | `["./tests/unit/**/*.test.ts"]` | adds `"./src/**/*.test.tsx"`            |
| `test.setupFiles`            | absent                          | `["./src/test/setup.ts"]`               |

### package.json devDependencies (additions)

| Package                       | Purpose                                      |
| ----------------------------- | -------------------------------------------- |
| `@testing-library/react`      | Component rendering and querying             |
| `@testing-library/jest-dom`   | DOM-specific matchers (`toBeVisible`, etc.)  |
| `@testing-library/user-event` | Realistic user interaction simulation        |
| `jest-axe`                    | axe-core runner with jest-compatible matcher |
| `jsdom`                       | DOM simulation environment for Vitest        |
