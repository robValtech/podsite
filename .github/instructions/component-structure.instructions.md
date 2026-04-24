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

## Styling

- Components MUST use CSS Modules. The `.module.css` file MUST be co-located in the component directory.
- Design tokens MUST be used for all visual properties (colour, spacing, typography, radius) rather than hardcoded values, so the system is consistent and maintainable.

## Internal id generation pattern

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

## BaseComponentProps

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
