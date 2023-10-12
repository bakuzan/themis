import { useState } from 'react';

import { MonthIssueCountViewModel } from '@/types/Stats';

import { monthNumberToNames } from '@/constants/date';

import styles from './index.module.css';

const monthNames = Array.from(monthNumberToNames.values());

interface MonthCountsTableProps {
  data: [number, MonthIssueCountViewModel[]][];
}

export default function MonthCountsTable(props: MonthCountsTableProps) {
  const [today] = useState(new Date());
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const maxMonthCount = Math.max(
    ...props.data.flatMap(([_, months]) => months.map((m) => m.count))
  );

  return (
    <table className={styles.table}>
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
        {props.data.map(([year, months]) => (
          <tr>
            <th className={styles.tableHeader}>{year}</th>
            {months.map((m) => {
              const monthLabelId = `info_${m.monthKey}`;
              const monthNames = monthNumberToNames.get(m.monthNumber);
              const monthIndex = m.monthNumber - 1;
              const isFuture =
                currentYear > year ||
                (currentYear === year && currentMonth > monthIndex);
              const isCurrent =
                currentYear === year && currentMonth === monthIndex;

              const tense = isCurrent ? 'have been' : 'were';
              const label = !isFuture
                ? `In ${monthNames?.long} ${year} ${m.count} comics ${tense} read.`
                : `${monthNames?.long} ${year} is in the future, therefore no comics have been read.`;

              return (
                <td
                  key={m.monthKey}
                  title={label} // TODO make the title a tooltip instead
                  aria-labelledby={monthLabelId}
                  className={styles.tableCell}
                  style={{ opacity: m.count / maxMonthCount }}
                >
                  <p id={monthLabelId} className="sr-only">
                    {label}
                  </p>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
