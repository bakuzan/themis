import { SORT_ORDER_INCREMENT } from '@/constants';

type SortableRecord = { SortOrder: number };

/**
 * Will loop through the items giving them equally spaced sort order values.
 * The first item will be assigned the initialSortOrder value.
 * @param items
 * @param initialSortOrder
 * @returns nextSortOrder
 */
export default function setIssueSortOrders(
  items: SortableRecord[],
  initialSortOrder: number
) {
  let offset = 0;

  for (const roi of items) {
    roi.SortOrder = initialSortOrder + offset;
    offset += SORT_ORDER_INCREMENT;
  }

  // Return next sort order...
  return initialSortOrder + offset;
}
