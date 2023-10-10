import { MonthIssueCountViewModel } from '@/types/Stats';

import groupBy from '@/utils/groupBy';
import sortBy from '@/utils/sortBy';

const pad = (n: number) => `${n}`.padStart(2, '0');

const monthNumbers = Array(12)
  .fill(0)
  .map((_, i) => i + 1);

export default function fillMissingMonths(
  monthCounts: MonthIssueCountViewModel[]
) {
  const years = groupBy(monthCounts, (x) => x.year);

  for (const [year, months] of Array.from(years.entries())) {
    const paddedMonths = monthNumbers
      .filter((n) => !months.some((m) => m.monthNumber === n))
      .map((monthNumber) => ({
        year,
        monthKey: `${year}-${pad(monthNumber)}`,
        monthNumber,
        count: 0
      }));

    years.set(
      year,
      sortBy([...months, ...paddedMonths], (x) => x.monthKey)
    );
  }

  return years;
}
