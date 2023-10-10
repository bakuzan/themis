import { MonthName } from './MonthName';

// Database Models
export interface MonthIssueCount {
  ReadInMonth: string;
  IssueCount: number;
}

export interface IssueRepeat {
  ReadHistoryIds: string;
  CollectionIds: string;
  IssueId: number;
  InstanceCount: number;
  LastReadDate: string;
  IssueNumber: number;
  IsAnnual: number;
  IssueName: string;
  IssueCoverDate: string;
  TitleId: number;
  TitleName: string;
  TitleStartYear: string;
  IsOneShot: number;
}

// View Models
export interface MonthIssueCountViewModel {
  year: number;
  monthKey: string;
  monthNumber: number;
  count: number;
}

export interface IssueRepeatViewModel {
  readHistoryIds: number[]; // TODO make read history items
  collectionIds: number[]; // TODO make collection items
  issueId: number;
  instanceCount: number;
  lastReadDate: string;
  issueNumber: number;
  isAnnual: boolean;
  issueName: string;
  issueCoverDate: string;
  titleId: number;
  titleName: string;
  titleStartYear: number;
  isOneShot: boolean;
}
