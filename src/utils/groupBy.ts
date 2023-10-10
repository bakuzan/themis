export default function groupBy<T, V>(list: T[], keyGetter: (x: T) => V) {
  const map = new Map<V, T[]>();

  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);

    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return map;
}
