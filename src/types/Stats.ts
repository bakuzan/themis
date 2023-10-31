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

export interface IssueReadDetailInfo {
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
  // Read Info
  ReadOnDate: string;
}

export interface IssueRepeatDetailItem {
  // Read Info
  ReadHistoryId: number;
  ReadOrderName: string;
  ReadOnDate: string;
  // Collection Info
  CollectionId: number;
  CollectionName: string;
  CollectionNumber: number;
  PublicationDate: string;
  // Issue Info
  IssueId: number;
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

export interface IssueReadDetailViewModel {
  issueId: number;
  readOnDate: string;
  issueNumber: number;
  isAnnual: boolean;
  issueName: string;
  issueCoverDate: string;
  titleId: number;
  titleName: string;
  titleStartYear: number;
  isOneShot: boolean;
}

export interface IssueRepeatDetailViewModel {
  readHistoryId: number;
  readOrderName: string;
  readOnDate: string;
  collectionId: number;
  collectionName: string;
  collectionNumber: number;
  publicationDate: number;
  issueId: number;
}
