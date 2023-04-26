export interface ReadOrderIssue {
  ReadOrderId: number;
  CollectionId: number | null;
  IssueId: number;
  SortOrder: number;
}

export interface ReadOrderIssueViewModel {
  readOrderId: number;
  collectionId?: number | null;
  issueId?: number;
  sortOrder?: number;
}

export interface ReadOrderIssuesRequest {
  ReadOrderId: number;
  CollectionId: number | null;
  IssueId: number | null;
}

export interface AddReadOrderIssuesRequest extends ReadOrderIssuesRequest {
  BeforeReadOrderIssue?: {
    CollectionId: number | null;
    IssueId: number;
  };
}

export interface RemoveReadOrderIssuesRequest extends ReadOrderIssuesRequest {}
