# Podsite Constitution

## Core Principles

### I. Static-First Delivery

The application MUST ship as a static web app composed of deployable HTML, CSS, JavaScript, and static assets. Features MUST not require a dedicated application server or server-side rendering unless the constitution is amended.

### II. Accessible By Default

All user-facing pages MUST use semantic HTML, preserve keyboard navigation, and maintain sufficient text contrast. New UI work MUST include accessible names for interactive controls and meaningful document structure.

### III. Responsive Core Experience

The primary user journey MUST work on current desktop and mobile viewport sizes. Content, navigation, and calls to action MUST remain usable without horizontal scrolling at common mobile widths.

### IV. Minimal Client-Side Complexity

Client-side JavaScript MUST be used only when it provides clear user value. Prefer HTML and CSS for layout, content, and interaction; add dependencies only when they reduce overall complexity.

### V. Content And Link Integrity

Every change that adds or edits pages MUST leave the site free of broken internal links, missing asset references, and obvious placeholder content in shipped pages.

## Technical Constraints

The codebase SHOULD remain simple enough to build and host as static files on commodity hosting. Preferred defaults are plain HTML, CSS, and JavaScript, or a static-site workflow that outputs static assets. Secrets, server-only logic, and stateful backend dependencies are out of scope unless explicitly added through an amendment.

## Delivery Workflow

Each feature spec MUST define the affected user journey, the pages or components involved, and the acceptance criteria for desktop and mobile behavior. Before completion, changes MUST be reviewed for accessibility, responsive layout, and link correctness through available automated checks or manual verification.

## Governance

This constitution overrides conflicting local practices for product and implementation decisions. Any exception MUST be documented in the relevant plan with a reason and a simpler alternative considered. Amendments require updating this file and using the new rules for all future plans and tasks.

**Version**: 1.0.0 | **Ratified**: 2026-04-15 | **Last Amended**: 2026-04-15
