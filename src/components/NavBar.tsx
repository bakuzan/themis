import Link from 'next/link';
import Image from 'next/image';

import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbar__link} href={'/'} title="Go to home page">
        <div className={styles.imageContainer}>
          <Image src="/favicon.ico" alt="Themis" width={32} height={32} />
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
