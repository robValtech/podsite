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

- Every component props type MUST extend `BaseComponentProps` (defined in `frontend/src/components/types.ts`).
- Components with focusable elements MUST use `forwardRef`.
- Boolean props MUST follow `is*` / `has*` naming — e.g. `isDisabled`, `hasError`.
- Native semantic HTML elements MUST be used whenever available. MUST NOT use a generic element with a role attribute when a native element exists — e.g. use `<button type="button">` not `<div role="button">`.
- `aria-label` MUST NOT be used when a visible label or `aria-labelledby` is available.
- Iconography and decorative imagery MUST have `aria-hidden="true"`.
- Images and SVGs MUST NOT be assumed to be decorative unless 100% certain. If unsure, raise it for manual review rather than guessing.
- Components MUST respect `prefers-reduced-motion` in any animation or transition styling.
- If `id` is required for internal ARIA wiring, it MUST be a mandatory prop. Internal ids MUST be derived from it using the id generation pattern below.
- Component props live in a separate `Button.types.ts` file and MUST be imported into the source file as a type. The source file should only contain the component implementation and export.
- If the component implements a form control, input, select, textarea, etc., an onChange event handler must be called when the value changes, and the new value must be passed as an argument to the handler. This ensures that the component can be used in controlled forms and that changes to the input value are properly communicated to parent components or form libraries.
- Interactive button, link, toggle and similar components must an onClick event handler prop that is called when the component is activated by mouse, touch, keyboard, or assistive technology. This ensures that the component can be used in interactive contexts and that user interactions are properly handled.
- Composite components, such as Tabs, Accordions, Dropdowns, etc., that manage their own internal state and user interactions must provide a clear and consistent API for controlling the component from the outside. This typically includes props for controlling the open/closed state, selected tab, or other relevant state, as well as event handlers for when these states change. This ensures that the component can be used in a variety of contexts and that its behavior can be controlled by parent components or external logic.

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

- MUST NOT add role="alert" or any other live region role to a component without a very specific reason and explicit design approval.
- MUST NOT add placeholder text to form fields without a very specific reason and explicit design approval.
<!-- - If a component has a required accessibility role, state it explicitly in the documentation comment for the component and enforce it with a test. For example, if a component is meant to be used as a landmark region, it should have `role="region"` and the test should assert that this role is present. -->

## Styling

- Components MUST use CSS Modules. The `.module.css` file MUST be co-located in the component directory.
- Design tokens MUST be used for all visual properties (colour, spacing, typography, radius) rather than hardcoded values, so the system is consistent and maintainable.
