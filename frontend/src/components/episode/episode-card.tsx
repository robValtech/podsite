import Link from "next/link";
import type { Episode } from "@/lib/content/schema";
import styles from "./episode-card.module.css";

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.meta}>
          <span className={styles.episodeNumber}>
            Ep. {episode.episodeNumber}
          </span>
          <span className={styles.separator} aria-hidden="true">
            ·
          </span>
          <time className={styles.date} dateTime={episode.publishDate}>
            {episode.publishDate}
          </time>
        </div>

        <h3 className={styles.title}>
          <Link
            href={`/episodes/${episode.slug}`}
            className={styles.titleLink}
            aria-label={`Episode ${episode.episodeNumber}: ${episode.title}`}
          >
            {episode.title}
          </Link>
        </h3>

        <p className={styles.summary}>{episode.summary}</p>

        <div className={styles.footer}>
          <span className={styles.duration}>
            <span aria-hidden="true">🎧</span>
            <span className="sr-only">Duration: </span>
            {episode.duration}
          </span>
          <Link
            href={`/episodes/${episode.slug}`}
            className={styles.listenLink}
            aria-label={`Listen to episode ${episode.episodeNumber}: ${episode.title}`}
            tabIndex={-1}
          >
            Listen →
          </Link>
        </div>
      </div>
    </article>
  );
}
