# Quickstart: Fix Focus Reset

## Verify the fix

1. Start the dev server:

   ```bash
   cd frontend && npm run dev
   ```

2. Open http://localhost:3000 in a browser.

3. Press **Tab** repeatedly until you reach a navigation link in the footer (e.g. "Episodes").

4. Press **Enter** to activate the link and navigate to the new route.

5. Press **Tab** once — focus should land on the **skip link** or another element near the top of the page, not on the next footer link.

6. Repeat for several routes: Episodes → About, About → FAQ, FAQ → Home, Home → an episode detail page.

## Run E2E tests

```bash
cd frontend && npx playwright test tests/e2e/keyboard-focus.spec.ts
```

## Build verification

```bash
cd frontend && npm run build
```

The static export should complete without errors. The `RouteChangeHandler` component is a client component and is included in the client bundle automatically.
