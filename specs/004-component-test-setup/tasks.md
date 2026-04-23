# Tasks: Component Test Setup

**Input**: Design documents from `specs/004-component-test-setup/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/test-utilities.md ✓

**Tech stack**: TypeScript 5.x / Node.js 20 LTS, Next.js 14, React 18, Vitest 2.1.x, @vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, vitest-axe, jsdom

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and update the test runner configuration. All subsequent phases depend on this being complete.

- [ ] T001 Install 5 devDependencies in `frontend/package.json`: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `vitest-axe`, `jsdom`
- [ ] T002 Update `frontend/vitest.config.ts`: add `@vitejs/plugin-react` to `plugins`, add `environmentMatchGlobs: [["src/**/*.test.tsx", "jsdom"]]`, add `"./src/**/*.test.tsx"` to `include`, add `setupFiles: ["./src/test/setup.ts"]`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the shared test utilities that every component test will import. Must be complete before any user story implementation begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T003 [P] Create `frontend/src/test/setup.ts`: import and extend `expect` with `@testing-library/jest-dom` matchers, import and extend `expect` with `vitest-axe` `toHaveNoViolations` matcher, register `afterEach(cleanup)` from `@testing-library/react`
- [ ] T004 [P] Create `frontend/src/test/render.tsx`: re-export `render`, `screen`, `within`, `waitFor`, `act` from `@testing-library/react`; re-export `userEvent` as default re-export from `@testing-library/user-event`; re-export types `RenderResult` and `RenderOptions`

**Checkpoint**: Foundation ready — unit tests still pass (`npm test`), shared utilities importable, jsdom available for `src/**/*.test.tsx` files

---

## Phase 3: User Story 1 — Write a co-located component test (Priority: P1) 🎯 MVP

**Goal**: A developer can create a test file next to a component and test render output, accessible role queries, and interactive state changes using RTL and user-event.

**Independent Test**: Create `frontend/src/components/faq/faq-item.test.tsx` and run `npm test`. The test must discover and execute, render `FAQItem`, query the button by accessible role, simulate a click, and assert `aria-expanded` toggles from `false` to `true`. No axe assertions in this phase.

- [ ] T005 [US1] Create `frontend/src/components/faq/faq-item.test.tsx` with a `describe("FAQItem")` block containing: (a) a test asserting the button renders with `aria-expanded="false"` and the answer region is hidden on initial render; (b) a test that uses `userEvent.setup()` to click the button and asserts `aria-expanded="true"` and the region becomes visible; import `render`, `screen`, `userEvent` from `@/test/render`; import `FAQItem` from `./faq-item`

**Checkpoint**: `npm test` passes — `faq-item.test.tsx` discovered and green, existing `tests/unit/content-schema.test.ts` still passes

---

## Phase 4: User Story 2 — Run an accessibility check inside a component test (Priority: P2)

**Goal**: A developer can call `checkA11y(container)` once per key UI state in a component test and receive a clear failure if axe finds a violation. `FAQItem` passes in both collapsed and expanded states.

**Independent Test**: Add `checkA11y` calls to the `FAQItem` test — one after initial render, one after click. Both must pass. First confirm the expanded-state check fails (due to the pre-existing `aria-labelledby` defect), then fix the defect, then confirm both pass.

- [ ] T006 [P] [US2] Create `frontend/src/test/a11y.ts`: export `async function checkA11y(container: HTMLElement): Promise<void>` that calls `axe(container)` from `vitest-axe` and asserts `expect(results).toHaveNoViolations()`; no configuration parameters accepted
- [ ] T007 [P] [US2] Fix `frontend/src/components/faq/faq-item.tsx`: add `id={\`faq-question-${entry.id}\`}`to the`<button>`element so the`aria-labelledby` reference on the answer region resolves correctly
- [ ] T008 [US2] Extend `frontend/src/components/faq/faq-item.test.tsx`: add `import { checkA11y } from "@/test/a11y"` and add `await checkA11y(container)` as the final assertion in both the initial-render test (collapsed state) and the post-click test (expanded state)

**Checkpoint**: `npm test` passes — both `checkA11y` calls are green; the `aria-labelledby` defect is confirmed fixed

---

## Phase 5: User Story 3 — Run all test types without conflict (Priority: P3)

**Goal**: The full test suite — unit tests, component tests, and E2E tests — runs cleanly with no environment bleed, failures, or configuration changes to pre-existing test files.

**Independent Test**: Run `npm test` (all Vitest tests) and `npm run test:e2e` (Playwright) immediately after completing Phases 1–4. All pre-existing tests must pass with no changes to their source.

- [ ] T009 [P] [US3] Verify `frontend/tests/unit/content-schema.test.ts` passes unmodified in node environment by running `npm test` and confirming the unit test is included in output and green
- [ ] T010 [P] [US3] Verify `frontend/tests/e2e/keyboard-focus.spec.ts` passes unmodified by running `npm run test:e2e` and confirming all 6 Playwright test cases are green

**Checkpoint**: All three test types pass — unit (node env), component (jsdom env), E2E (Playwright)

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Consistency and documentation alignment across the design artifacts.

- [ ] T011 Update `frontend/src/test/setup.ts` import comment to reference `vitest-axe` (not `jest-axe`) as the axe matcher source, confirming no type augmentation `.d.ts` file is needed
- [ ] T012 [P] Update `specs/004-component-test-setup/spec.md` status from `Draft` to `Ready`
- [ ] T012 [P] Update `specs/004-component-test-setup/plan.md` Summary and Primary Dependencies to reference `vitest-axe` instead of `jest-axe`

---

## Dependencies

```
T001 (install deps)
  └─► T002 (vitest config)
        └─► T003 (setup.ts) ──┐
        └─► T004 (render.tsx) ─┤
                               ├─► T005 [US1] (faq-item.test.tsx: render + interaction)
                               │         └─► T008 [US2] (add checkA11y to test)
              T006 [US2] (a11y.ts) ──────────────┘
              T007 [US2] (fix faq-item.tsx) ───────┘
                                    └─► T009 [US3] (verify unit tests)
                                    └─► T010 [US3] (verify E2E tests)
T011, T012 are independent polish tasks
```

**User story completion order**: US1 → US2 → US3 (each is a prerequisite for the next)

---

## Parallel Execution Examples

### Phase 2 (run together)

```
T003 frontend/src/test/setup.ts
T004 frontend/src/test/render.tsx
```

### Phase 4 (run together, then T008)

```
T006 frontend/src/test/a11y.ts
T007 frontend/src/components/faq/faq-item.tsx  (fix aria-labelledby)
→ then T008 (add checkA11y to test)
```

### Phase 5 (run together)

```
T009 npm test (unit + component)
T010 npm run test:e2e (Playwright)
```

---

## Implementation Strategy

**MVP** (US1 only — Phases 1–3, T001–T005): Installs the stack and creates one working component test. Proves discovery, rendering, querying, and interaction work. No accessibility checks yet.

**Full delivery**: Complete all phases in order. US2 is the axe integration; US3 is the regression gate.

**Suggested sequence for a single agent or developer**:

1. T001 → T002 → (T003 + T004 in parallel) → T005 → verify checkpoint
2. (T006 + T007 in parallel) → T008 → verify checkpoint
3. (T009 + T010 in parallel) → verify checkpoint
4. T011 + T012 in parallel
