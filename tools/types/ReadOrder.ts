export interface ReadOrder {
  Id: number;
  Name: string;
}

export interface ReadOrderIssue {
  ReadOrderId: number;
  CollectionId: number | null;
  IssueId: number;
  SortOrder: number;
  CollectionName?: string;
  CollectionNumber?: number;
  IssueName: string;
}
