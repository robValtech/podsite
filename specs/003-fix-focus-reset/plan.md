# Implementation Plan: Fix Focus Reset

**Branch**: `003-fix-focus-reset` | **Date**: 2026-04-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/003-fix-focus-reset/spec.md`

## Summary

Keyboard focus remains near the previous page location after Next.js client-side route changes, disorienting keyboard-only and screen reader users. The fix resets focus to the `<body>` element after each route change so that the next Tab proceeds from the top of the page. The existing Next.js Router Announcer already announces the updated page title to screen readers and must not be disrupted.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS  
**Primary Dependencies**: Next.js 14 (App Router), React 18  
**Storage**: N/A  
**Testing**: Playwright + @axe-core/playwright (E2E, accessibility), Vitest (unit)  
**Target Platform**: Static web (output: 'export')  
**Project Type**: Static web application (Next.js)  
**Performance Goals**: N/A (no runtime performance impact beyond a single `.focus()` call)  
**Constraints**: Must not interfere with Next.js Router Announcer screen reader announcements; must work in static export mode  
**Scale/Scope**: 6 primary routes (/, /episodes, /episodes/[slug], /about, /faq, not-found)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                          | Status | Notes                                                                                   |
| ---------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| I. Static-First Delivery           | PASS   | No server dependency; focus management is client-side JS within the existing static app |
| II. Accessible By Default          | PASS   | This feature directly improves keyboard and assistive technology navigation             |
| III. Responsive Core Experience    | PASS   | Focus management has no viewport dependency                                             |
| IV. Minimal Client-Side Complexity | PASS   | Single client component with one `useEffect` + `usePathname`; no new dependencies       |
| V. Content And Link Integrity      | PASS   | No pages, links, or content are added or removed                                        |

## Project Structure

### Documentation (this feature)

```text
specs/003-fix-focus-reset/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal — no data entities)
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/
│   │   └── layout.tsx              # Root layout — mounts RouteChangeHandler
│   ├── components/
│   │   └── route-change-handler.tsx  # NEW — 'use client' component for focus reset
│   └── styles/
│       └── globals.css             # Existing — already has :focus-visible styles
└── tests/
    └── (no new test files — E2E coverage added via existing Playwright specs)

tests/
└── e2e/
    └── keyboard-focus.spec.ts      # NEW — E2E keyboard focus tests
```

**Structure Decision**: Follows the existing `frontend/src/` + `tests/e2e/` layout established by feature 002. One new client component and one new E2E test file.
