import { TitleViewModel } from '@/types/Title';

export function filterTitles(searchStringLower: string) {
  return (x: TitleViewModel) =>
    x.name.toLowerCase().includes(searchStringLower) ||
    `${x.startYear}`.includes(searchStringLower);
}
