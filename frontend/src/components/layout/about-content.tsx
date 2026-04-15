import type { StaticPageContent, PodcastShow } from "@/lib/content/schema";
import styles from "./about-content.module.css";

interface AboutContentProps {
  page: StaticPageContent;
  config: PodcastShow;
}

export function AboutContent({ page, config }: AboutContentProps) {
  const bodyParagraphs = page.body.trim().split(/\n\n+/);

  return (
    <article className={styles.article} aria-labelledby="about-heading">
      <header className={styles.header}>
        <div className={styles.headerLabel} aria-hidden="true">
          <span className={styles.labelDot} />
          Podcast
        </div>
        <h1 id="about-heading" className={styles.title}>
          {page.title}
        </h1>
        <p className={styles.intro}>{page.intro}</p>
      </header>

      <div className={styles.body}>
        {bodyParagraphs.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph.trim()}
          </p>
        ))}
      </div>

      {config.hostName && (
        <div className={styles.host} aria-label="Host information">
          <div className={styles.hostAvatar} aria-hidden="true">
            <span className={styles.hostGlyph}>⊙</span>
          </div>
          <div className={styles.hostInfo}>
            <p className={styles.hostLabel}>Hosted by</p>
            <p className={styles.hostName}>{config.hostName}</p>
          </div>
        </div>
      )}
    </article>
  );
}
