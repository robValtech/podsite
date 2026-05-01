import { describe, it, expect } from "vitest";
import { render, screen, within, userEvent } from "@/test/render";
import { checkA11y } from "@/test/a11y";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  describe("rendering", () => {
    it("renders with minimal required props", () => {
      render(<SiteFooter />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();

      expect(
        screen.getByRole("navigation", { name: /footer/i }),
      ).toBeInTheDocument();

      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /episodes/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /faq/i })).toBeInTheDocument();
    });

    it("renders with all props", () => {
      render(
        <SiteFooter
          id="site-footer"
          className="custom-class"
          dataTestId="footer"
        />,
      );

      const footer = screen.getByTestId("footer");
      expect(footer).toHaveAttribute("id", "site-footer");
      expect(footer).toHaveClass("custom-class");
      expect(
        screen.getByRole("navigation", { name: /footer/i }),
      ).toBeInTheDocument();
    });

    it("applies className to the root element", () => {
      render(<SiteFooter dataTestId="footer" className="custom" />);

      expect(screen.getByTestId("footer")).toHaveClass("custom");
    });

    it("applies id to the root element", () => {
      render(<SiteFooter id="site-footer" />);

      const footer = document.getElementById("site-footer");
      expect(footer).toBeInTheDocument();
      expect(footer?.tagName).toBe("FOOTER");
    });

    it("applies dataTestId to the root element", () => {
      render(<SiteFooter dataTestId="footer" />);

      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("uses a footer element as the root", () => {
      render(<SiteFooter />);

      const footer = screen.getByRole("contentinfo");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders the brand link pointing to the home page", () => {
      render(<SiteFooter />);

      const brandLink = screen.getByRole("link", {
        name: /signals & systems — home/i,
      });
      expect(brandLink).toHaveAttribute("href", "/");
    });

    it("renders the site title and tagline", () => {
      render(<SiteFooter />);

      expect(screen.getByText("Signals & Systems")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Conversations at the intersection of technology, people, and the future of work.",
        ),
      ).toBeInTheDocument();
    });

    it("renders the navigation links with correct hrefs", () => {
      render(<SiteFooter />);

      const nav = screen.getByRole("navigation", { name: /footer/i });
      const links = within(nav).getAllByRole("link");

      expect(links).toHaveLength(4);
      expect(links[0]).toHaveAttribute("href", "/");
      expect(links[1]).toHaveAttribute("href", "/episodes");
      expect(links[2]).toHaveAttribute("href", "/about");
      expect(links[3]).toHaveAttribute("href", "/faq");
    });

    it("renders the navigation as a list for assistive technology", () => {
      render(<SiteFooter />);

      const nav = screen.getByRole("navigation", { name: /footer/i });
      const list = within(nav).getByRole("list");
      expect(list).toBeInTheDocument();
      expect(within(list).getAllByRole("listitem")).toHaveLength(4);
    });

    it("renders the copyright text with the current year", () => {
      render(<SiteFooter />);

      const year = new Date().getFullYear();
      expect(
        screen.getByText(
          `© ${year} Signals & Systems. Independently produced.`,
        ),
      ).toBeInTheDocument();
    });

    it("marks the brand icon as decorative", () => {
      render(<SiteFooter />);

      const brandLink = screen.getByRole("link", {
        name: /signals & systems — home/i,
      });
      const decorativeIcon = within(brandLink).getByText("⊙");
      expect(decorativeIcon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("a11y: operability", () => {
    describe("mouse interactions", () => {
      it("brand link responds to pointer click", async () => {
        const user = userEvent.setup();
        render(<SiteFooter />);

        const brandLink = screen.getByRole("link", {
          name: /signals & systems — home/i,
        });
        await user.click(brandLink);

        expect(brandLink).toBeInTheDocument();
      });

      it("all navigation links respond to pointer click", async () => {
        const user = userEvent.setup();
        render(<SiteFooter />);

        const nav = screen.getByRole("navigation", { name: /footer/i });
        const navLinks = within(nav).getAllByRole("link");

        for (const link of navLinks) {
          await user.click(link);
          expect(link).toBeInTheDocument();
        }
      });
    });

    describe("keyboard interactions", () => {
      it("brand link can be focused via Tab", async () => {
        const user = userEvent.setup();
        render(<SiteFooter />);

        await user.tab();

        const brandLink = screen.getByRole("link", {
          name: /signals & systems — home/i,
        });
        expect(brandLink).toHaveFocus();
      });

      it("all navigation links are reachable via Tab", async () => {
        const user = userEvent.setup();
        render(<SiteFooter />);

        const nav = screen.getByRole("navigation", { name: /footer/i });
        const navLinks = within(nav).getAllByRole("link");

        await user.tab();

        for (const link of navLinks) {
          await user.tab();
          expect(link).toHaveFocus();
        }
      });
    });
  });

  describe("a11y: static checks", () => {
    it("has no violations in default state", async () => {
      const { container } = render(<SiteFooter />);
      await checkA11y(container);
    });

    it("has no violations with all props", async () => {
      const { container } = render(
        <SiteFooter
          id="site-footer"
          className="custom-class"
          dataTestId="footer"
        />,
      );
      await checkA11y(container);
    });
  });
});
