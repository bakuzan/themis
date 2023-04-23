import { IssueWithReadOrderInfoViewModel } from './Issue';

export interface ReadOrder {
  Id: number;
  Name: string;
}

export interface ReadOrderWithIssueCount extends ReadOrder {
  IssueCount: number;
}

export interface ReadOrderViewModel {
  id: number;
  name: string;
  issueCount: number | null;
}

export interface ReadOrderWithIssuesViewModel extends ReadOrderViewModel {
  issues: IssueWithReadOrderInfoViewModel[];
}
