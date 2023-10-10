export default function sortBy<T>(arr: T[], fn: (item: T) => any, asc = true) {
  const dir = asc ? 1 : -1;

  return arr.sort((a, b) => {
    const bv = fn(b);
    const av = fn(a);

    return bv > av ? -1 * dir : bv < av ? 1 * dir : 0;
  });
}
