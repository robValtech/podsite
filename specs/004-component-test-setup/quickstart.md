# Quickstart: Writing Component Tests

**Branch**: `004-component-test-setup` | **Date**: 2026-04-23
**Audience**: Developers and AI agents authoring component tests for `frontend/src/components/`

---

## Prerequisites

Ensure the component test stack is installed and configured:

```bash
cd frontend
npm install
npm test    # all unit and component tests must pass
```

---

## 1. Create the test file

Place the test file **next to** the component source file:

```
src/components/faq/faq-item.tsx        ← component
src/components/faq/faq-item.test.tsx   ← test (create this)
```

Naming: `[component-name].test.tsx`

---

## 2. Minimal test structure

```tsx
import { describe, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test/render";
import { checkA11y } from "@/test/accessibility";
import { FAQItem } from "./faq-item";

const entry = {
  id: "q1",
  question: "What is this?",
  answer: "A test answer.",
};

describe("FAQItem", () => {
  it("renders collapsed by default", async () => {
    const { container } = render(<FAQItem entry={entry} />);

    expect(
      screen.getByRole("button", { name: /what is this/i }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("region")).not.toBeVisible();

    await checkA11y(container); // ← axe check: collapsed state
  });

  it("expands when the button is activated", async () => {
    const user = userEvent.setup();
    const { container } = render(<FAQItem entry={entry} />);

    await user.click(screen.getByRole("button", { name: /what is this/i }));

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region")).toBeVisible();

    await checkA11y(container); // ← axe check: expanded state
  });
});
```

---

## 3. Key rules

### axe assertions — one per UI state

Call `checkA11y(container)` once per **key UI state**:

| State                  | When to call checkA11y                                              |
| ---------------------- | ------------------------------------------------------------------- |
| Initial render         | After `render(...)` and initial assertions                          |
| After toggle/open      | After the interaction that reveals content                          |
| After toggle/close     | After the interaction that hides content (if DOM structure changes) |
| After form submission  | If error messages or new regions appear                             |
| After modal open/close | Before and after the modal is in the DOM                            |

**Never** skip a state that introduces new DOM structure or ARIA relationships.

### Query by accessible role or label — not by class

```ts
// Correct
screen.getByRole("button", { name: /what is this/i });
screen.getByRole("region");
screen.getByText(/a test answer/i);

// Avoid
container.querySelector(".questionWrapper"); // CSS class — not accessible
container.querySelector("[data-testid=faq]"); // test-id — only when no accessible query exists
```

### Use `userEvent.setup()` — not legacy static methods

```ts
// Correct
const user = userEvent.setup();
await user.click(button);
await user.keyboard("{Enter}");

// Avoid (legacy API — not fully event-faithful)
userEvent.click(button);
fireEvent.click(button);
```

---

## 4. Running component tests

```bash
# All tests (unit + component)
cd frontend && npm test

# Watch mode
npm run test:watch

# E2E only (unaffected by component test setup)
npm run test:e2e
```

---

## 5. Reference component test

[faq-item.test.tsx](../../frontend/src/components/faq/faq-item.test.tsx) is the canonical reference for any new component test. If it passes, the stack is correctly configured.

---

## 6. What the shared utilities handle automatically

You do not need to:

- Import `@testing-library/jest-dom` — matchers are registered globally in `src/test/setup.ts`
- Call `cleanup()` — registered as `afterEach` in `src/test/setup.ts`
- Configure axe per test — `checkA11y` uses default axe rules with no per-call setup needed
- Wrap with providers — `render` in `@/test/render` is the extension point; add providers there once when needed

---

## 7. Next.js API mocking

For components that use `next/navigation`, `next/image`, or `next/link`, add mocks in the test file:

```ts
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/",
}));
```

This is the only case where per-file configuration is required. The limitation is documented in the spec assumptions.

---

## 8. Common failure modes

| Symptom                                                             | Likely cause                                                 | Fix                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| `axe violation: aria-labelledby value must be the id of an element` | Element referenced by `aria-labelledby` has no matching `id` | Add `id` to the referenced element in the component        |
| `TypeError: Cannot read properties of null` in render               | Component uses Next.js-specific API without a mock           | Add `vi.mock(...)` for the Next.js module                  |
| `toBeVisible is not a function`                                     | Setup file not registered in `vitest.config.ts`              | Add `setupFiles: ["./src/test/setup.ts"]` to vitest config |
| Component test runs in node environment                             | File not matching `src/**/*.test.tsx` glob                   | Rename file to `.test.tsx` and ensure it is under `src/`   |
