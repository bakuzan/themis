export interface ReadHistory {
  ReadOrderId: number;
  StartedOnDate: string;
  CompletedOnDate: string | null;
}

export interface ReadHistoryIssue {
  ReadHistoryId: number | null;
  CollectionId: number | null;
  IssueId: number;
  SortOrder: number;
  ReadOnDate: string | null;
}
