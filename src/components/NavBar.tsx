import Link from 'next/link';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbar__link} href={'/titles'}>
        Titles
      </Link>
      <Link className={styles.navbar__link} href={'/collections'}>
        Collections
      </Link>
    </nav>
  );
}
