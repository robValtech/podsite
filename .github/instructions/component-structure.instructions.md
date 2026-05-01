---
description: "Use when creating or updating React component source files (*.tsx) in the components directory. Enforce folder-per-component under frontend/src/components/<Name>/ with PascalCase file names matching the named export."
---

# Component Structure Rules

## Definitions

- **Components root**: `frontend/src/components/`
- **Component directory**: a folder named after the component, directly inside the components root — e.g. `frontend/src/components/Button/`
- **Component source file**: the `.tsx` file inside the component directory with the same PascalCase name — e.g. `frontend/src/components/Button/Button.tsx`
- **Co-located files**: test, types, styles, and any other related files that MUST live inside the component directory alongside the source file

## File placement

Every reusable component MUST live in its own component directory. No exceptions.

Valid structure for a `Button` component:

```
frontend/src/components/Button/Button.tsx
frontend/src/components/Button/Button.test.tsx
frontend/src/components/Button/Button.module.css
frontend/src/components/Button/Button.types.ts
```

Invalid — MUST NOT be used:

```
frontend/src/components/ui/Button.tsx       ← subdirectory grouping forbidden
frontend/src/components/ui/button.tsx       ← subdirectory grouping forbidden
frontend/src/components/Button.tsx          ← flat file at root level forbidden
frontend/src/components/button.tsx          ← flat file at root level forbidden
```

If a requested component placement does not fit this structure, STOP and raise the conflict. Do NOT invent a new directory pattern.

## File naming

- Component source files MUST use PascalCase.
- The file name MUST match the named export exactly: `Button.tsx` MUST export `export const Button`.
- Co-located files MUST use the same PascalCase prefix: `Button.module.css`, `Button.types.ts`, `Button.test.tsx`.

## Imports

- Imports from the same component directory MUST use relative paths — e.g. `import { Icon } from "./Icon"`.
- Imports from a different component directory MUST use absolute paths starting with `@/components/` — e.g. `import { Button } from "@/components/Button"`.
- MUST NOT use relative paths (`../`) to reach outside the component directory.

## Component contract

- Component props live in a separate `types.ts` file, for example `Button.types.ts` and MUST be imported into the source file as a type. The source file should only contain the component implementation and export.
- Every component props type MUST extend `BaseComponentProps` (defined in `frontend/src/components/types.ts`).
- Boolean props MUST follow `is*` / `has*` naming — e.g. `isDisabled`, `hasError`.

### BaseComponentProps

`BaseComponentProps` is defined in `frontend/src/components/types.ts`. Every component props type MUST extend it.

```ts
export type BaseComponentProps = {
  /** id applied to the outermost element of the component */
  id?: string;
  /** className applied to the outermost element for styling overrides */
  className?: string;
  /** data-testid applied to the outermost element for e2e targeting */
  dataTestId?: string;
};
```

## Accessibility

