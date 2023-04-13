export interface Issue {
  Id: number;
  Number: number;
  TitleId: number;
  IsAnnual: number; // boolean, 1 or 0
  Name: string;
  CoverDate: string; // YYYY-DD
}

export interface IssueViewModel {
  id: number;
  number: number;
  titleId: number;
  isAnnual: boolean;
  name: string;
  coverDate: string;
}
