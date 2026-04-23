import { axe } from "vitest-axe";
import { expect } from "vitest";

export async function checkA11y(container: HTMLElement): Promise<void> {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
