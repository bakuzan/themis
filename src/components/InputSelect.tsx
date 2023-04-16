import classNames from '@/utils/classNames';

import styles from './Input.module.css';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
}

export default function InputSelect({
  label: labelText,
  ...props
}: InputProps) {
  return (
    <div className={styles.control}>
      <label htmlFor={props.id}>{labelText}</label>
      <select
        {...props}
        className={classNames(styles.input, props.className)}
      />
    </div>
  );
}
