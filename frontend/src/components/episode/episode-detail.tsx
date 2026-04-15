import Link from "next/link";
import type { Episode } from "@/lib/content/schema";
import styles from "./episode-detail.module.css";

interface EpisodeDetailProps {
  episode: Episode;
}

export function EpisodeDetail({ episode }: EpisodeDetailProps) {
  const bodyParagraphs = episode.body.trim().split(/\n\n+/);

  return (
    <article className={styles.article} aria-labelledby="episode-title">
      <header className={styles.header}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
            </li>
            <li aria-hidden="true" className={styles.breadcrumbSep}>
              ›
            </li>
            <li>
              <Link href="/episodes" className={styles.breadcrumbLink}>
                Episodes
              </Link>
            </li>
            <li aria-hidden="true" className={styles.breadcrumbSep}>
              ›
            </li>
            <li aria-current="page" className={styles.breadcrumbCurrent}>
              {episode.title}
            </li>
          </ol>
        </nav>

        <div className={styles.episodeMeta}>
          <span className={styles.episodeTag}>
            Episode {episode.episodeNumber}
          </span>
        </div>

        <h1 id="episode-title" className={styles.title}>
          {episode.title}
        </h1>

        <div className={styles.metaRow}>
          <time className={styles.metaItem} dateTime={episode.publishDate}>
            <span aria-hidden="true">📅</span>
            <span className="sr-only">Published: </span>
            {episode.publishDate}
          </time>
          <span className={styles.metaSep} aria-hidden="true">
            ·
          </span>
          <span className={styles.metaItem}>
            <span aria-hidden="true">🎧</span>
            <span className="sr-only">Duration: </span>
            {episode.duration}
          </span>
        </div>

        <p className={styles.summary}>{episode.summary}</p>
      </header>

      <div className={styles.body}>
        {bodyParagraphs.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph.trim()}
          </p>
        ))}
      </div>

      <footer className={styles.footer}>
        <Link href="/episodes" className={styles.backLink}>
          ← Back to all episodes
        </Link>
      </footer>
    </article>
  );
}
