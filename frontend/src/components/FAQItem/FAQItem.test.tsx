import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@/test/render";
import { checkA11y } from "@/test/a11y";
import { FAQItem } from "./FAQItem";

const entry = {
  id: "q1",
  question: "What is this podcast about?",
  answer: "It is about great things.",
};

describe("FAQItem", () => {
  describe("rendering", () => {
    it("renders with minimal required props", () => {
      render(<FAQItem id="faq-q1" entry={entry} />);

      const toggleButton = screen.getByRole("button", {
        name: /what is this podcast about/i,
      });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");

      // hidden region is excluded from a11y tree; query with { hidden: true }
      const answerRegion = screen.getByRole("region", { hidden: true });
      expect(answerRegion).not.toBeVisible();
    });

    it("renders with all props", () => {
      const handleToggle = vi.fn();
      render(
        <FAQItem
          id="faq-q1"
          className="custom-class"
          dataTestId="faq-item"
          entry={entry}
          isOpen
          onToggle={handleToggle}
        />,
      );

      const toggleButton = screen.getByRole("button", {
        name: /what is this podcast about/i,
      });
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("region")).toBeVisible();
      expect(screen.getByText(/it is about great things/i)).toBeVisible();
      expect(screen.getByTestId("faq-item")).toHaveClass("custom-class");
    });

    it("applies className to the root element", () => {
      render(
        <FAQItem
          id="faq-q1"
          dataTestId="faq-item"
          className="custom"
          entry={entry}
        />,
      );

      expect(screen.getByTestId("faq-item")).toHaveClass("custom");
    });

    it("applies id to root and derives child ids from it", () => {
      render(<FAQItem id="faq-q1" entry={entry} />);

      expect(document.getElementById("faq-q1")).toBeInTheDocument();

      const toggleButton = screen.getByRole("button", {
        name: /what is this podcast about/i,
      });
      expect(toggleButton).toHaveAttribute("id", "faq-q1__question");
      expect(toggleButton).toHaveAttribute("aria-controls", "faq-q1__answer");

      const answerRegion = screen.getByRole("region", { hidden: true });
      expect(answerRegion).toHaveAttribute("id", "faq-q1__answer");
      expect(answerRegion).toHaveAttribute(
        "aria-labelledby",
        "faq-q1__question",
      );
    });

    it("applies dataTestId to the root element", () => {
      render(<FAQItem id="faq-q1" dataTestId="faq-item" entry={entry} />);

      expect(screen.getByTestId("faq-item")).toBeInTheDocument();
    });

    it("uses semantic HTML elements", () => {
      render(<FAQItem id="faq-q1" entry={entry} />);

      const toggleButton = screen.getByRole("button", {
        name: /what is this podcast about/i,
      });
      expect(toggleButton.tagName).toBe("BUTTON");
      expect(toggleButton).toHaveAttribute("type", "button");
    });

    it("marks the icon as decorative", () => {
      const { container } = render(<FAQItem id="faq-q1" entry={entry} />);

      const icon = container.querySelector("[aria-hidden='true']");
      expect(icon).toBeInTheDocument();
    });

    it("renders in controlled open state when isOpen is true", () => {
      render(<FAQItem id="faq-q1" entry={entry} isOpen />);

      const toggleButton = screen.getByRole("button", {
        name: /what is this podcast about/i,
      });
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("region")).toBeVisible();
    });

    it("renders in controlled closed state when isOpen is false", () => {
      render(<FAQItem id="faq-q1" entry={entry} isOpen={false} />);

      const toggleButton = screen.getByRole("button", {
        name: /what is this podcast about/i,
      });
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByRole("region", { hidden: true })).not.toBeVisible();
    });
  });

  describe("a11y: operability", () => {
    describe("mouse interactions", () => {
      it("expands when the button is clicked", async () => {
        const user = userEvent.setup();
        render(<FAQItem id="faq-q1" entry={entry} />);

        const toggleButton = screen.getByRole("button", {
          name: /what is this podcast about/i,
        });
        await user.click(toggleButton);

        expect(toggleButton).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("region")).toBeVisible();
        expect(screen.getByText(/it is about great things/i)).toBeVisible();
      });

      it("collapses when the button is clicked a second time", async () => {
        const user = userEvent.setup();
        render(<FAQItem id="faq-q1" entry={entry} />);

        const toggleButton = screen.getByRole("button", {
          name: /what is this podcast about/i,
        });
        await user.click(toggleButton);
        await user.click(toggleButton);

        expect(toggleButton).toHaveAttribute("aria-expanded", "false");
        expect(screen.getByRole("region", { hidden: true })).not.toBeVisible();
      });

      it("calls onToggle with the next open state", async () => {
        const handleToggle = vi.fn();
        const user = userEvent.setup();
        render(<FAQItem id="faq-q1" entry={entry} onToggle={handleToggle} />);

        const toggleButton = screen.getByRole("button", {
          name: /what is this podcast about/i,
        });
        await user.click(toggleButton);
        expect(handleToggle).toHaveBeenCalledWith(true);

        await user.click(toggleButton);
        expect(handleToggle).toHaveBeenCalledWith(false);
      });

      it("calls onToggle in controlled mode without changing internal state", async () => {
        const handleToggle = vi.fn();
        const user = userEvent.setup();
        render(
          <FAQItem
            id="faq-q1"
            entry={entry}
            isOpen={false}
            onToggle={handleToggle}
          />,
        );

        const toggleButton = screen.getByRole("button", {
          name: /what is this podcast about/i,
        });
        await user.click(toggleButton);

        expect(handleToggle).toHaveBeenCalledWith(true);
        expect(toggleButton).toHaveAttribute("aria-expanded", "false");
      });
    });

    describe("keyboard interactions", () => {
      it("can be focused via Tab", async () => {
        const user = userEvent.setup();
        render(<FAQItem id="faq-q1" entry={entry} />);

        await user.tab();

        expect(
          screen.getByRole("button", {
            name: /what is this podcast about/i,
          }),
        ).toHaveFocus();
      });

      it("toggles with Enter key", async () => {
        const user = userEvent.setup();
        render(<FAQItem id="faq-q1" entry={entry} />);

        await user.tab();
        await user.keyboard("{Enter}");

        const toggleButton = screen.getByRole("button", {
          name: /what is this podcast about/i,
        });
        expect(toggleButton).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("region")).toBeVisible();
      });

      it("toggles with Space key", async () => {
        const user = userEvent.setup();
        render(<FAQItem id="faq-q1" entry={entry} />);

        await user.tab();
        await user.keyboard(" ");

        const toggleButton = screen.getByRole("button", {
          name: /what is this podcast about/i,
        });
        expect(toggleButton).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("region")).toBeVisible();
      });
    });
  });

  describe("a11y: static checks", () => {
    it("has no violations in collapsed state", async () => {
      const { container } = render(<FAQItem id="faq-q1" entry={entry} />);
      await checkA11y(container);
    });

    it("has no violations in expanded state", async () => {
      const user = userEvent.setup();
      const { container } = render(<FAQItem id="faq-q1" entry={entry} />);

      await user.click(
        screen.getByRole("button", {
          name: /what is this podcast about/i,
        }),
      );

      await checkA11y(container);
    });
  });
});
