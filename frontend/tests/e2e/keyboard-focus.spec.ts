import { test, expect } from "@playwright/test";

// US1 — T003: Footer link navigation resets focus
test("focus resets to top of page after navigating via footer link", async ({
  page,
}) => {
  await page.goto("/");

  // Tab to the footer Episodes link and activate it
  const footerEpisodesLink = page.locator(
    'footer[role="contentinfo"] a[href="/episodes/"]',
  );
  await footerEpisodesLink.focus();
  await footerEpisodesLink.press("Enter");

  await page.waitForURL("**/episodes/");

  // After route change, focus should be on the focus-reset target
  const activeId = await page.evaluate(() => document.activeElement?.id);
  expect(activeId).toBe("focus-reset-target");
});

// US1 — T004: Header link navigation resets focus
test("focus resets to top of page after navigating via header link", async ({
  page,
}) => {
  await page.goto("/");

  const headerAboutLink = page.locator(
    'header[role="banner"] a[href="/about/"]',
  );
  await headerAboutLink.focus();
  await headerAboutLink.press("Enter");

  await page.waitForURL("**/about/");

  const activeId = await page.evaluate(() => document.activeElement?.id);
  expect(activeId).toBe("focus-reset-target");
});

// US2 — T005: Focus resets on Home → Episodes → Episode Detail transitions
test("focus resets across Home → Episodes → Episode Detail", async ({
  page,
}) => {
  await page.goto("/");

  // Home → Episodes
  const episodesLink = page.locator(
    'header[role="banner"] a[href="/episodes/"]',
  );
  await episodesLink.focus();
  await episodesLink.press("Enter");
  await page.waitForURL("**/episodes/");

  let activeId = await page.evaluate(() => document.activeElement?.id);
  expect(activeId).toBe("focus-reset-target");

  // Episodes → Episode Detail (use title link, not the 'Listen →' link)
  const firstEpisodeLink = page.getByRole("link", {
    name: "Episode 1: The Attention Economy's Hidden Tax",
    exact: true,
  });
  await firstEpisodeLink.focus();
  await firstEpisodeLink.press("Enter");
  await page.waitForURL("**/episodes/attention-economy-hidden-tax/");

  activeId = await page.evaluate(() => document.activeElement?.id);
  expect(activeId).toBe("focus-reset-target");
});

// US2 — T006: Focus resets on About → FAQ → Home transitions
test("focus resets across About → FAQ → Home", async ({ page }) => {
  await page.goto("/about/");

  // About → FAQ
  const faqLink = page.locator('header[role="banner"] a[href="/faq/"]');
  await faqLink.focus();
  await faqLink.press("Enter");
  await page.waitForURL("**/faq/");

  let activeId = await page.evaluate(() => document.activeElement?.id);
  expect(activeId).toBe("focus-reset-target");

  // FAQ → Home (use nav 'Home' link, not the logo which also links to /)
  const homeLink = page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Home" });
  await homeLink.focus();
  await homeLink.press("Enter");
  await page.waitForURL((url) => new URL(url).pathname === "/");

  activeId = await page.evaluate(() => document.activeElement?.id);
  expect(activeId).toBe("focus-reset-target");
});

// US2 — T007: Focus resets when navigating to not-found route
test("focus resets on not-found route", async ({ page }) => {
  await page.goto("/");

  // Navigate to a non-existent page
  await page.goto("/episodes/this-episode-does-not-exist/");

  // Focus should still be on body (or reset on initial load)
  const activeTag = await page.evaluate(() =>
    document.activeElement?.tagName.toLowerCase(),
  );
  expect(activeTag).toBe("body");
});

// US3 — T008: Router Announcer contains updated page title after route change
test("Next.js Router Announcer announces page title after route change", async ({
  page,
}) => {
  await page.goto("/");

  // Navigate to Episodes
  const episodesLink = page.locator(
    'header[role="banner"] a[href="/episodes/"]',
  );
  await episodesLink.focus();
  await episodesLink.press("Enter");
  await page.waitForURL("**/episodes/");

  // Next.js 14 App Router renders the announcer as <p id="__next-route-announcer__" aria-live="assertive">
  const announcer = page.locator("#__next-route-announcer__");
  await expect(announcer).toBeAttached({ timeout: 5000 });

  const announcerText = await announcer.textContent();
  expect(announcerText).toBeTruthy();
  expect(announcerText!.length).toBeGreaterThan(0);
});
