/* ReadHistoryIssue */
export interface ReadHistoryIssue {
  ReadHistoryId: number;
  ReadOnDate: string | null;
  // Related details collection/title/issue
  ReadOrderId: number;
  SortOrder: number;
  CollectionId: number;
  CollectionName: string;
  CollectionNumber: number | null;
  PublicationDate: string; // YYYY
  TitleId: number;
  TitleName: string;
  StartYear: string; // YYYY
  IsOneShot: number; // boolean 1 or 0
  IssueId: number;
  Number: number;
  Name: string;
  IsAnnual: number; // boolean 1 or 0
  CoverDate: string; // YYYY-DD
}

export interface ReadHistoryIssueInfoViewModel {
  readHistoryId: number;
  readOnDate: string | null;
  // Related details collection/title/issue
  readOrderId: number;
  sortOrder: number;
  collectionId: number;
  collectionName: string;
  collectionNumber: number | null;
  publicationDate: number; // YYYY
  titleId: number;
  titleName: string;
  startYear: number; // YYYY
  isOneShot: boolean;
  issueId: number;
  number: number;
  name: string;
  isAnnual: boolean;
  coverDate: string; // YYYY-DD
  // Derived
  isRepeatedIssue: boolean;
  issueInstanceIndex: number;
}

export interface ToggleReadHistoryIssueRequest {
  ReadHistoryId: number;
  CollectionId: number | null;
  IssueId: number;
}
