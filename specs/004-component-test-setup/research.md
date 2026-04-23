# Research: Component Test Setup

**Branch**: `004-component-test-setup` | **Date**: 2026-04-23
**Resolves**: All NEEDS CLARIFICATION items from technical context

---

## Decision 1: jest-axe compatibility with Vitest 2.x

**Decision**: Use `jest-axe` directly with Vitest 2.x without a compatibility shim.

**Rationale**: `jest-axe` extends the test runner's `expect` via `expect.extend(toHaveNoViolations)`. Vitest 2.x provides a fully jest-compatible `expect` implementation. The `expect.extend()` API is identical, so the matcher registers correctly at runtime. `jest-axe` does not call any jest-specific globals (e.g., `jest.fn()`) in its matcher implementation — it only reads the result object from axe-core and computes a pass/fail. Confirmed working in published Vitest + jest-axe examples as of Vitest 2.x.

**TypeScript augmentation**: `jest-axe` ships types that extend `jest.Matchers`. Because Vitest's `expect` is separate, a local type-augmentation file in `src/test/jest-axe.d.ts` must extend `CustomMatchers` on Vitest's expect interface to give TypeScript full type coverage for `.toHaveNoViolations()`.

**Alternatives considered**:

- `vitest-axe` — a Vitest-native wrapper around axe-core with first-class Vitest types. Rejected because the user explicitly specified `jest-axe`; switching would violate the explicit technology requirement.
- `@axe-core/playwright` (already installed) — runs axe inside Playwright's browser. Not usable for Vitest jsdom component tests; remains in use for E2E accessibility checks.

---

## Decision 2: Vitest environment isolation (jsdom vs node)

**Decision**: Use `environmentMatchGlobs` in `vitest.config.ts` to assign jsdom to `src/**/*.test.tsx` and keep node for `tests/unit/**/*.test.ts`.

**Rationale**: Vitest 2.x supports `test.environmentMatchGlobs` — an array of `[glob, environment]` tuples that override the default environment per file pattern. Setting `environment: 'node'` as the base and adding `['src/**/*.test.tsx', 'jsdom']` as an override ensures:

- All existing unit tests in `tests/unit/` continue to run in node without any file changes.
- Co-located component tests in `src/components/**/*.test.tsx` run in jsdom automatically by matching the `src/**/*.test.tsx` glob.
- No per-file `@vitest-environment` docblock comments are needed in individual test files.

The `jsdom` package must be installed as a devDependency; Vitest 2.x treats it as a peer dependency for the jsdom environment mode.

**Alternatives considered**:

- Per-file `@vitest-environment jsdom` docblock — works but requires every component test author to remember to add it. Rejected as error-prone.
- Splitting into two separate Vitest config files (`vitest.unit.config.ts`, `vitest.component.config.ts`) — works but complicates the test command and CI setup. Rejected in favour of a single config.
- `happy-dom` instead of jsdom — lighter, but less widely tested with React Testing Library. Rejected in favour of jsdom which is the RTL-documented default.

---

## Decision 3: CSS module handling in jsdom

**Decision**: Rely on Vite's built-in CSS module transform; no `identity-obj-proxy` or stub required.

**Rationale**: Vitest runs tests through Vite's transform pipeline. CSS modules are processed by Vite and return an object mapping local names to generated class strings (e.g., `{ item: 'item_abc123' }`). In a jsdom environment the styles are not applied (jsdom does not parse CSS), but the class name strings are valid. Because all component tests use React Testing Library queries by role, label, and text rather than by CSS class name, the generated class strings are never asserted on and cause no test failures.

**Alternatives considered**:

- `identity-obj-proxy` — maps all CSS module imports to a proxy returning the property name as the class name (`styles.item → 'item'`). Unnecessary because Vite already returns a valid object; adding identity-obj-proxy would introduce a secondary transform that obscures real class name generation during debugging.

---

## Decision 4: Per-UI-state axe assertion pattern

**Decision**: Call `checkA11y(container)` once per meaningful UI state within a single test or across separate tests, with one explicit state change between each call.

**Rationale**: The user requirement is "axe validation checks should be run at every key UI state of a component." For a toggle component like `FAQItem`, the key states are: (1) initial/collapsed and (2) open/expanded. Each state may present different DOM structure (hidden vs visible content, updated `aria-expanded` attribute) and different accessibility relationships that axe evaluates independently.

The reference test pattern is:

```
render → checkA11y(collapsed state) → userEvent.click → checkA11y(expanded state)
```

This pattern is encoded in the reference `faq-item.test.tsx` and documented in `quickstart.md` as the required convention for any component with multiple interactive states.

**Alternatives considered**:

- Single axe check on initial render only — misses violations that only appear in secondary states (e.g., a newly revealed region with a broken `aria-labelledby`). Rejected.
- Running axe as a global `afterEach` on the entire document — runs axe on whatever the DOM contains at teardown, which may be a partially torn-down state. Rejected as unreliable.

---

## Pre-existing Defect: FAQItem `aria-labelledby` violation

**Finding**: `faq-item.tsx` contains a region element (`<div role="region" aria-labelledby="faq-question-${entry.id}">`) that references an ID that does not exist in the DOM. The `<button>` that questions are wrapped in has no `id` attribute set.

**Impact**: axe-core rule `aria-labelledby` will report a violation when the answer region is visible. This will cause the per-state axe assertion to fail on the expanded state in the reference test.

**Resolution**: Add `id={`faq-question-${entry.id}`}` to the `<button>` element in `faq-item.tsx` as part of this feature's implementation. This is a genuine fix, not a test bypass.

**Decision**: Fix the defect in `faq-item.tsx`. The reference test serves as the mechanism that surfaces and verifies the fix.
