import { describe, it, expect } from "vitest";
import { render, screen, userEvent } from "@/test/render";
import { checkA11y } from "@/test/a11y";
import { EpisodeCard } from "./EpisodeCard";
import type { Episode } from "@/lib/content/schema";

const episode: Episode = {
  slug: "intro-to-testing",
  title: "Introduction to Testing",
  summary: "A beginner-friendly guide to writing tests.",
  episodeNumber: 1,
  publishDate: "2025-01-15",
  duration: "32 min",
  body: "Full episode body content here.",
};

describe("EpisodeCard", () => {
  describe("rendering", () => {
    it("renders with minimal required props", () => {
      render(<EpisodeCard episode={episode} />);

      const card = screen.getByRole("article");
      expect(card).toBeInTheDocument();

      expect(screen.getByText("Ep. 1")).toBeInTheDocument();
      expect(screen.getByText("2025-01-15")).toBeInTheDocument();
      expect(
        screen.getByRole("link", {
          name: "Episode 1: Introduction to Testing",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("A beginner-friendly guide to writing tests."),
      ).toBeInTheDocument();
      expect(screen.getByText("32 min")).toBeInTheDocument();
    });

    it("renders with all props", () => {
      render(
        <EpisodeCard
          episode={episode}
          id="ep-card-1"
          className="custom-class"
          dataTestId="episode-card"
        />,
      );

      const card = screen.getByTestId("episode-card");
      expect(card).toHaveAttribute("id", "ep-card-1");
      expect(card).toHaveClass("custom-class");
      expect(
        screen.getByRole("link", {
          name: "Episode 1: Introduction to Testing",
        }),
      ).toBeInTheDocument();
    });

    it("applies className to the root element", () => {
      render(
        <EpisodeCard
          episode={episode}
          dataTestId="episode-card"
          className="custom"
        />,
      );

      expect(screen.getByTestId("episode-card")).toHaveClass("custom");
    });

    it("applies id to the root element", () => {
      render(<EpisodeCard episode={episode} id="ep-card-1" />);

      expect(document.getElementById("ep-card-1")).toBeInTheDocument();
    });

    it("applies dataTestId to the root element", () => {
      render(<EpisodeCard episode={episode} dataTestId="episode-card" />);

      expect(screen.getByTestId("episode-card")).toBeInTheDocument();
    });

    it("uses an article element as the root", () => {
      render(<EpisodeCard episode={episode} />);

      const card = screen.getByRole("article");
      expect(card.tagName).toBe("ARTICLE");
    });

    it("renders the title as a link to the episode page", () => {
      render(<EpisodeCard episode={episode} />);

      const titleLink = screen.getByRole("link", {
        name: "Episode 1: Introduction to Testing",
      });
      expect(titleLink).toHaveAttribute("href", "/episodes/intro-to-testing");
    });

    it("renders the listen link to the episode page", () => {
      render(<EpisodeCard episode={episode} />);

      const listenLink = screen.getByRole("link", {
        name: /listen to episode 1: introduction to testing/i,
      });
      expect(listenLink).toHaveAttribute("href", "/episodes/intro-to-testing");
      expect(listenLink).toHaveAttribute("tabIndex", "-1");
    });

    it("renders the publish date as a time element with dateTime attribute", () => {
      render(<EpisodeCard episode={episode} />);

      const timeElement = screen.getByText("2025-01-15");
      expect(timeElement.tagName).toBe("TIME");
      expect(timeElement).toHaveAttribute("dateTime", "2025-01-15");
    });

    it("marks the separator and headphone icon as decorative", () => {
      const { container } = render(<EpisodeCard episode={episode} />);

      const decorativeElements = container.querySelectorAll(
        "[aria-hidden='true']",
      );
      expect(decorativeElements.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("a11y: operability", () => {
    describe("keyboard interactions", () => {
      it("title link can be focused via Tab", async () => {
        const user = userEvent.setup();
        render(<EpisodeCard episode={episode} />);

        await user.tab();

        const titleLink = screen.getByRole("link", {
          name: "Episode 1: Introduction to Testing",
        });
        expect(titleLink).toHaveFocus();
      });

      it("listen link is excluded from the tab order", async () => {
        const user = userEvent.setup();
        render(<EpisodeCard episode={episode} />);

        await user.tab();
        await user.tab();

        const listenLink = screen.getByRole("link", {
          name: /listen to episode 1: introduction to testing/i,
        });
        expect(listenLink).not.toHaveFocus();
      });
    });
  });

  describe("a11y: static checks", () => {
    it("has no violations in default state", async () => {
      const { container } = render(<EpisodeCard episode={episode} />);
      await checkA11y(container);
    });

    it("has no violations with all props", async () => {
      const { container } = render(
        <EpisodeCard
          episode={episode}
          id="ep-card-1"
          className="custom-class"
          dataTestId="episode-card"
        />,
      );
      await checkA11y(container);
    });
  });
});
