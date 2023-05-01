import { ReOrderDirection } from '@/constants/ReOrderDirection';
import {
  ReOrderReadOrderIssuesRequest,
  ReadOrderIssue
} from '@/types/ReadOrderIssue';

export default function reOrderIssuesList(
  data: ReOrderReadOrderIssuesRequest,
  issues: ReadOrderIssue[]
) {
  const targets = issues.filter(
    (x) => x.CollectionId === data.CollectionId || x.IssueId === data.IssueId
  );

  const others = issues.filter(
    (x) =>
      (data.CollectionId && x.CollectionId !== data.CollectionId) ||
      (data.IssueId && x.IssueId !== data.IssueId)
  );

  return data.Direction === ReOrderDirection.UP
    ? [...targets, ...others]
    : [...others, ...targets];
}