- Every component MUST meet WCAG 2.2 AA requirements by default. WCAG 2.2 AAA guideline recommendations SHOULD be followed where possible without adding significant complexity or maintenance burden (for example making hit targets 44x44px where possible).
- MUST follow WAI-ARIA Authoring Practices for any interactive components that require ARIA roles, states, or properties.
- MUST NOT add role="alert" or any other live region role to a component without a very specific reason and explicit design approval.
- MUST NOT add placeholder text to form fields without a very specific reason and explicit design approval.
- ARIA label content MUST NOT repeat the element's implicit role name. Screen readers announce the role automatically, so including it in the label causes redundant announcements. For example, a `<nav>` element is announced as "navigation" — labelling it `aria-label="Footer navigation"` produces "Footer navigation, navigation". The label should be `aria-label="Footer"` instead. Common elements where this applies: `<nav>` (navigation), `<footer>` (contentinfo), `<header>` (banner), `<main>` (main), `<aside>` (complementary), `<form>` (form), `<search>` (search), `<button>` (button), `<a href>` (link). When writing `aria-label` or `aria-labelledby` text, describe **what** the landmark or control is for, not **what type** of element it is.
- If `id` is required for internal ARIA wiring, it MUST be a mandatory prop. Internal ids MUST be derived from it using the id generation pattern below.
- Components with focusable elements MUST use `forwardRef`.
- Native semantic HTML elements MUST be used whenever available. MUST NOT use a generic element with a role attribute when a native element exists — e.g. use `<button type="button">` not `<div role="button">`.
- `aria-label` MUST NOT be used when a visible label or `aria-labelledby` is available.
- Iconography and decorative imagery MUST have `aria-hidden="true"`.
- Images and SVGs MUST NOT be assumed to be decorative unless 100% certain. If unsure, raise it for manual review rather than guessing.
- Components MUST respect `prefers-reduced-motion` in any animation or transition styling.
- If the component implements a form control, input, select, textarea, etc., an onChange event handler must be called when the value changes, and the new value must be passed as an argument to the handler. This ensures that the component can be used in controlled forms and that changes to the input value are properly communicated to parent components or form libraries.
- Interactive button, link, toggle and similar components must an onClick event handler prop that is called when the component is activated by mouse, touch, keyboard, or assistive technology. This ensures that the component can be used in interactive contexts and that user interactions are properly handled.
- Composite components, such as Tabs, Accordions, Dropdowns, etc., that manage their own internal state and user interactions must provide a clear and consistent API for controlling the component from the outside. This typically includes props for controlling the open/closed state, selected tab, or other relevant state, as well as event handlers for when these states change. This ensures that the component can be used in a variety of contexts and that its behavior can be controlled by parent components or external logic.
<!-- TBA -Every component must be tested in isolation and on the page level to make sure they are usable, accessible and interact with each other as expected regardless the user's access needs and input methods  -->

### Internal id generation pattern

When `id` is needed internally to wire ARIA attributes, derive all child ids from it:

```ts
const inputId = `${id}__input`;
const hintId  = `${id}__hint`;

return (
  <>
    <label htmlFor={inputId}>Favourite fruit</label>
    <span id={hintId}>For example, banana</span>
    <input id={inputId} aria-describedby={hintId} type="text" />
  </>
);
```

### Non-obtrusive accessibility improvements

When the component is built based on a visual design or an existing web page that has accessibility issues, it is acceptable to make non-obtrusive improvements to the accessibility of the component as long as they do not significantly deviate from the intended design or add significant complexity. Examples of non-obtrusive improvements include:

- Form fields are missing label fields. The fix is to add a visible label and associate it with the form control using a <label> element and `htmlFor` attribute. This ensures the best accessibility and usability for all users.
- Missing or invisible table column headers or table captions. The fix is to add appropriate table headers using `<th>` elements and/or a caption using the `<caption>` element. This ensures that screen reader users can understand the structure and content of the table.
- Main page sections are missing visible headings. The fix is to add appropriate heading levels (e.g. `<h2>`, `<h3>`) for each section and reference them with `aria-labelledby` on the section landmark if needed. This ensures that screen reader users can navigate the page structure effectively.

When making non-obtrusive accessibility improvements, it is important to:

- Make sure to add `sr-only` styles to any new visually hidden elements added for accessibility purposes, so they do not affect the visual layout or design. MUST make developer is aware when these improvements are added by documenting them in the component's documentation comment.
- Ensure that the visual design is still closely followed and that the improvements do not significantly alter the intended look and feel of the component.
- Avoid adding complex interactions or behaviors that were not part of the original design, as this can increase maintenance burden and potentially introduce new accessibility issues.
- Always raise any proposed accessibility improvements for manual review rather than making assumptions about what is acceptable. The goal is to improve accessibility while still respecting the design and keeping the implementation maintainable.
<!-- FUTURE IMPROVEMENT IDEA - KEEP SCORE OF REPEAT PATTERNS OF ACCESSIBILITY IMPROVEMENTS, SO ADJUSTMENTS CAN BE MADE TO THE DESIGN PROCESS -->

## Styling

- Components MUST use CSS Modules. The `.module.css` file MUST be co-located in the component directory.
- Design tokens MUST be used for all visual properties (colour, spacing, typography, radius) rather than hardcoded values, so the system is consistent and maintainable.
