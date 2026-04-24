import type { ComponentPropsWithoutRef } from "react";
import type { BaseComponentProps } from "@/components/types";

export type TextInputProps = Omit<BaseComponentProps, "id"> &
  Omit<
    ComponentPropsWithoutRef<"input">,
    | "id"
    | "type"
    | "disabled"
    | "required"
    | "aria-invalid"
    | "aria-describedby"
    | "onChange"
    | keyof Omit<BaseComponentProps, "id">
    | "children"
  > & {
    /** Required: used for internal ARIA wiring (htmlFor, aria-describedby). */
    id: string;
    /** Visible label text rendered in a <label> element. */
    label: string;
    /** Supplementary hint rendered below the label and linked via aria-describedby. */
    hint?: string;
    /** Disables the input when true. */
    isDisabled?: boolean;
    /** Marks the input as required when true. */
    isRequired?: boolean;
    /** Marks the input as invalid and shows errorMessage when true. */
    hasError?: boolean;
    /** Error message rendered when hasError is true. */
    errorMessage?: string;
    /** Called with the new string value whenever the input value changes. */
    onChange?: (value: string) => void;
  };
