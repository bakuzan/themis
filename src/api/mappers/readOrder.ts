import { IssueWithReadOrderInfo } from '@/types/Issue';
import {
  ReadOrder,
  ReadOrderViewModel,
  ReadOrderWithIssueCount,
  ReadOrderWithIssuesViewModel
} from '@/types/ReadOrder';
import { toIssueWithReadOrderInfoViewModel } from './issue';

export function toReadOrderViewModel(
  readOrder: ReadOrder | ReadOrderWithIssueCount
): ReadOrderViewModel {
  return {
    id: readOrder.Id,
    name: readOrder.Name,
    issueCount: 'IssueCount' in readOrder ? readOrder.IssueCount : null
  };
}

export function toReadOrderWithIssuesViewModel(
  readOrder: ReadOrder,
  issues: IssueWithReadOrderInfo[]
): ReadOrderWithIssuesViewModel {
  return {
    id: readOrder.Id,
    name: readOrder.Name,
    issueCount: issues.length,
    issues: issues.map(toIssueWithReadOrderInfoViewModel)
  };
}
