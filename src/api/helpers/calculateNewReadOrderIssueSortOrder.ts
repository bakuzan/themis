import db from '@/api/database';
import getStoredProceedure from '@/api/database/storedProceedures';

import {
  AddReadOrderIssuesRequest,
  ReadOrderIssue
} from '@/types/ReadOrderIssue';

import { SORT_ORDER_INCREMENT } from '@/constants';
import setIssueSortOrders from './setIssueSortOrders';

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
    const nextSortOrder = setIssueSortOrders(newItems, firstSortOrder);

    // Update old item order to occur after new ones.
    setIssueSortOrders(readOrderIssues, nextSortOrder);

    return readOrderIssues;
  } else {
    const lastIssueQuery = getStoredProceedure('GetLastIssueInReadOrder');
    const lastReadOrderIssue = db
      .prepare(lastIssueQuery)
      .get(data.ReadOrderId) as ReadOrderIssue;

    setIssueSortOrders(
      newItems,
      lastReadOrderIssue.SortOrder + SORT_ORDER_INCREMENT
    );

    return [];
  }
}
