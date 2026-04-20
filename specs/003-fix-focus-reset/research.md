# Research: Fix Focus Reset

## Focus Target After Route Change

**Decision**: Call `document.body.focus()` in a `useEffect` triggered by `usePathname()` changes to reset keyboard focus to the top of the page after every client-side route change.

**Rationale**: The `<body>` element is the natural starting point for sequential keyboard navigation. Focusing it means the next Tab press will land on the first focusable element in the DOM (the skip link), exactly matching the experience of a full-page load. This approach requires no extra markup, no additional `tabIndex` attributes on page-specific elements, and no changes to individual route files.

**Alternatives considered**:

- Focus `<main id="main-content">`: Would skip the header and skip-link on the new page, disorienting users who want to access navigation after a route change. Also couples the focus logic to a specific element ID.
- Focus an `<h1>` on each page: Requires every route to expose a ref or consistent heading structure. Adds coupling between the focus handler and each page component.
- Use a visually hidden sentinel `<div>` at the top of the layout: Adds non-semantic markup and can confuse screen readers if the element has no meaningful label.

## Interaction With Next.js Router Announcer

**Decision**: The focus reset to `<body>` does not interfere with the Next.js Router Announcer. No changes to the announcer are needed.

**Rationale**: The Router Announcer is a hidden `<div aria-live="assertive">` that Next.js injects at the end of the DOM. It announces the new page title (`document.title`) after each route change. Because `aria-live` regions announce content changes independently of focus, moving focus to `<body>` does not suppress or delay the announcement. The user's constraint — that screen reader users still hear the page title announced — is preserved by default.

**Alternatives considered**:

- Use `role="alert"` on a custom element: Unnecessary because the built-in Router Announcer already handles this.
- Delay the focus call to avoid racing with the announcer: Unnecessary because `aria-live` is focus-independent.

## Implementation Pattern

**Decision**: Create a single `'use client'` component (`RouteChangeHandler`) that subscribes to `usePathname()` and calls `document.body.focus()` in a `useEffect`. Mount it once in the root `layout.tsx`.

**Rationale**: This is the minimal-complexity pattern for Next.js App Router. It requires one new file, one line added to the layout, and zero changes to any route page. The `usePathname()` hook fires on every client-side navigation, and the effect runs after React has committed the new DOM — ensuring the focus call targets the correct page state.

**Alternatives considered**:

- Monkey-patching the Next.js router: Fragile, version-dependent, and violates the minimal-complexity constitution principle.
- Using `onRouteChange` events from `next/router` (Pages Router API): Not available in App Router.
- Adding focus logic to each page component: Violates DRY and risks inconsistency across routes.

## Test Strategy

**Decision**: Add a dedicated Playwright E2E spec (`keyboard-focus.spec.ts`) that covers focus reset across route transitions for all primary navigation paths.

**Rationale**: Focus management is a browser-level concern that cannot be meaningfully tested with unit tests or component tests. Playwright can programmatically Tab and check `document.activeElement`, giving high-confidence verification of the exact user scenario described in the bug report.

**Alternatives considered**:

- Vitest with jsdom: `jsdom` does not implement real focus semantics; `.focus()` calls don't move `document.activeElement` reliably.
- Manual-only testing: Insufficient for regression prevention.
