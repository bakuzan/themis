import { IssueWithTitleInfoViewModel } from './Issue';

export interface Collection {
  Id: number;
  Name: string;
  PublicationDate: string; // YYYY
  Number: number | null;
}

export interface CollectionWithIssueCount extends Collection {
  IssueCount: number;
}

export interface CollectionViewModel {
  id: number;
  name: string;
  publicationDate: number;
  number: number | null;
  issueCount: number | null;
}

export interface CollectionWithIssuesViewModel extends CollectionViewModel {
  issues: IssueWithTitleInfoViewModel[];
}
