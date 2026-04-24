import Link from "next/link";
import type { Episode, PodcastShow } from "@/lib/content/schema";
import { EpisodeCard } from "@/components/EpisodeCard/EpisodeCard";
import styles from "./home-sections.module.css";

interface RecentEpisodesProps {
  episodes: Episode[];
}

export function RecentEpisodes({ episodes }: RecentEpisodesProps) {
  return (
    <section
      className={styles.section}
      aria-labelledby="recent-episodes-heading"
    >
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <h2 id="recent-episodes-heading" className={styles.sectionTitle}>
            Recent Episodes
          </h2>
          <Link
            href="/episodes"
            className={styles.viewAll}
            aria-label="View all episodes"
          >
            View all →
          </Link>
        </div>

        <ul className={styles.episodeGrid} role="list">
          {episodes.map((episode) => (
            <li key={episode.slug}>
              <EpisodeCard episode={episode} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface ShowIntroProps {
  config: PodcastShow;
}

export function ShowIntro({ config }: ShowIntroProps) {
  return (
    <section className={styles.showIntro} aria-labelledby="show-intro-heading">
      <div className={styles.inner}>
        <div className={styles.introContent}>
          <h2 id="show-intro-heading" className={styles.introTitle}>
            About the Show
          </h2>
          <p className={styles.introText}>{config.description}</p>
          <Link href="/about" className={styles.introLink}>
            Learn more about the show →
          </Link>
        </div>
      </div>
    </section>
  );
}
