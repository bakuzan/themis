import classNames from '@/utils/classNames';

import styles from './ButtonGroup.module.css';

interface ButtonGroupProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export default function ButtonGroup({
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div className={classNames(styles.group, className)} {...props}>
      {children}
    </div>
  );
}
