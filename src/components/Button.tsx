import classNames from '@/utils/classNames';

import styles from './Button.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isDanger?: boolean;
}

export default function Button({ isDanger = false, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        styles.button,
        isDanger && styles.danger,
        props.className
      )}
    />
  );
}
