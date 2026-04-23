# Feature Specification: Component Test Setup

**Feature Branch**: `004-component-test-setup`
**Created**: 2026-04-23
**Status**: Draft
**Input**: User description: "Set up the repo for component testing. The component testing stack will use react testing library, jsdom, user-event and axe-core. Update the vite and vitest config to accommodate for the component testing but make sure the existing e2e and unit testing does not break. Component tests to be co-located with the component code."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Write a co-located component test (Priority: P1)

A developer working on a UI component wants to write a test file in the same directory as the component. They should be able to render the component, query it by accessible role or label, simulate keyboard and pointer interactions, and make assertions about rendered output and state — all from a test file sitting next to the component source.

**Why this priority**: This is the foundational capability. Without it, component tests cannot exist. All other stories depend on this working first.

**Independent Test**: Can be fully tested by creating a single test file in `src/components/faq/` that renders `FAQItem`, opens and closes it via button click, and asserts on rendered content and ARIA attributes. This delivers a complete authoring and execution experience independently of accessibility automation.

**Acceptance Scenarios**:

1. **Given** a component file at `src/components/faq/faq-item.tsx`, **When** a developer creates `src/components/faq/faq-item.test.tsx` and runs the test command, **Then** the test is discovered and executed without errors.
2. **Given** a component test that renders `FAQItem` and queries by role, **When** the test runs, **Then** the component renders successfully and the query resolves to the correct element.
3. **Given** a component test that simulates a button click via keyboard interaction, **When** the test runs, **Then** the component state updates and the DOM reflects the change correctly.
4. **Given** a component test that imports DOM matchers, **When** the test makes an assertion such as `toBeVisible()` or `toHaveAttribute()`, **Then** the matcher is available globally without manual import in each test file.

---

### User Story 2 - Run an accessibility check inside a component test (Priority: P2)

A developer wants to assert that a component has no detectable accessibility violations as part of a component test. They should be able to call a shared accessibility helper and receive a clear failure when a violation is present, without embedding low-level axe configuration in each test.

**Why this priority**: Accessibility verification at the component level catches violations earlier and closer to the source than E2E tests alone. It does not block the core component testing capability, but is the next most important addition.

**Independent Test**: Can be fully tested by adding one axe assertion to the `FAQItem` test, deliberately introducing an accessibility defect, and confirming the test fails with a clear diagnostic message. Once that passes, the accessibility helper is proven to work.

**Acceptance Scenarios**:

1. **Given** a component test that renders a component and calls an accessibility assertion helper, **When** the rendered output has no accessibility violations, **Then** the assertion passes.
2. **Given** a component test that renders a component with a deliberate accessibility defect, **When** the accessibility assertion runs, **Then** the test fails and reports the violation clearly.
3. **Given** a component test that uses the shared accessibility helper, **When** no axe configuration is embedded in the test file, **Then** the assertion still runs correctly using defaults.

---

### User Story 3 - Run all test types without conflict (Priority: P3)

A developer running the full test suite expects unit tests, component tests, and end-to-end tests to all pass without configuration changes or test isolation failures. Existing tests must continue to behave identically.

**Why this priority**: Non-regression is essential but does not add new capability on its own. It is a quality gate on the other two stories rather than a standalone feature.

**Independent Test**: Can be fully tested by running `npm test` and `npm run test:e2e` after the component test setup is in place and confirming all pre-existing tests still pass with no changes to test source files.

**Acceptance Scenarios**:

1. **Given** the updated test configuration, **When** existing unit tests in `tests/unit/` are run, **Then** all pass identically to before.
2. **Given** the updated test configuration, **When** Playwright end-to-end tests are run, **Then** all pass identically to before.
3. **Given** both unit and component test files exist, **When** the standard test command is run, **Then** both test types are discovered and executed in a single pass without one interfering with the other.
4. **Given** a component test using jsdom and a unit test using the node environment, **When** both run in the same test pass, **Then** each uses the correct environment without leaking state.

---

### Edge Cases

