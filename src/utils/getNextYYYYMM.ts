export default function getNextYYYYMM(yyyymm: string) {
  if (!yyyymm) {
    return yyyymm;
  }

  const [year, month] = yyyymm.split('-');
  let y = Number(year);
  let m = Number(month);

  m += 1;
  if (m > 12) {
    m = 1;
    y += 1;
  }

  return `${y}-${`${m}`.padStart(2, '0')}`;
}
