import type { Metadata } from "next";
import type { Episode, PodcastShow } from "@/lib/content/schema";
import { getSiteConfig } from "@/lib/content";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://signalsandsystems.fm";

export function generateSiteMetadata(): Metadata {
  const config = getSiteConfig();
  return {
    title: {
      template: `%s | ${config.title}`,
      default: config.title,
    },
    description: config.description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: "website",
      siteName: config.title,
      description: config.description,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function generateEpisodeMetadata(
  episode: Episode,
  config?: PodcastShow,
): Metadata {
  const show = config ?? getSiteConfig();
  const title = episode.title;
  const description = episode.summary;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title: `${title} | ${show.title}`,
      description,
      url: `${BASE_URL}/episodes/${episode.slug}`,
    },
    twitter: {
      card: "summary",
      title: `${title} | ${show.title}`,
      description,
    },
    alternates: {
      canonical: `/episodes/${episode.slug}`,
    },
  };
}

export function generatePageMetadata(
  title: string,
  description: string,
  slug: string,
): Metadata {
  const config = getSiteConfig();
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title: `${title} | ${config.title}`,
      description,
      url: `${BASE_URL}/${slug}`,
    },
    alternates: {
      canonical: `/${slug}`,
    },
  };
}
