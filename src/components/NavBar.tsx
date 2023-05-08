import Link from 'next/link';

import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbar__link} href={'/'} title="Go to home page">
        <div className={styles.imageContainer}>
          <img src="/favicon.ico" alt="Themis" />
        </div>
      </Link>
      <Link className={styles.navbar__link} href={'/titles'}>
        Titles
      </Link>
      <Link className={styles.navbar__link} href={'/collections'}>
        Collections
      </Link>
      <Link className={styles.navbar__link} href={'/readOrders'}>
        Read Orders
      </Link>
    </nav>
  );
}
