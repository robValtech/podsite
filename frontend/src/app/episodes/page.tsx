import type { Metadata } from "next";
import { getAllEpisodes } from "@/lib/content";
import { EpisodeCard } from "@/components/EpisodeCard/EpisodeCard";
import { generatePageMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = generatePageMetadata(
  "All Episodes",
  "Browse all 20 episodes of Signals & Systems — conversations at the intersection of technology, people, and the future of work.",
  "episodes",
);

export default function EpisodesPage() {
  const episodes = getAllEpisodes();

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>All Episodes</h1>
          <p className={styles.pageSubtitle}>
            {episodes.length} episodes &amp; counting
          </p>
        </div>
      </header>

      <section className={styles.catalog} aria-label="Episode catalog">
        <div className={styles.catalogInner}>
          <ul className={styles.episodeGrid} role="list">
            {episodes.map((episode) => (
              <li key={episode.slug}>
                <EpisodeCard episode={episode} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
