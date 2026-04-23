# Contract: Shared Test Utilities

**Branch**: `004-component-test-setup` | **Date**: 2026-04-23
**Scope**: Internal API surface consumed by all component tests in `frontend/src/components/`

---

## 1. Render Utility — `@/test/render`

### Exports

```ts
// Re-exports from @testing-library/react
export { render, screen, within, waitFor, act } from "@testing-library/react";
export type { RenderResult, RenderOptions } from "@testing-library/react";
// Re-exports from @testing-library/user-event
export { default as userEvent } from "@testing-library/user-event";
```

### Usage contract

```ts
import { render, screen } from "@/test/render";

render(<MyComponent prop="value" />);
const heading = screen.getByRole("heading", { name: /my heading/i, level: 2 });
```

### Invariants

- `render` MUST be the only rendering entry point for component tests. Direct imports from `@testing-library/react` are permitted for RTL utilities but `render` itself must come from `@/test/render`.
- `render` accepts the same arguments as the underlying RTL `render` (component + options).
- Future provider wrapping (e.g., theme, router mock) is added here; test files are not changed.

---

## 2. Accessibility Helper — `@/test/a11y`

### Exports

```ts
export async function checkA11y(container: HTMLElement): Promise<void>;
```

### Usage contract

```ts
import { checkA11y } from "@/test/a11y";
import { render, userEvent } from "@/test/render";

const { container } = render(<MyComponent />);
await checkA11y(container);          // asserts no violations in current state

const user = userEvent.setup();
await user.click(button);
await checkA11y(container);          // asserts no violations in next state
```

### Invariants

- `checkA11y` MUST be `await`ed — it returns a Promise.
- `checkA11y` MUST be called once for **each key UI state** of the component under test. Calling it only on initial render is insufficient for interactive components.
- `checkA11y` MUST NOT accept an axe configuration argument. All axe configuration is internal to the helper. Tests must not configure axe per-call.
- If `checkA11y` is called and the component has an accessibility violation, the test MUST fail with a descriptive axe diagnostic message. Test authors MUST NOT suppress failures with `try/catch`.
- `checkA11y` accepts only `HTMLElement`. Pass `container` from `render()`'s return value.

---

## 3. Global Setup — `@/test/setup.ts`

### Registered in `vitest.config.ts` via `test.setupFiles`

This module is not imported by test files directly. It runs automatically before each test file.

### Guaranteed globals after setup runs

| Global / Matcher                   | Source                      | Available in          |
| ---------------------------------- | --------------------------- | --------------------- |
| `expect(...).toBeInTheDocument()`  | `@testing-library/jest-dom` | all test environments |
| `expect(...).toBeVisible()`        | `@testing-library/jest-dom` | all test environments |
| `expect(...).toHaveAttribute()`    | `@testing-library/jest-dom` | all test environments |
| `expect(...).toHaveNoViolations()` | `jest-axe`                  | all test environments |
| Cleanup after each test            | `@testing-library/react`    | jsdom tests           |

### Invariants

- The setup file MUST NOT import test-subject modules or components. It is infrastructure only.
- Cleanup is registered via `afterEach(cleanup)`. Tests MUST NOT call `cleanup()` manually.

---

## 4. Component Test File Convention

### Naming and location

```
src/components/[feature]/[component-name].test.tsx
```

Example: `src/components/faq/faq-item.test.tsx`

### Required structure

```ts
import { describe, it, expect } from "vitest";
import { render, screen, userEvent } from "@/test/render";
import { checkA11y } from "@/test/a11y";
import { ComponentName } from "./component-name";

describe("ComponentName", () => {
  it("renders in its initial state", async () => {
    const { container } = render(<ComponentName {...minimalProps} />);
    // assertions on initial state
    await checkA11y(container);   // axe check on initial state
  });

  it("updates correctly after [interaction]", async () => {
    const user = userEvent.setup();
    const { container } = render(<ComponentName {...minimalProps} />);
    await user.click(screen.getByRole("button", { name: /label/i }));
    // assertions on updated state
    await checkA11y(container);   // axe check on updated state
  });
});
```

### Invariants

- Every component test file MUST include at least one `checkA11y` call.
- `checkA11y` MUST be called after every user interaction that causes a meaningful state change in the DOM.
- Tests MUST use `userEvent.setup()` (not the legacy `userEvent.*` static methods) for realistic interaction simulation.
- Tests MUST query by accessible role, label, or text. Querying by CSS class name or test ID is not permitted unless no accessible query is available.
- Tests MUST NOT assert on CSS class name strings.

---

## 5. TypeScript Configuration

### `jest-axe` matcher types

Because `jest-axe` types extend `jest.Matchers` and Vitest uses its own `expect` type, a local type augmentation is required:

**File**: `frontend/src/test/jest-axe.d.ts`

```ts
import type { JestAxeMatchers } from "jest-axe/types/jest";

declare module "vitest" {
  interface Assertion extends JestAxeMatchers {}
  interface AsymmetricMatchersContaining extends JestAxeMatchers {}
}
```

This file must be included in `frontend/tsconfig.json` via the `include` array or automatically picked up if it is under the TypeScript root.
