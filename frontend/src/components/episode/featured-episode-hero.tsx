import Link from "next/link";
import type { Episode } from "@/lib/content/schema";
import styles from "./featured-episode-hero.module.css";

interface FeaturedEpisodeHeroProps {
  episode: Episode;
}

export function FeaturedEpisodeHero({ episode }: FeaturedEpisodeHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="featured-episode-heading">
      <div className={styles.inner}>
        <div className={styles.label} aria-label="Section label">
          <span className={styles.labelDot} aria-hidden="true" />
          Featured Episode
        </div>

        <div className={styles.content}>
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
            <span className={styles.separator} aria-hidden="true">
              ·
            </span>
            <span className={styles.duration}>{episode.duration}</span>
          </div>

          <h2 id="featured-episode-heading" className={styles.title}>
            {episode.title}
          </h2>

          <p className={styles.summary}>{episode.summary}</p>

          <Link
            href={`/episodes/${episode.slug}`}
            className={styles.cta}
            aria-label={`Listen to episode ${episode.episodeNumber}: ${episode.title}`}
          >
            <span className={styles.ctaIcon} aria-hidden="true">
              ▶
            </span>
            Listen Now
          </Link>
        </div>

        <div className={styles.artworkWrapper} aria-hidden="true">
          <div className={styles.artwork}>
            <div className={styles.artworkInner}>
              <span className={styles.artworkGlyph}>⊙</span>
            </div>
            <div className={styles.artworkRing} />
          </div>
        </div>
      </div>
    </section>
  );
}
