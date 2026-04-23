import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "vitest-axe/matchers";
import { afterEach, expect } from "vitest";

expect.extend({ toHaveNoViolations });

afterEach(() => {
  cleanup();
});
