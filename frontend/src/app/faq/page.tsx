import type { Metadata } from "next";
import { getFaqPage, getFaqEntries } from "@/lib/content";
import { FAQItem } from "@/components/faq/faq-item";
import { generatePageMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = generatePageMetadata(
  "FAQ",
  "Frequently asked questions about Signals & Systems — how it works, episode schedule, guests, and more.",
  "faq",
);

export default function FAQPage() {
  const page = getFaqPage();
  const entries = getFaqEntries();

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.headerLabel} aria-hidden="true">
            <span className={styles.labelDot} />
            Help
          </div>
          <h1 className={styles.pageTitle}>{page.title}</h1>
          <p className={styles.pageIntro}>{page.intro}</p>
        </div>
      </header>

      <section className={styles.faqSection} aria-label="FAQ items">
        <div className={styles.faqInner}>
          <ul className={styles.faqList} role="list">
            {entries.map((entry) => (
              <li key={entry.id}>
                <FAQItem entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
