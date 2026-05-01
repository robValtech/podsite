import Link from "next/link";
import { getSiteConfig } from "@/lib/content";
import type { SiteFooterProps } from "./SiteFooter.types";
import styles from "./SiteFooter.module.css";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function SiteFooter({ id, className, dataTestId }: SiteFooterProps) {
  const config = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer
      className={className ? `${styles.footer} ${className}` : styles.footer}
      id={id}
      data-testid={dataTestId}
    >
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link
            href="/"
            className={styles.brandLink}
            aria-label={`${config.title} — Home`}
          >
            <span className={styles.brandMark} aria-hidden="true">
              ⊙
            </span>
            <span className={styles.brandName}>{config.title}</span>
          </Link>
          <p className={styles.tagline}>{config.tagline}</p>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          <ul className={styles.navList} role="list">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; {year} {config.title}. Independently produced.
        </p>
      </div>
    </footer>
  );
}
