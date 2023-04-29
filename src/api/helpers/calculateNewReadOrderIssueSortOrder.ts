import db from '@/api/database';
import getStoredProceedure from '@/api/database/storedProceedures';

import {
  AddReadOrderIssuesRequest,
  ReadOrderIssue
} from '@/types/ReadOrderIssue';

import { SORT_ORDER_INCREMENT } from '@/constants';

/**
 * Will loop through the items giving them equally spaced sort order values.
 * The first item will be assigned the initialSortOrder value.
 * @param items
 * @param initialSortOrder
 * @returns nextSortOrder
 */
function incrementItems(items: ReadOrderIssue[], initialSortOrder: number) {
  let offset = 0;

  for (const roi of items) {
    roi.SortOrder = initialSortOrder + offset;
    offset += SORT_ORDER_INCREMENT;
  }

  // Return next sort order...
  return initialSortOrder + offset;
}

/**
 * Will set the required SortOrder values for the newItems.
 * Returns any existing items that need updating.
 * @param data
 * @param newItems
 * @returns updateItems
 */
export default function calculateNewReadOrderIssueSortOrder(
  data: AddReadOrderIssuesRequest,
  newItems: ReadOrderIssue[]
) {
  if (data.BeforeReadOrderIssue) {
    const targetIssuePlusQuery = getStoredProceedure(
      'GetIssuesAfterTargetInReadOrder'
    );

    const targetParams = {
      ...data.BeforeReadOrderIssue,
      ReadOrderId: data.ReadOrderId
    };

    const readOrderIssues = db
      .prepare(targetIssuePlusQuery)
      .all(targetParams) as ReadOrderIssue[];

    // Set new items orders to replace the current ones.
    const firstSortOrder = readOrderIssues[0].SortOrder;
    const nextSortOrder = incrementItems(newItems, firstSortOrder);

    // Update old item order to occur after new ones.
    incrementItems(readOrderIssues, nextSortOrder);

    return readOrderIssues;
  } else {
    const lastIssueQuery = getStoredProceedure('GetLastIssueInReadOrder');
    const lastReadOrderIssue = db
      .prepare(lastIssueQuery)
      .get(data.ReadOrderId) as ReadOrderIssue;

    incrementItems(
      newItems,
      lastReadOrderIssue.SortOrder + SORT_ORDER_INCREMENT
    );

    return [];
  }
}
