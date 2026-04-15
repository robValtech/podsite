import { episodes } from "@/content/episodes";
import { siteConfig } from "@/content/site/site";
import { aboutPage, faqPage, faqEntries } from "@/content/pages";
import type {
  Episode,
  PodcastShow,
  StaticPageContent,
  FAQEntry,
} from "./schema";

export type { Episode, PodcastShow, StaticPageContent, FAQEntry };

export function getAllEpisodes(): Episode[] {
  return [...episodes].sort((a, b) => b.episodeNumber - a.episodeNumber);
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((ep) => ep.slug === slug);
}

export function getFeaturedEpisode(): Episode {
  const featured = episodes.find(
    (ep) => ep.slug === siteConfig.featuredEpisodeSlug,
  );
  if (!featured) {
    throw new Error(
      `Featured episode slug "${siteConfig.featuredEpisodeSlug}" does not match any episode`,
    );
  }
  return featured;
}

export function getAllEpisodeSlugs(): string[] {
  return episodes.map((ep) => ep.slug);
}

export function getSiteConfig(): PodcastShow {
  return siteConfig;
}

export function getAboutPage(): StaticPageContent {
  return aboutPage;
}

export function getFaqPage(): StaticPageContent {
  return faqPage;
}

export function getFaqEntries(): FAQEntry[] {
  return faqEntries;
}
