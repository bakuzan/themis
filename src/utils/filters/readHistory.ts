import { ReadHistoryViewModel } from '@/types/ReadHistory';

export function filterReadHistory(searchStringLower: string) {
  return (x: ReadHistoryViewModel) =>
    x.readOrderName.toLowerCase().includes(searchStringLower) ||
    x.startedOnDate.includes(searchStringLower);
}
