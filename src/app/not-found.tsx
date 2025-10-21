import Link from 'next/link';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.centering}>
        <h2>Not Found</h2>
        <p>Maybe the archives are incomplete...</p>
        <Link href="/" style={{ marginTop: 25 }}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
