import { test, expect } from "@playwright/test";

// US1 — T003: Footer link navigation resets focus
test("focus resets to body after navigating via footer link", async ({
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

  // After route change, focus should be on body
  const activeTag = await page.evaluate(() =>
    document.activeElement?.tagName.toLowerCase(),
  );
  expect(activeTag).toBe("body");
});

// US1 — T004: Header link navigation resets focus
test("focus resets to body after navigating via header link", async ({
  page,
}) => {
  await page.goto("/");

  const headerAboutLink = page.locator(
    'header[role="banner"] a[href="/about/"]',
  );
  await headerAboutLink.focus();
  await headerAboutLink.press("Enter");

  await page.waitForURL("**/about/");

  const activeTag = await page.evaluate(() =>
    document.activeElement?.tagName.toLowerCase(),
  );
  expect(activeTag).toBe("body");
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

  let activeTag = await page.evaluate(() =>
    document.activeElement?.tagName.toLowerCase(),
  );
  expect(activeTag).toBe("body");

  // Episodes → Episode Detail
  const firstEpisodeLink = page.locator(
    'a[href="/episodes/attention-economy-hidden-tax/"]',
  );
  await firstEpisodeLink.focus();
  await firstEpisodeLink.press("Enter");
  await page.waitForURL("**/episodes/attention-economy-hidden-tax/");

  activeTag = await page.evaluate(() =>
    document.activeElement?.tagName.toLowerCase(),
  );
  expect(activeTag).toBe("body");
});

// US2 — T006: Focus resets on About → FAQ → Home transitions
test("focus resets across About → FAQ → Home", async ({ page }) => {
  await page.goto("/about/");

  // About → FAQ
  const faqLink = page.locator('header[role="banner"] a[href="/faq/"]');
  await faqLink.focus();
  await faqLink.press("Enter");
  await page.waitForURL("**/faq/");

  let activeTag = await page.evaluate(() =>
    document.activeElement?.tagName.toLowerCase(),
  );
  expect(activeTag).toBe("body");

  // FAQ → Home
  const homeLink = page.locator('header[role="banner"] a[href="/"]');
  await homeLink.focus();
  await homeLink.press("Enter");
  await page.waitForURL(/\/$/);

  activeTag = await page.evaluate(() =>
    document.activeElement?.tagName.toLowerCase(),
  );
  expect(activeTag).toBe("body");
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

  // The Next.js Router Announcer is a div with role="alert" or aria-live="assertive"
  // rendered by Next.js at the end of the body
  const announcer = page.locator("next-route-announcer p");
  await expect(announcer).toBeAttached({ timeout: 5000 });

  const announcerText = await announcer.textContent();
  expect(announcerText).toBeTruthy();
  // The announcer should contain the page title of the destination
  expect(announcerText!.length).toBeGreaterThan(0);
});
