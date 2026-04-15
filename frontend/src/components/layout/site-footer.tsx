import Link from "next/link";
import { getSiteConfig } from "@/lib/content";
import styles from "./site-footer.module.css";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function SiteFooter() {
  const config = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
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

        <nav className={styles.nav} aria-label="Footer navigation">
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
