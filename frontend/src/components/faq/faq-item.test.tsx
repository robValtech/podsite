import { describe, it, expect } from "vitest";
import { render, screen, userEvent } from "@/test/render";
import { checkA11y } from "@/test/a11y";
import { FAQItem } from "./faq-item";

const entry = {
  id: "q1",
  question: "What is this podcast about?",
  answer: "It is about great things.",
};

describe("FAQItem", () => {
  it("renders collapsed by default with correct ARIA attributes", async () => {
    const { container } = render(<FAQItem entry={entry} />);

    const button = screen.getByRole("button", {
      name: /what is this podcast about/i,
    });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "faq-answer-q1");

    // The region has `hidden` so it's excluded from the a11y tree;
    // query with { hidden: true } to reach it and assert it's not visible.
    const region = screen.getByRole("region", { hidden: true });
    expect(region).not.toBeVisible();

    await checkA11y(container); // axe check: collapsed state
  });

  it("expands when the button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<FAQItem entry={entry} />);

    const button = screen.getByRole("button", {
      name: /what is this podcast about/i,
    });
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region")).toBeVisible();
    expect(screen.getByText(/it is about great things/i)).toBeVisible();

    await checkA11y(container); // axe check: expanded state
  });

  it("collapses again when the button is clicked a second time", async () => {
    const user = userEvent.setup();
    render(<FAQItem entry={entry} />);

    const button = screen.getByRole("button", {
      name: /what is this podcast about/i,
    });
    await user.click(button);
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("region", { hidden: true })).not.toBeVisible();
  });
});
