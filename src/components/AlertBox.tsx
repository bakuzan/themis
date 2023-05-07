import { Alert, AlertType } from '@/types/Alert';
import classNames from '@/utils/classNames';

import styles from './AlertBox.module.css';

interface AlertBoxProps {
  items: Alert[];
  onClear: (key: string) => void;
}

function getIconForAlertType(alertType: AlertType) {
  switch (alertType) {
    case AlertType.error:
      return '\u26A0\uFE0E';
    case AlertType.info:
      return '\uD83D\uDEC8\uFE0E';
  }
}

export default function AlertBox(props: AlertBoxProps) {
  return (
    <div className={styles.container}>
      {props.items.slice(0, 1).map((x) => (
        <div key={x.key} className={classNames(styles.alert, styles[x.type])}>
          <div className={styles.icon}>
            <span aria-hidden={true}>{getIconForAlertType(x.type)}</span>
          </div>
          <div className={styles.message}>{x.message}</div>
          <div className={styles.buttonBox}>
            <button
              className={styles.clear}
              title="Clear alert"
              onClick={() => props.onClear(x.key)}
            >
              <span aria-hidden={true}>&#x2715;</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
