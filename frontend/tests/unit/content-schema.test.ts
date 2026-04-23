import { describe, it, expect } from "vitest";
import { episodes } from "@/content/episodes";
import { siteConfig } from "@/content/site/site";
import {
  validateEpisodeCollection,
  validateShowConfig,
} from "@/lib/content/schema";

describe("Episode collection", () => {
  it("contains exactly 20 episodes", () => {
    expect(episodes).toHaveLength(20);
  });

  it("has unique slugs", () => {
    const slugs = episodes.map((ep) => ep.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(20);
  });

  it("has unique episode numbers", () => {
    const numbers = episodes.map((ep) => ep.episodeNumber);
    const uniqueNumbers = new Set(numbers);
    expect(uniqueNumbers.size).toBe(20);
  });

  it("passes schema validation", () => {
    expect(() => validateEpisodeCollection(episodes)).not.toThrow();
  });
});

describe("Site configuration", () => {
  it("passes schema validation against episode list", () => {
    expect(() => validateShowConfig(siteConfig, episodes)).not.toThrow();
  });

  it("featured episode slug matches an existing episode", () => {
    const match = episodes.find(
      (ep) => ep.slug === siteConfig.featuredEpisodeSlug,
    );
    expect(match).toBeDefined();
  });
});
