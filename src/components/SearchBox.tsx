import { useRef } from 'react';

import useKeyPress from '@/hooks/useKeyPress';
import isTypingContext from '@/utils/isTypingContext';

import styles from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox(props: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useKeyPress(['s', 'S'], (event) => {
    console.log(document.activeElement);
    if (!isTypingContext(document.activeElement)) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  });

  return (
    <div className={styles.searchBox}>
      <label htmlFor="search" className={styles.label}>
        Search
      </label>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        id="search"
        name="searchString"
        placeholder="Enter text to filter the list"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
