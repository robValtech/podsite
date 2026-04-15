# Implementation Plan: Modern Podcast Website

**Branch**: `[002-build-podcast-site]` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-build-podcast-site/spec.md`

## Summary

Build a modern, visually distinctive podcast website in Next.js using static export only. The implementation will ship a fully prerendered landing page, episode library, 20 episode detail pages, About page, and FAQ page backed by embedded local content, with accessibility and responsive behavior treated as first-class acceptance gates.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS  
**Primary Dependencies**: Next.js App Router, React, Playwright, `@axe-core/playwright`, Vitest  
**Storage**: N/A; local embedded content files in the repository  
**Testing**: Playwright for route and accessibility flows, Vitest for content/schema validation  
**Target Platform**: Modern desktop and mobile browsers on static hosting  
**Project Type**: Static web application  
**Performance Goals**: Fast static-first rendering, minimal client JavaScript, and mobile-first usability with primary routes staying usable at 360px width  
**Constraints**: Static export only, no database, no server runtime, no live feed integration, semantic and assistive-technology-friendly markup, low-JavaScript interaction model  
**Scale/Scope**: 24 public routes in v1 (home, episodes index, 20 episode details, about, FAQ, plus not-found handling)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- PASS: Delivery remains fully static through Next.js static export with no server runtime or database dependency.
- PASS: Accessibility is planned as a release gate through semantic HTML, keyboard support, screen-reader validation, and automated axe coverage.
- PASS: Responsive behavior is explicitly included for primary templates at mobile and desktop widths.
- PASS: Client-side complexity stays constrained to justified interactive behavior only; core content renders server-first with static output.
- PASS: Link integrity and missing-content handling are included in route contracts and automated verification.

Post-design re-check: PASS. The selected structure, local content model, static route generation, and testing approach remain compliant with all five constitutional principles.

## Project Structure

### Documentation (this feature)

```text
specs/002-build-podcast-site/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── content-schema.md
│   └── routes.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── episodes/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   └── not-found.tsx
├── components/
│   ├── episode/
│   ├── faq/
│   ├── layout/
│   └── ui/
├── content/
│   ├── episodes/
│   ├── pages/
│   └── site/
├── lib/
│   ├── content/
│   ├── seo/
│   └── utils/
└── styles/

public/
└── images/

tests/
├── e2e/
├── accessibility/
└── unit/
```

**Structure Decision**: Use a single Next.js App Router project rooted in `src/` with local content separated from presentation. This keeps the implementation compatible with static export, makes 20 episode routes easy to prerender, and supports route-level accessibility and responsive verification without adding backend or service layers.
