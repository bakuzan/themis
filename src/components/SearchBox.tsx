import styles from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox(props: SearchBoxProps) {
  return (
    <div className={styles.searchBox}>
      <label htmlFor="search" className={styles.label}>
        Search
      </label>
      <input
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
