import classNames from '@/utils/classNames';

import styles from './Input.module.css';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

export default function Input({ label: labelText, ...props }: InputProps) {
  const isCheckbox = props.type === 'checkbox';

  return (
    <div className={classNames(styles.control, isCheckbox && styles.checkbox)}>
      <label htmlFor={props.id}>{labelText}</label>
      <input {...props} className={classNames(styles.input, props.className)} />
    </div>
  );
}
