export interface Issue {
  Id: number;
  Number: number;
  TitleId: number;
  IsAnnual: number; // boolean, 1 or 0
  Name: string;
  CoverDate: string; // YYYY-DD
}

export interface IssueWithTitleInfo {
  Id: number;
  Number: number;
  TitleId: number;
  IsAnnual: number; // boolean, 1 or 0
  Name: string;
  CoverDate: string; // YYYY-DD
  // Title Info
  TitleName: string;
  StartYear: string;
  IsOneShot: number; // boolean, 1 or 0
}

export interface IssueWithReadOrderInfo {
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

/* View Models */
export interface IssueViewModel {
  id: number;
  number: number;
  titleId: number;
  isAnnual: boolean;
  name: string;
  coverDate: string;
}

export interface IssueWithTitleInfoViewModel extends IssueViewModel {
  titleName: string;
  startYear: number;
  isOneShot: boolean;
}

export interface IssueWithReadOrderInfoViewModel {
  readOrderId: number;
  sortOrder: number;
  collectionId: number;
  collectionName: string;
  collectionNumber: number | null;
  publicationDate: number;
  titleId: number;
  titleName: string;
  startYear: number;
  isOneShot: boolean;
  issueId: number;
  number: number;
  name: string;
  isAnnual: boolean;
  coverDate: string;
}
