import { forwardRef } from "react";
import type { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.css";

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      id,
      className,
      dataTestId,
      label,
      hint,
      isDisabled = false,
      isRequired = false,
      hasError = false,
      errorMessage,
      onChange,
      ...inputProps
    },
    ref,
  ) {
    const inputId = `${id}__input`;
    const hintId = hint ? `${id}__hint` : undefined;
    const errorId = hasError && errorMessage ? `${id}__error` : undefined;
    const describedBy =
      [hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        id={id}
        className={`${styles.root}${className ? ` ${className}` : ""}`}
        data-testid={dataTestId}
      >
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {isRequired && (
            <span className={styles.required} aria-hidden="true">
              {" *"}
            </span>
          )}
        </label>
        {hint && (
          <span id={hintId} className={styles.hint}>
            {hint}
          </span>
        )}
        <input
          {...inputProps}
          ref={ref}
          id={inputId}
          type="text"
          className={styles.input}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={describedBy}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
        {hasError && errorMessage && (
          <span id={errorId} className={styles.error}>
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);
TextInput.displayName = "TextInput";
