import type { Metadata } from "next";
import {
  getFeaturedEpisode,
  getAllEpisodes,
  getSiteConfig,
} from "@/lib/content";
import { FeaturedEpisodeHero } from "@/components/episode/featured-episode-hero";
import { RecentEpisodes, ShowIntro } from "@/components/layout/home-sections";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Signals & Systems — Technology, People, and the Future of Work",
  description:
    "A weekly podcast exploring the intersection of technology, human behaviour, and the future of work.",
};

export default function HomePage() {
  const featuredEpisode = getFeaturedEpisode();
  const recentEpisodes = getAllEpisodes().slice(0, 6);
  const config = getSiteConfig();

  return (
    <div className={styles.page}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroBrand}>
          <p className={styles.heroBrandTag}>Podcast</p>
          <h1 className={styles.heroTitle}>{config.title}</h1>
          <p className={styles.heroTagline}>{config.tagline}</p>
        </div>
        <FeaturedEpisodeHero episode={featuredEpisode} />
      </div>

      <RecentEpisodes episodes={recentEpisodes} />
      <ShowIntro config={config} />
    </div>
  );
}
