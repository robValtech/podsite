# Tasks: Fix Focus Reset

**Input**: Design documents from `specs/003-fix-focus-reset/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: E2E tests included — the spec explicitly requires keyboard-focus verification across all primary routes.

**Organization**: Tasks are grouped by user story. This is a small bug-fix feature, so the setup and foundational phases are minimal.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: No new project setup needed — the frontend project already exists from feature 002.

_No tasks in this phase._

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the `RouteChangeHandler` client component and mount it in the root layout. This must be complete before any user-story-level testing can proceed.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T001 Create RouteChangeHandler client component in frontend/src/components/route-change-handler.tsx
- [x] T002 Mount RouteChangeHandler in root layout in frontend/src/app/layout.tsx

**Checkpoint**: Focus is now reset to `document.body` after every client-side route change. Manual verification possible via the quickstart steps.

---

## Phase 3: User Story 1 — Recover Focus After Navigation (Priority: P1) 🎯 MVP

**Goal**: After activating any internal link with the keyboard, focus moves to the top of the destination page so the next Tab proceeds from the beginning.

**Independent Test**: Activate a footer link with Enter, press Tab, and confirm focus lands near the top of the new page instead of the next footer link.

### E2E Tests for User Story 1

- [x] T003 [US1] Write E2E test: footer link navigation resets focus — in tests/e2e/keyboard-focus.spec.ts
- [x] T004 [US1] Write E2E test: header link navigation resets focus — in tests/e2e/keyboard-focus.spec.ts

**Checkpoint**: US1 acceptance scenarios verified — keyboard focus resets from both header and footer navigation links.

---

## Phase 4: User Story 2 — Preserve Orientation Across Primary Routes (Priority: P2)

**Goal**: Focus-reset behavior is consistent across all 6 primary routes (Home, Episodes, Episode Detail, About, FAQ, not-found).

**Independent Test**: Navigate between every primary route with the keyboard and verify focus lands consistently at the top after each transition.

### E2E Tests for User Story 2

- [x] T005 [US2] Write E2E test: focus resets on Home → Episodes → Episode Detail route transitions — in tests/e2e/keyboard-focus.spec.ts
- [x] T006 [US2] Write E2E test: focus resets on About → FAQ → Home route transitions — in tests/e2e/keyboard-focus.spec.ts
- [x] T007 [US2] Write E2E test: focus resets when navigating to not-found route — in tests/e2e/keyboard-focus.spec.ts

**Checkpoint**: All primary routes verified for consistent focus-reset behavior.

---

## Phase 5: User Story 3 — Maintain Assistive Technology Clarity (Priority: P3)

**Goal**: The Next.js Router Announcer continues to announce the page title after route changes. Focus reset does not suppress or interfere with the announcement.

**Independent Test**: Navigate between routes and confirm the Router Announcer `aria-live` region contains the updated page title after each transition.

### E2E Tests for User Story 3

- [x] T008 [US3] Write E2E test: Router Announcer contains updated page title after route change — in tests/e2e/keyboard-focus.spec.ts

**Checkpoint**: Screen reader announcement confirmed intact alongside focus reset.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Build verification and quickstart validation.

- [x] T009 Run static export build (`npm run build`) and confirm zero errors in frontend/
- [x] T010 Run quickstart.md validation — verify manual keyboard-focus verification steps from specs/003-fix-focus-reset/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Skipped — project already exists
- **Foundational (Phase 2)**: No setup dependencies — can start immediately. BLOCKS all user stories.
- **User Stories (Phases 3–5)**: All depend on Phase 2 completion (T001 + T002)
  - US1 (Phase 3) can proceed independently
  - US2 (Phase 4) can proceed independently after Phase 2
  - US3 (Phase 5) can proceed independently after Phase 2
- **Polish (Phase 6)**: Depends on all user story phases being complete

### Within Each User Story

- All E2E tests for a story can be written in a single file (`keyboard-focus.spec.ts`)
- Tests should fail before T001/T002 are implemented, and pass after

### Parallel Opportunities

- T001 and T002 are sequential (T002 imports the component created in T001)
- T003–T008 are all in the same test file but test independent scenarios — they can be written together
- T009 and T010 are sequential (build first, then validate)

---

## Implementation Strategy

### MVP Scope

Complete Phase 2 (T001–T002) for a working fix. Phase 3 (T003–T004) adds regression-preventing E2E coverage.

### Incremental Delivery

1. **T001–T002**: Bug is fixed — keyboard focus resets after route changes
2. **T003–T004**: Core acceptance scenarios have automated E2E coverage
3. **T005–T007**: All primary routes have automated E2E coverage
4. **T008**: Router Announcer non-interference confirmed
5. **T009–T010**: Build and quickstart validated
