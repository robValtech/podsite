import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllEpisodeSlugs, getEpisodeBySlug } from "@/lib/content";
import { EpisodeDetail } from "@/components/episode/episode-detail";
import { generateEpisodeMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.css";

interface EpisodePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllEpisodeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  const episode = getEpisodeBySlug(params.slug);
  if (!episode) return {};
  return generateEpisodeMetadata(episode);
}

export default function EpisodePage({ params }: EpisodePageProps) {
  const episode = getEpisodeBySlug(params.slug);

  if (!episode) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <EpisodeDetail episode={episode} />
    </div>
  );
}
