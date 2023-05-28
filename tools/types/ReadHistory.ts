export interface ReadHistory {
  ReadOrderId: number;
  StartedOnDate: string;
  CompletedOnDate: string | null;
}

export interface ReadHistoryIssue {
  CollectionId: number | null;
  IssueId: number;
  SortOrder: number;
  ReadOnDate: string | null;
}

export interface ReadHistoryIssueWithId extends ReadHistoryIssue {
  ReadHistoryId: number;
}
