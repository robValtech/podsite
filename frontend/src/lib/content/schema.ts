// Content schema types and validation helpers

export interface Episode {
  slug: string;
  title: string;
  summary: string;
  episodeNumber: number;
  publishDate: string;
  duration: string;
  artwork?: string;
  body: string;
}

export interface PodcastShow {
  title: string;
  tagline: string;
  description: string;
  featuredEpisodeSlug: string;
  hostName?: string;
  coverImage?: string;
}

export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
}

export interface StaticPageContent {
  slug: "about" | "faq";
  title: string;
  intro: string;
  body: string;
}

export function validateEpisodeCollection(episodes: Episode[]): void {
  if (episodes.length !== 20) {
    throw new Error(`Expected exactly 20 episodes, got ${episodes.length}`);
  }

  const slugs = new Set<string>();
  const numbers = new Set<number>();

  for (const ep of episodes) {
    if (
      !ep.slug ||
      !ep.title ||
      !ep.summary ||
      !ep.publishDate ||
      !ep.duration ||
      !ep.body
    ) {
      throw new Error(
        `Episode #${ep.episodeNumber} "${ep.title}" is missing required fields`,
      );
    }
    if (slugs.has(ep.slug)) {
      throw new Error(`Duplicate slug: ${ep.slug}`);
    }
    if (numbers.has(ep.episodeNumber)) {
      throw new Error(`Duplicate episode number: ${ep.episodeNumber}`);
    }
    slugs.add(ep.slug);
    numbers.add(ep.episodeNumber);
  }
}

export function validateShowConfig(
  show: PodcastShow,
  episodes: Episode[],
): void {
  if (
    !show.title ||
    !show.tagline ||
    !show.description ||
    !show.featuredEpisodeSlug
  ) {
    throw new Error("Show config is missing required fields");
  }
  const featured = episodes.find((ep) => ep.slug === show.featuredEpisodeSlug);
  if (!featured) {
    throw new Error(
      `Featured episode slug "${show.featuredEpisodeSlug}" does not match any episode`,
    );
  }
}
