import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@/test/render";
import { checkA11y } from "@/test/a11y";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  describe("rendering", () => {
    it("renders with minimal required props", () => {
      render(<TextInput id="name" label="Name" />);

      const input = screen.getByRole("textbox", { name: /name/i });
      expect(input).toBeInTheDocument();
      expect(input).not.toBeDisabled();
      expect(input).not.toBeRequired();
      expect(input).not.toHaveAttribute("aria-invalid");
      expect(input).not.toHaveAttribute("aria-describedby");
      expect(document.getElementById("name__hint")).not.toBeInTheDocument();
      expect(document.getElementById("name__error")).not.toBeInTheDocument();
    });

    it("renders with all props", () => {
      const handleChange = vi.fn();
      render(
        <TextInput
          id="email"
          className="custom-class"
          dataTestId="email-field"
          label="Email"
          hint="We'll never share your email"
          isDisabled
          isRequired
          hasError
          errorMessage="Email is required"
          onChange={handleChange}
        />,
      );

      const input = screen.getByRole("textbox", { name: /email/i });
      expect(input).toBeDisabled();
      expect(input).toBeRequired();
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute(
        "aria-describedby",
        "email__hint email__error",
      );
      expect(
        screen.getByText(/we'll never share your email/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByTestId("email-field")).toHaveClass("custom-class");
    });

    it("applies className to the root element", () => {
      render(
        <TextInput
          id="name"
          label="Name"
          dataTestId="name-field"
          className="custom"
        />,
      );

      expect(screen.getByTestId("name-field")).toHaveClass("custom");
    });

    it("applies id to root and derives child ids from it", () => {
      render(
        <TextInput
          id="fruit"
          label="Favourite fruit"
          hint="For example, banana"
          hasError
          errorMessage="Please pick a fruit"
        />,
      );

      expect(document.getElementById("fruit")).toBeInTheDocument();

      const input = screen.getByRole("textbox", { name: /favourite fruit/i });
      expect(input).toHaveAttribute("id", "fruit__input");

      const label = screen.getByText(/favourite fruit/i);
      expect(label.closest("label")).toHaveAttribute("for", "fruit__input");

      expect(document.getElementById("fruit__hint")).toHaveTextContent(
        "For example, banana",
      );
      expect(document.getElementById("fruit__error")).toHaveTextContent(
        "Please pick a fruit",
      );
    });

    it("applies dataTestId to the root element", () => {
      render(<TextInput id="name" label="Name" dataTestId="name-input" />);

      expect(screen.getByTestId("name-input")).toBeInTheDocument();
    });

    it("uses semantic label and input elements", () => {
      render(<TextInput id="name" label="Name" />);

      const input = screen.getByRole("textbox", { name: /name/i });
      expect(input.tagName).toBe("INPUT");
      expect(input).toHaveAttribute("type", "text");

      const label = screen.getByText(/name/i);
      expect(label.tagName).toBe("LABEL");
      expect(label).toHaveAttribute("for", "name__input");
    });

    it("renders hint linked via aria-describedby", () => {
      render(<TextInput id="name" label="Name" hint="Enter your full name" />);

      const input = screen.getByRole("textbox", { name: /name/i });
      expect(input).toHaveAttribute("aria-describedby", "name__hint");
      expect(screen.getByText(/enter your full name/i)).toHaveAttribute(
        "id",
        "name__hint",
      );
    });

    it("does not render hint when hint prop is not provided", () => {
      render(<TextInput id="name" label="Name" />);

      expect(document.getElementById("name__hint")).not.toBeInTheDocument();
    });

    it("renders error message when hasError is true and errorMessage is provided", () => {
      render(
        <TextInput id="name" label="Name" hasError errorMessage="Required" />,
      );

      const input = screen.getByRole("textbox", { name: /name/i });
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", "name__error");
      expect(screen.getByText(/required/i)).toHaveAttribute(
        "id",
        "name__error",
      );
    });

    it("does not render error when hasError is false", () => {
      render(<TextInput id="name" label="Name" errorMessage="Required" />);

      expect(document.getElementById("name__error")).not.toBeInTheDocument();
      const input = screen.getByRole("textbox", { name: /name/i });
      expect(input).not.toHaveAttribute("aria-invalid");
    });

    it("shows required indicator when isRequired is true", () => {
      const { container } = render(
        <TextInput id="name" label="Name" isRequired />,
      );

      const input = screen.getByRole("textbox", { name: /name/i });
      expect(input).toBeRequired();

      const requiredIndicator = container.querySelector("[aria-hidden='true']");
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveTextContent("*");
    });

    it("includes both hint and error in aria-describedby when both are present", () => {
      render(
        <TextInput
          id="name"
          label="Name"
          hint="Help text"
          hasError
          errorMessage="Error text"
        />,
      );

      const input = screen.getByRole("textbox", { name: /name/i });
      expect(input).toHaveAttribute(
        "aria-describedby",
        "name__hint name__error",
      );
    });
  });

  describe("a11y: operability", () => {
    describe("mouse interactions", () => {
      it("calls onChange with the input value when typing", async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<TextInput id="name" label="Name" onChange={handleChange} />);

        const input = screen.getByRole("textbox", { name: /name/i });
        await user.type(input, "abc");

        expect(handleChange).toHaveBeenCalledTimes(3);
        expect(handleChange).toHaveBeenLastCalledWith("abc");
      });
    });

    describe("keyboard interactions", () => {
      it("can be focused via Tab", async () => {
        const user = userEvent.setup();
        render(<TextInput id="name" label="Name" />);

        await user.tab();

        expect(screen.getByRole("textbox", { name: /name/i })).toHaveFocus();
      });

      it("cannot be focused when disabled", async () => {
        const user = userEvent.setup();
        render(<TextInput id="name" label="Name" isDisabled />);

        await user.tab();

        expect(
          screen.getByRole("textbox", { name: /name/i }),
        ).not.toHaveFocus();
      });

      it("accepts keyboard input when focused via Tab", async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<TextInput id="name" label="Name" onChange={handleChange} />);

        await user.tab();
        await user.keyboard("a");

        expect(handleChange).toHaveBeenCalledWith("a");
      });
    });
  });

  describe("a11y: static checks", () => {
    it("has no violations in default state", async () => {
      const { container } = render(<TextInput id="name" label="Name" />);
      await checkA11y(container);
    });

    it("has no violations with hint", async () => {
      const { container } = render(
        <TextInput id="name" label="Name" hint="Enter your full name" />,
      );
      await checkA11y(container);
    });

    it("has no violations in disabled state", async () => {
      const { container } = render(
        <TextInput id="name" label="Name" isDisabled />,
      );
      await checkA11y(container);
    });

    it("has no violations in required state", async () => {
      const { container } = render(
        <TextInput id="name" label="Name" isRequired />,
      );
      await checkA11y(container);
    });

    it("has no violations in error state", async () => {
      const { container } = render(
        <TextInput id="name" label="Name" hasError errorMessage="Required" />,
      );
      await checkA11y(container);
    });

    it("has no violations with all a11y-relevant props", async () => {
      const { container } = render(
        <TextInput
          id="name"
          label="Name"
          hint="Enter your full name"
          isRequired
          hasError
          errorMessage="Required"
        />,
      );
      await checkA11y(container);
    });
  });
});
