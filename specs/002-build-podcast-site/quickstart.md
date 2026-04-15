# Quickstart: Modern Podcast Website

## Prerequisites

- Node.js 20 LTS
- npm

## Setup

1. Install dependencies.
2. Start the Next.js development server.
3. Confirm static pages render using only local content.

Expected commands:

```bash
npm install
npm run dev
```

## Content Workflow

1. Add or edit podcast metadata in the site content area.
2. Add or edit the 20 mocked episodes in the episode content collection.
3. Add or edit About and FAQ content in the static page content area.
4. Confirm the featured episode slug matches one episode entry.

## Verification Workflow

Run the expected quality checks before considering the feature complete.

```bash
npm run test
npm run test:e2e
npm run build
```

Verification expectations:

- The build produces static output only.
- All 20 episode routes are generated.
- Primary routes pass route-level accessibility checks.
- Mobile and desktop layouts remain usable without horizontal scrolling.

## Static Output Check

After the production build, verify that exported files exist for:

- Home
- Episodes index
- 20 episode detail pages
- About
- FAQ
- Not-found fallback

No database, API route, or external feed is required for local development or production build validation.
