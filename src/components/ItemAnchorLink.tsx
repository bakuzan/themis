import Link from 'next/link';

import styles from './ItemAnchorLink.module.css';

interface ItemAnchorLinkProps {
  hashId: string;
}

export default function ItemAnchorLink({ hashId }: ItemAnchorLinkProps) {
  return (
    <div className={styles.itemAnchor}>
      <Link href={`#${hashId}`}>#</Link>
    </div>
  );
}
