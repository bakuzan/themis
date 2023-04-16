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
