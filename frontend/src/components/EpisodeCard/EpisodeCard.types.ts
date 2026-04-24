import type { BaseComponentProps } from "@/components/types";
import type { Episode } from "@/lib/content/schema";

export type EpisodeCardProps = BaseComponentProps & {
  episode: Episode;
};
