export interface ReadOrderIssue {
  ReadOrderId: number;
  CollectionId: number;
  IssueId: number;
  SortOrder: number;
}

export interface ReadOrderIssueViewModel {
  readOrderId: number;
  collectionId?: number;
  issueId?: number;
  sortOrder?: number;
}
