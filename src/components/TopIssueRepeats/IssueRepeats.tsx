import { IssueRepeatDetailViewModel } from '@/types/Stats';

import styles from './IssueRepeats.module.css';
import getCollectionFullName from '@/utils/getCollectionFullName';

interface IssueRepeatsProps {
  data?: IssueRepeatDetailViewModel[];
}

export default function IssueRepeats(props: IssueRepeatsProps) {
  if (!props.data) {
    return null;
  }

  return (
    <tr>
      <td
        className={styles.onResponsive}
        data-column-title="Repeat Details"
      ></td>
      <td className={styles.preventResponsiveness} colSpan={3}>
        <table style={{ width: `100%` }}>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((x) => {
              const uniqueKey = `${x.readHistoryId}_${x.collectionId}`;
              const collectionName = getCollectionFullName(x, true);

              return (
                <tr key={uniqueKey} className={styles.nestedRow}>
                  <td className={styles.nestedRowCell}>
                    <div className={styles.rowInner}>
                      <div className={styles.rowInnerText}>
                        <div>{x.readOrderName}</div>
                        <div>{collectionName}</div>
                      </div>
                      <div className={styles.rowInnerDate}>{x.readOnDate}</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </td>
    </tr>
  );
}
