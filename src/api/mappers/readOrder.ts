import {
  ReadOrder,
  ReadOrderViewModel,
  ReadOrderWithIssueCount,
  ReadOrderWithIssuesViewModel
} from '@/types/ReadOrder';

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
  issues: any[] // TODO interfaces or something...
): ReadOrderWithIssuesViewModel {
  return {
    id: readOrder.Id,
    name: readOrder.Name,
    issueCount: issues.length,
    issues: [] //issues.map(toIssueViewModel)
  };
}
