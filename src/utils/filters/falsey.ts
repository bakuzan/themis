export default function filterFalsey<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return (
    value !== null && value !== undefined && value !== false && value !== 0
  );
}
