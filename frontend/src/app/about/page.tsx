import type { Metadata } from "next";
import { getAboutPage, getSiteConfig } from "@/lib/content";
import { AboutContent } from "@/components/layout/about-content";
import { generatePageMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = generatePageMetadata(
  "About",
  "Learn about Signals & Systems — who makes it, what it covers, and why it exists.",
  "about",
);

export default function AboutPage() {
  const page = getAboutPage();
  const config = getSiteConfig();

  return (
    <div className={styles.page}>
      <AboutContent page={page} config={config} />
    </div>
  );
}
