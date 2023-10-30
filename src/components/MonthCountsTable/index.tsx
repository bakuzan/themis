import { useState } from 'react';

import { MonthIssueCountViewModel } from '@/types/Stats';

import { monthNumberToNames } from '@/constants/date';
import classNames from '@/utils/classNames';

import styles from './index.module.css';

const monthNames = Array.from(monthNumberToNames.values());

interface MonthCountsTableProps {
  data: [number, MonthIssueCountViewModel[]][];
  onSelect: (key: string) => void;
}

export default function MonthCountsTable(props: MonthCountsTableProps) {
  const [today] = useState(new Date());
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const maxMonthCount = Math.max(
    ...props.data.flatMap(([_, months]) => months.map((m) => m.count))
  );

  return (
    <section className={styles.monthCounts}>
      <table className={styles.table} cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th className={styles.tableHeader}></th>
            {monthNames.map((names) => (
              <th key={names.short} className={styles.tableHeader}>
                {names.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map(([year, months]) => {
            const yearLabelId = `info_${year}`;
            const yearCount = months.reduce((p, c) => p + c.count, 0);

            const isFuture = currentYear < year;
            const isCurrent = currentYear === year;
            const tense = isCurrent ? 'have been' : 'were';
            const yearLabel = !isFuture
              ? `In ${year}, ${yearCount} comics ${tense} read.`
              : `${year} is in the future, therefore no comics have been read yet.`;

            return (
              <tr key={year}>
                <th
                  data-tooltip={yearLabel}
                  aria-labelledby={yearLabelId}
                  className={classNames(styles.tableHeader, 'tooltip-right')}
                >
                  <p id={yearLabelId} className="sr-only">
                    {yearLabel}
                  </p>
                  <button
                    className={styles.tableCellButton}
                    disabled={yearCount === 0}
                    onClick={() => props.onSelect(`${year}`)}
                  >
                    {year}
                  </button>
                </th>
                {months.map((m, i) => {
                  const isLast = i === 11; // Last month index
                  const monthLabelId = `info_${m.monthKey}`;
                  const monthNames = monthNumberToNames.get(m.monthNumber);
                  const monthIndex = m.monthNumber - 1;
                  const isFuture =
                    currentYear < year ||
                    (currentYear === year && currentMonth < monthIndex);
                  const isCurrent =
                    currentYear === year && currentMonth === monthIndex;

                  const tense = isCurrent ? 'have been' : 'were';
                  const label = !isFuture
                    ? `In ${monthNames?.long} ${year}, ${m.count} comics ${tense} read.`
                    : `${monthNames?.long} ${year} is in the future, therefore no comics have been read yet.`;

                  const isDisabled = m.count === 0;

                  return (
                    <td
                      key={m.monthKey}
                      data-column-title={monthNames?.short}
                      aria-labelledby={monthLabelId}
                      className={classNames(styles.tableCell)}
                    >
                      <p id={monthLabelId} className="sr-only">
                        {label}
                      </p>
                      <button
                        className={styles.tableCellButton}
                        disabled={isDisabled}
                        onClick={() => props.onSelect(m.monthKey)}
                      >
                        <div
                          className={classNames(
                            styles.tableCellInner,
                            isLast && 'tooltip-left'
                          )}
                          data-tooltip={label}
                        >
                          <div
                            className={styles.tableCellContents}
                            style={{ opacity: m.count / maxMonthCount }}
                          ></div>
                        </div>
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
