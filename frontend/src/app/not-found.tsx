import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.glyph} aria-hidden="true">
          ⊙
        </div>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.description}>
          The page you are looking for does not exist or may have moved. Head
          back to safety below.
        </p>
        <nav aria-label="Recovery navigation">
          <ul className={styles.links} role="list">
            <li>
              <Link href="/" className={styles.linkPrimary}>
                Go to Home
              </Link>
            </li>
            <li>
              <Link href="/episodes" className={styles.linkSecondary}>
                Browse Episodes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
