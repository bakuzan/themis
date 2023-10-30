import { monthNumberToNames } from '@/constants/date';

export default function getDateKeyAsText(monthOrYearKey: string) {
  const [year, month] = monthOrYearKey.split('-');
  if (!month) {
    return year;
  }

  const monthName = monthNumberToNames.get(Number(month));
  return `${monthName?.long} ${year}`;
}
