import { ReOrderDirection } from '@/constants/ReOrderDirection';

export interface CollectionIssue {
  CollectionId: number;
  IssueId: number;
  SortOrder: number;
}

export interface CollectionIssueViewModel {
  collectionId: number;
  issueId: number;
  sortOrder: number;
}

export interface ReOrderCollectionIssuesRequest {
  ReadOrderId: number;
  CollectionId: number;
  IssueId: number;
  Direction: ReOrderDirection;
}
