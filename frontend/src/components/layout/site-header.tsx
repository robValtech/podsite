import Link from "next/link";
import { getSiteConfig } from "@/lib/content";
import styles from "./site-header.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const config = getSiteConfig();

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          aria-label={`${config.title} — Home`}
        >
          <span className={styles.logoMark} aria-hidden="true">
            ⊙
          </span>
          <span className={styles.logoText}>{config.title}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          <ul className={styles.navList} role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
