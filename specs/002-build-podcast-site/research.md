# Research: Modern Podcast Website

## Static Rendering Strategy

**Decision**: Use Next.js App Router with static generation for all routes and static export for deployment.

**Rationale**: This matches the constitution's static-first rule, removes any server dependency, and keeps every public page prerendered for strong first-load performance, accessibility, and link integrity.

**Alternatives considered**:

- Pages Router SSG: viable, but App Router is the current default and better suited to shared layouts and route metadata.
- ISR: unnecessary because the site uses fixed mocked content with no live update source.
- SSR: rejected because it violates the static-first constraint and adds runtime complexity.

## Content Source Model

**Decision**: Store site content locally in repository-backed content files organized by type: episodes, static pages, and site metadata.

**Rationale**: Embedded local content satisfies the no-database and no-live-feed requirement, keeps the mock data auditable, and scales cleanly to 20 episodes plus About and FAQ content.

**Alternatives considered**:

- Remote CMS or podcast feed: rejected because the feature explicitly uses mocked local content.
- Single monolithic JSON file: workable, but harder to maintain and validate as episode content grows.

## Route Design

**Decision**: Publish static routes for `/`, `/episodes`, `/episodes/[slug]`, `/about`, and `/faq`, with a custom static not-found experience for invalid episode slugs.

**Rationale**: The route structure mirrors user expectations, supports all requested pages directly, and keeps episode detail pages grouped under the episode library for clearer navigation and information scent.

**Alternatives considered**:

- Flat episode URLs: less descriptive and weaker route hierarchy.
- Query-string-based episode routing: less semantic and less suitable for static export.

## Accessibility Verification

**Decision**: Treat accessibility as both a build-time and manual verification concern using semantic HTML, keyboard-only checks, screen-reader smoke testing, and automated axe coverage in browser tests.

**Rationale**: The requested accessibility bar explicitly covers visual and non-visual users and assistive technologies, so automated checks alone are insufficient. The planning must include manual checks for reading order, focus order, skip links, CTA clarity, FAQ interaction patterns, and responsive stacking behavior.

**Alternatives considered**:

- Automated accessibility tooling only: insufficient for verifying actual assistive-technology usability.
- Manual-only testing: too easy to regress and too hard to keep repeatable.

## Test Strategy

**Decision**: Use Playwright for route-level E2E and accessibility coverage, plus Vitest for content-schema validation and invariants such as slug uniqueness and the exact 20-episode catalog count.

**Rationale**: This site's main risks are broken static routes, missing generated content, layout regressions, and accessibility defects. Browser-level testing provides more value than heavy component unit testing for this type of static content application.

**Alternatives considered**:

- Cypress: viable but not preferred over Playwright for lightweight cross-browser static-site coverage.
- Unit-test-heavy strategy: lower value because it misses the exported route experience and browser semantics.

## Framework Version Selection

**Decision**: Pin the Next.js dependency to `^14.2.x` rather than upgrading to v15 or v16.

**Rationale**: Next.js 15 and 16 both introduced breaking changes that add complexity with no benefit for a fully static `output: 'export'` site:

- **Async params/searchParams**: Since v15, `params` and `searchParams` in dynamic route segments are `Promise<>` types that must be `await`-ed. Every `[slug]` page requires boilerplate that provides no value when the same data is available at static build time.
- **React 19 peer dependency**: v15 requires React 19; v16 requires React 19.2 (View Transitions, `useEffectEvent`, `<Activity/>`). None of these primitives are needed for this site, and the ecosystem compatibility surface is wider.
- **Cascading removals in v16**: `next lint` command removed, `experimental.ppr` removed, `middleware.ts` deprecated in favour of `proxy.ts`, and Turbopack promoted to the default bundler — all incurring migration cost without delivering value for a static content site.

Next.js 14.2.x is the proven stable baseline for App Router static export. The build was verified clean at `^14.2.0` with the chosen Playwright + Vitest test setup.

**Alternatives considered**:

- Next.js 15: introduces async params breaking change and React 19 peer requirement; rejected for same reasons as v16.
- Next.js 16 (released October 2025): adds Cache Components, `proxy.ts`, React 19.2, and further removals; none relevant to a static-only site.

## Performance Direction

**Decision**: Keep the site HTML-first with minimal client components, lightweight imagery, and content rendered directly from prerendered route data.

**Rationale**: With only 20 episodes and fixed content, performance gains come from avoiding unnecessary hydration, controlling images and typography, and keeping interactivity limited to features that provide clear user value.

**Alternatives considered**:

- Client-fetched content: rejected because it delays content and undermines static reliability.
- Infinite scroll or virtualization: unnecessary for 20 items and weaker for keyboard and assistive-technology navigation.
