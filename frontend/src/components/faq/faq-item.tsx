"use client";

import { useState } from "react";
import type { FAQEntry } from "@/lib/content/schema";
import styles from "./faq-item.module.css";

interface FAQItemProps {
  entry: FAQEntry;
}

export function FAQItem({ entry }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
      <h3 className={styles.questionWrapper}>
        <button
          type="button"
          className={styles.question}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${entry.id}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.questionText}>{entry.question}</span>
          <span className={styles.icon} aria-hidden="true">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>

      <div
        id={`faq-answer-${entry.id}`}
        className={styles.answerWrapper}
        hidden={!isOpen}
        role="region"
        aria-labelledby={`faq-question-${entry.id}`}
      >
        <p className={styles.answer}>{entry.answer}</p>
      </div>
    </div>
  );
}
