import { IssueViewModel } from './Issue';

export interface Title {
  Id: number;
  Name: string;
  StartYear: string; // YYYY
  IsOneShot: number; // boolean 0 or 1
}

export interface TitleWithIssueCount extends Title {
  IssueCount: number;
}

export interface TitleViewModel {
  id: number;
  name: string;
  startYear: number;
  isOneShot: boolean;
  issueCount: number | null;
}

export interface TitleWithIssuesViewModel extends TitleViewModel {
  issues: IssueViewModel[];
}
