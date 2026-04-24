---
description: "Use when creating or updating React component tests, Vitest component tests, RTL tests, or accessibility assertions for components."
applyTo: "@/components/**/*.level1.test.tsx"
---

# Component Test Level 1 Guidance

## Firing events

- Don't use `fireEvent`, use `userEvent` from `@/test/render` instead
- Call `userEvent.setup();` before firing events

## Keyboard interactions

- Use `user.tab()` until the required element is focused, do not use `element.focus()`
- Use `user.keyboard('{enter}')` and `user.keyboard(' ')` for Enter and Space key activation

## Required test scenarios

- Renders with minimal required props
- Renders with all props
- Optional className prop applies className to the root element
- Optional id prop is applied to the root element and children use that id to generate their own id, aria-labelledby, aria-describedby, htmlFor attributes as appropriate
- When id prop is not provided the root element uses a generated id and children use that id for their attributes as appropriate
- Optional dataTestId prop applies data-testid to the root element and children use this value to generate their own data-testid as appropriate
- Checks semantic HTML structure (e.g. uses <button> for clickable elements, not <div>)
- Element accessors use accessible queries (e.g. getByRole, getByLabelText, getByText) rather than test IDs or class names, unless no accessible query is available for a given element

## Accessibility checks

- Checks accessibility with vitest-axe on all key UI states, including after user interactions that cause meaningful DOM updates (e.g. opening a dropdown, toggling a tab, expanding an accordion item, etc.)
- Decorative images have empty alt text (`alt=""`) and are marked with `role="presentation"`, iconography uses `aria-hidden="true"`. Do not speculate or assume if an image or icon is decorative
- If a form control has a visible label, it MUST be associated with the control using a <label> element and htmlFor attribute, not just aria-label or aria-labelledby. This ensures the best accessibility and usability for all users.

## Coding style

- MUST NOT add comments to the code unless they explain the reasoning behind a non-obvious assertion or interaction, or clarify why a particular testing approach was taken. Do not add comments that simply restate what the code is doing.
- If an element query is used more than once in a test scenario, assign it to a variable with a descriptive name. For example, if you are querying for a button that opens a dropdown, you might assign it to a variable named `openDropdownButton` rather than just `button`.
- MUST NOT use queryByText or similar when testing the absence of text depending on optional props. Use ids and queryByTestId instead to avoid false positives when the text is empty string or only whitespace.

### Test organization

- MUST group all test scenarios inside a single describe block for the component. The most outer block is called by the component name, e.g. `describe("TextInput", () => { ... })`
- All test scenarios within the outer describe block go inside separate describe blocks based on the type of test: rendering, user interactions, accessibility checks, etc.
- MUST group the rendering test scenarios in the same describe block using the name "rendering". This is the first describe block in the file, before any interaction or accessibility checks.
- MUST group user mouse user and keyboard user driven interaction scenarios into the second describe block by the name "a11y: operability". Within this describe block mouse user driven scenarios go into a block called "mouse interactions" and keyboard user driven scenarios go into a block called "keyboard interactions". These should be the second describe block in the file, after the rendering tests and before the "a11y: static checks" describe block.
- MUST group the test scenarios with axe checks in the same describe block using the name "a11y: static checks". This is the last describe block in the file, after all rendering and interaction tests.
- MUST not guess where certain test scenarios should go, if it's not clear whether a test scenario is a rendering test, interaction test, or accessibility check, raise it for manual review rather than making an assumption. The goal is to have a consistent and logical organization of tests across all components, so when in doubt, ask for clarification rather than guessing.

## Out of scope

- Rendering with missing props (covered by TypeScript)
