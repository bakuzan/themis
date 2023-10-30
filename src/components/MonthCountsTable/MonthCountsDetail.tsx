import { useEffect, useState } from 'react';

import { IssueReadDetailViewModel } from '@/types/Stats';

import classNames from '@/utils/classNames';
import getFormattedIssueNumber from '@/utils/getFormattedIssueNumber';
import getDateKeyAsText from '@/utils/getDateKeyAsText';

import styles from './MonthCountsDetail.module.css';
import callApi from '@/utils/callApi';

interface MonthCountsDetailProps {
  filterKey: string | null;
}

export default function MonthCountsDetail({
  filterKey,
  ...props
}: MonthCountsDetailProps) {
  const [data, setData] = useState<IssueReadDetailViewModel[]>([]);
  const headerLabelId = `info_detailIssues`;

  useEffect(() => {
    async function fetchMonthCountsDetail() {
      const response = await callApi<IssueReadDetailViewModel[]>(
        `/api/stats/monthCountDetail/${filterKey}`
      );

      setData(response);
    }

    if (filterKey) {
      fetchMonthCountsDetail();
    }
  }, [filterKey]);

  if (!filterKey) {
    return null;
  }

  const keyAsText = getDateKeyAsText(filterKey);

  return (
    <section className={styles.monthCountDetail}>
      <header className="header wrapped">
        <h2>Issues Completed {keyAsText}</h2>
        <p className="muted">{data.length} issues</p>
      </header>
      <table className={styles.table} cellPadding="0" cellSpacing="0">
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
            <th className={styles.tableHeader}>Read Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((x, i) => {
            const issueNumber = getFormattedIssueNumber({
              number: x.issueNumber,
              isAnnual: x.isAnnual
            });

            return (
              <tr key={`${x.issueId}_${x.readOnDate}`}>
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
                <td className={styles.tableCell} data-column-title="Read Date">
                  {x.readOnDate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
