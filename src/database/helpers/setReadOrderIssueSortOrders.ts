import { CollectionIssue } from '@/types/CollectionIssue';
import { ReadOrderIssue } from '@/types/ReadOrderIssue';

import { SORT_ORDER_INCREMENT } from '@/constants';

/**
 * Will loop through the read order items and mirror the order of
 * the issues in the pattern list onto them.
 * @param pattern {CollectionIssue[]}
 * @param items {ReadOrderIssue[]}
 */
export default function setReadOrderIssueSortOrders(
  pattern: CollectionIssue[],
  items: ReadOrderIssue[]
) {
  const readOrderIds = Array.from(new Set(items.map((x) => x.ReadOrderId)));

  for (const readOrderId of readOrderIds) {
    const roIssues = items.filter((x) => x.ReadOrderId === readOrderId);
    const initialSortOrder = Math.min(...roIssues.map((x) => x.SortOrder));

    let offset = 0;

    for (const pat of pattern) {
      const roi = roIssues.find(
        (x) => x.CollectionId === pat.CollectionId && x.IssueId === pat.IssueId
      );

      if (!roi) {
        throw new Error(
          `Impossible Error: Read Order Issue was not found for Collection-Issue pair.
          (CollectionId: ${pat.CollectionId}, IssueId: ${pat.IssueId})`
        );
      }

      roi.SortOrder = initialSortOrder + offset;
      offset += SORT_ORDER_INCREMENT;
    }
  }
}
