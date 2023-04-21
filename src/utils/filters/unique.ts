export default function unique<T>(prop: keyof T) {
  return (value: T, index: number, array: T[]) =>
    array.findIndex((a) => a[prop] === value[prop]) === index;
}
