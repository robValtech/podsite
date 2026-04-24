import type { BaseComponentProps } from "@/components/types";
import type { FAQEntry } from "@/lib/content/schema";

export type FAQItemProps = Omit<BaseComponentProps, "id"> & {
  /** Required: used for internal ARIA wiring (aria-controls, aria-labelledby). */
  id: string;
  /** The FAQ entry data to display. */
  entry: FAQEntry;
  /** Controlled open state. When omitted the component manages its own state. */
  isOpen?: boolean;
  /** Called with the next open state when the toggle button is activated. */
  onToggle?: (isOpen: boolean) => void;
};
