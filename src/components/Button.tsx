import classNames from '@/utils/classNames';

import styles from './Button.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button({ ...props }: ButtonProps) {
  return (
    <button {...props} className={classNames(styles.button, props.className)} />
  );
}
