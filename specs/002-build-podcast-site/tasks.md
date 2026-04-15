# Tasks: Modern Podcast Website

**Input**: Design documents from `/specs/002-build-podcast-site/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No dedicated test-writing tasks are included because the feature spec did not request a TDD workflow. Verification is still required through build, accessibility, and route validation during implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Next.js static site workspace and baseline tooling.

- [x] T001 Initialize npm scripts and Next.js dependencies in package.json
- [x] T002 Configure Next.js static export behavior in next.config.ts
- [x] T003 Create the TypeScript compiler baseline in tsconfig.json
- [x] T004 [P] Configure Playwright and Vitest tooling in playwright.config.ts and vitest.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared content, layout, and rendering infrastructure required by all user stories.

**⚠️ CRITICAL**: No user story work should start before this phase is complete.

- [x] T005 Create the site-wide content schema and validation helpers in src/lib/content/schema.ts
- [x] T006 [P] Author podcast metadata and featured episode configuration in src/content/site/site.ts
- [x] T007 [P] Seed the 20 mocked episode records in src/content/episodes/index.ts
- [x] T008 [P] Author About and FAQ page source content in src/content/pages/index.ts
- [x] T009 Implement content loading and route-safe lookup utilities in src/lib/content/index.ts
- [x] T010 [P] Build the persistent site header and primary navigation in src/components/layout/site-header.tsx
- [x] T011 [P] Build the shared site footer and supporting layout chrome in src/components/layout/site-footer.tsx
- [x] T012 Implement shared metadata helpers for public routes in src/lib/seo/metadata.ts
- [x] T013 Implement shared global accessibility and responsive styles in src/styles/globals.css

**Checkpoint**: Foundation ready. User story implementation can begin.

---

## Phase 3: User Story 1 - Discover The Show (Priority: P1) 🎯 MVP

**Goal**: Deliver a striking landing page that introduces the podcast and highlights a single featured episode.

**Independent Test**: Open the homepage and confirm the visitor can identify the podcast brand, the featured episode, and primary navigation, then reach the featured episode detail page from the call to action.

### Implementation for User Story 1

- [x] T014 [P] [US1] Build the featured episode hero component in src/components/episode/featured-episode-hero.tsx
- [x] T015 [P] [US1] Build the landing page supporting sections in src/components/layout/home-sections.tsx
- [x] T016 [US1] Implement the homepage route and static metadata in src/app/page.tsx
- [x] T017 [US1] Implement the landing page visual design and responsive layout in src/app/page.module.css

**Checkpoint**: User Story 1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Browse The Episode Library (Priority: P2)

**Goal**: Deliver a browsable 20-episode catalog with static episode detail pages and graceful missing-route handling.

**Independent Test**: Open the episodes page, verify all 20 mocked episodes are reachable, open multiple episode detail pages, and confirm an invalid episode slug resolves to the not-found experience.

### Implementation for User Story 2

- [x] T018 [P] [US2] Build reusable episode card and list primitives in src/components/episode/episode-card.tsx
- [x] T019 [P] [US2] Build the episode detail content component in src/components/episode/episode-detail.tsx
- [x] T020 [US2] Implement the episodes index route in src/app/episodes/page.tsx
- [x] T021 [US2] Implement the episodes index responsive layout in src/app/episodes/page.module.css
- [x] T022 [US2] Implement static episode route generation and detail rendering in src/app/episodes/[slug]/page.tsx
- [x] T023 [US2] Implement the episode detail responsive layout in src/app/episodes/[slug]/page.module.css
- [x] T024 [US2] Implement the invalid-slug recovery experience in src/app/not-found.tsx

**Checkpoint**: User Stories 1 and 2 work independently, and the full episode library is navigable.

---

## Phase 5: User Story 3 - Understand The Podcast (Priority: P3)

**Goal**: Deliver dedicated About and FAQ pages with accessible informational content and clear navigation continuity.

**Independent Test**: Visit the About and FAQ pages directly, confirm the mocked content renders fully, and verify both pages remain reachable from the main navigation.

### Implementation for User Story 3

- [x] T025 [P] [US3] Build the About page narrative content component in src/components/layout/about-content.tsx
- [x] T026 [P] [US3] Build the accessible FAQ item component in src/components/faq/faq-item.tsx
- [x] T027 [US3] Implement the About page route in src/app/about/page.tsx
- [x] T028 [US3] Implement the About page responsive layout in src/app/about/page.module.css
- [x] T029 [US3] Implement the FAQ page route and disclosure behavior in src/app/faq/page.tsx
- [x] T030 [US3] Implement the FAQ page responsive layout in src/app/faq/page.module.css

**Checkpoint**: All user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements that improve multiple stories together.

- [x] T031 [P] Refine shared social, canonical, and route metadata behavior in src/lib/seo/metadata.ts
- [x] T032 [P] Add fallback and production-ready static imagery in public/images/fallback-cover.svg
- [x] T033 Improve route-level focus, skip-link, and reduced-motion behavior in src/styles/globals.css
- [x] T034 Validate the documented setup and build flow in specs/002-build-podcast-site/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can begin immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational completion.
- **User Story 2 (Phase 4)**: Depends on Foundational completion; can proceed after or in parallel with User Story 1 once foundation is done.
- **User Story 3 (Phase 5)**: Depends on Foundational completion; can proceed after or in parallel with User Stories 1 and 2 once foundation is done.
- **Polish (Phase 6)**: Depends on the desired user stories being complete.

### User Story Dependencies

- **US1**: No dependency on other user stories after Foundational.
- **US2**: No dependency on other user stories after Foundational.
- **US3**: No dependency on other user stories after Foundational.

### Within Each User Story

- Shared components before route files.
- Route files before route-specific styling refinements.
- Story completion before polish work that spans multiple stories.

### Parallel Opportunities

- Setup task T004 can run alongside T002-T003 after project initialization begins.
- Foundational tasks T006-T008 and T010-T011 can run in parallel because they touch separate files.
- In US1, T014 and T015 can run in parallel before T016.
- In US2, T018 and T019 can run in parallel before the route implementation tasks.
- In US3, T025 and T026 can run in parallel before the page route tasks.
- Polish tasks T031-T033 can run in parallel because they target separate shared files and assets.

---

## Parallel Example: User Story 1

```bash
Task: "Build the featured episode hero component in src/components/episode/featured-episode-hero.tsx"
Task: "Build the landing page supporting sections in src/components/layout/home-sections.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "Build reusable episode card and list primitives in src/components/episode/episode-card.tsx"
Task: "Build the episode detail content component in src/components/episode/episode-detail.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "Build the About page narrative content component in src/components/layout/about-content.tsx"
Task: "Build the accessible FAQ item component in src/components/faq/faq-item.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup.
2. Complete Foundational work.
3. Complete User Story 1.
4. Validate the landing page independently as the MVP.

### Incremental Delivery

1. Finish Setup and Foundational work once.
2. Deliver User Story 1 as the first shippable increment.
3. Add User Story 2 for the complete episode library experience.
4. Add User Story 3 for supporting informational pages.
5. Finish with Polish to tighten metadata, assets, and accessibility refinements.

### Parallel Team Strategy

1. One developer completes Setup and Foundational tasks.
2. After the foundation is stable:
   - Developer A implements User Story 1.
   - Developer B implements User Story 2.
   - Developer C implements User Story 3.
3. Rejoin for Phase 6 polish and final validation.

---

## Notes

- Every task follows the required checklist format: checkbox, task ID, optional `[P]`, optional story label, and exact file path.
- User stories remain independently testable because they share only the foundational content and layout infrastructure.
- Avoid introducing server runtime behavior, remote content dependencies, or additional backend services during implementation.
