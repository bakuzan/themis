const MS_DAY = 60 * 60 * 24 * 1000;
const MONTH_DAYS = 30.436875;

function daysDifferenceBetweenDates(d1: string, d2: string | null) {
  const a = new Date(d1).getTime();
  const b = (d2 ? new Date(d2) : new Date()).getTime();

  return Math.floor(b - a) / MS_DAY + 1; // Inclusive
}

function getFormatedStringFromDays(numberOfDays: number) {
  const years = Math.floor(numberOfDays / 365);
  const months = Math.floor((numberOfDays % 365) / MONTH_DAYS);
  const days = Math.floor((numberOfDays % 365) % MONTH_DAYS);

  const yearsDisplay = years
    ? years + (years == 1 ? ' year, ' : ' years, ')
    : '';
  const monthsDisplay = months
    ? months + (months == 1 ? ' month, ' : ' months, ')
    : '';

  const daysDisplay = days ? days + (days == 1 ? ' day' : ' days') : '';

  return `${yearsDisplay}${monthsDisplay}${daysDisplay}`;
}

export default function getDifferenceBetweenDates(
  date1: string,
  date2: string | null
) {
  const daysDiff = daysDifferenceBetweenDates(date1, date2);
  const daysDiffExact = Math.floor(daysDiff);

  return {
    text: `(${daysDiffExact} day${daysDiffExact === 1 ? '' : 's'})`,
    details: getFormatedStringFromDays(daysDiff)
  };
}