- What happens when a component test file is placed next to a component that uses Next.js-specific APIs such as `useRouter` or `next/image`? Rendering such components in jsdom may fail without mocking.
- What happens when a CSS module is imported in a component test? jsdom does not process CSS, so style-based assertions must not be relied upon.
- What happens when a component test imports a server component or uses `"use client"` directives in ways incompatible with jsdom? Tests should fail clearly rather than silently.
- How does the setup handle test isolation when global DOM state is modified between tests?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The test runner MUST support a jsdom environment for component test files co-located with component source files, independently of the node environment used for existing unit tests.
- **FR-002**: Component test files MUST be discoverable when placed in the same directory as their source component, following the pattern `[component-name].test.tsx`.
- **FR-003**: React Testing Library render, query, and assertion utilities MUST be available in component tests without per-file setup.
- **FR-004**: User interaction simulation utilities (keyboard, pointer) MUST be available in component tests for testing interactive component behavior.
- **FR-005**: DOM-specific test matchers MUST be available globally in all component tests without explicit import in each file.
- **FR-006**: An accessibility assertion helper using axe-core MUST be available in component tests via a shared utility, without per-test axe configuration.
- **FR-007**: A shared test setup file MUST register global DOM matchers and handle cleanup after each component test automatically.
- **FR-008**: A shared render utility MUST wrap the standard rendering function so component tests have a consistent import path and can be extended with providers later.
- **FR-009**: Existing unit tests in `tests/unit/*.test.ts` MUST continue to pass without any changes to their source files.
- **FR-010**: Existing Playwright end-to-end tests MUST continue to pass without any changes to their source files or configuration.
- **FR-011**: The standard test command MUST discover and run both unit and component tests in a single execution.
- **FR-012**: The accessibility assertion helper MUST be called once for each key UI state of a component under test; calling it only on initial render is insufficient for interactive components.

### Key Entities

- **Component test file**: A test file co-located with a component source file, following the `[component-name].test.tsx` naming convention, using React Testing Library and optional accessibility assertions.
- **Shared test setup file**: A file registered in the test runner configuration that runs before each test, providing global DOM matchers and cleanup behavior.
- **Shared render utility**: A module that wraps the standard React Testing Library render call, centralizing future provider or context setup.
- **Accessibility assertion helper**: A shared utility that runs axe-core against rendered component output and fails the test if violations are found.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Developers can create a component test file co-located with any existing component and run it with the standard test command without additional per-test configuration.
- **SC-002**: The reference `FAQItem` test calls `checkA11y` once in the collapsed state and once in the expanded state; both pass with no axe violations.
- **SC-003**: All unit tests and end-to-end tests that existed before this change continue to pass after the change, with no modifications to their source.
- **SC-004**: A component test for `FAQItem` covering render, interaction, and accessibility runs successfully and serves as a reference for future component tests.
- **SC-005**: Running the standard test command returns results that include both existing unit tests and any new component tests in a single output.

## Assumptions

- The existing Vitest and React Vite plugin setup is sufficient to support JSX compilation for co-located component tests without a separate build configuration.
- CSS modules used in components will be treated as identity objects in the test environment; style-based assertions are not expected in component tests.
- Components using Next.js-specific APIs will require manual mocking in component tests; this is acceptable for the initial setup and does not need to be automated in this feature.
- The initial reference component test will target `FAQItem` because it has clear interactive and accessible behavior that demonstrates the full component testing workflow without router or server dependencies.
- Running `npm test` will be extended to cover component tests in the same pass; a separate test command for component tests only is not required.
- `vitest-axe` is the axe-core integration library for accessibility assertions. It provides first-class Vitest types with no additional type augmentation required (formerly considered: `jest-axe`).
- `jsdom` is the DOM simulation environment for component tests. It is the React Testing Library documented default and provides the broadest ARIA query compatibility (alternative considered: `happy-dom`).

## Clarifications

### Session 2026-04-23

- Q: Which axe-core integration library should be used for accessibility assertions in component tests? → A: vitest-axe
- Q: Which component test file naming pattern is intended — simple `[component-name].test.tsx` or level-tiered `[component-name].level1.test.tsx`? → A: Simple `[component-name].test.tsx`; glob: `src/**/*.test.tsx`
- Q: Should the per-UI-state axe assertion requirement be formally encoded in the spec as a functional requirement? → A: Yes — added as FR-012
- Q: Which DOM simulation environment should be used for component tests — jsdom or happy-dom? → A: jsdom
- Q: Should SC-002 be updated to a measurable, state-specific outcome tied to the reference FAQItem test? → A: Yes — updated to specify collapsed and expanded state checks both passing
