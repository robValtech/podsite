"use client";

import { forwardRef, useState } from "react";
import type { FAQItemProps } from "./FAQItem.types";
import styles from "./FAQItem.module.css";

export const FAQItem = forwardRef<HTMLButtonElement, FAQItemProps>(
  function FAQItem(
    { id, className, dataTestId, entry, isOpen: controlledIsOpen, onToggle },
    ref,
  ) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen =
      controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const questionId = `${id}__question`;
    const answerId = `${id}__answer`;

    const handleToggle = () => {
      const nextOpen = !isOpen;
      if (controlledIsOpen === undefined) {
        setInternalIsOpen(nextOpen);
      }
      onToggle?.(nextOpen);
    };

    return (
      <div
        id={id}
        className={`${styles.item}${isOpen ? ` ${styles.itemOpen}` : ""}${className ? ` ${className}` : ""}`}
        data-testid={dataTestId}
      >
        <h3 className={styles.questionWrapper}>
          <button
            ref={ref}
            id={questionId}
            type="button"
            className={styles.question}
            aria-expanded={isOpen}
            aria-controls={answerId}
            onClick={handleToggle}
          >
            <span className={styles.questionText}>{entry.question}</span>
            <span className={styles.icon} aria-hidden="true">
              {isOpen ? "−" : "+"}
            </span>
          </button>
        </h3>

        <div
          id={answerId}
          className={styles.answerWrapper}
          hidden={!isOpen}
          role="region"
          aria-labelledby={questionId}
        >
          <p className={styles.answer}>{entry.answer}</p>
        </div>
      </div>
    );
  },
);
FAQItem.displayName = "FAQItem";
