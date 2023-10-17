import { IssueRepeatViewModel } from '@/types/Stats';

import styles from './index.module.css';
import classNames from '@/utils/classNames';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';

interface TopIssueRepeatsProps {
  data: IssueRepeatViewModel[];
}

export default function TopIssueRepeats(props: TopIssueRepeatsProps) {
  const headerLabelId = `info_topRepeatedIssues`;

  // TODO
  // 1) Add a subtable beneath row on click
  //    > subtable will show each read history information
  // 2) Add a load more button beneath the table

  return (
    <section className={styles.topIssueRepeats}>
      <header className="header">
        <h2>Top Repeated Issues</h2>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader} aria-labelledby={headerLabelId}>
              <p id={headerLabelId} className="sr-only">
                Number
              </p>
              <span aria-hidden={true}>#</span>
            </th>
            <th className={classNames(styles.tableHeader, styles.lhs)}>
              Issue
            </th>
            <th className={styles.tableHeader}>Repeats</th>
            <th className={styles.tableHeader}>Last Read Date</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((x, i) => {
            const issueNumber = getFormattedIssueNumber({
              number: x.issueNumber,
              isAnnual: x.isAnnual
            });

            return (
              <tr key={x.issueId}>
                <td className={styles.tableCell} data-column-title="#">
                  {`${i + 1}`.padStart(2, '0')}
                </td>
                <td
                  className={classNames(styles.tableCell, styles.lhs)}
                  data-column-title="Issue"
                >
                  <div className={styles.text} data-tooltip={x.issueName}>
                    {x.titleName} {issueNumber}
                  </div>
                  <div className={styles.text}>
                    <span className={styles.date}>{x.issueCoverDate}</span>
                    {x.isAnnual && <span className="muted">(Annual)</span>}{' '}
                    {x.isOneShot && <span className="muted">(One Shot)</span>}
                  </div>
                </td>
                <td className={styles.tableCell} data-column-title="Repeats">
                  {x.instanceCount}
                </td>
                <td
                  className={styles.tableCell}
                  data-column-title="Last Read Date"
                >
                  {x.lastReadDate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
