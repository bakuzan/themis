export interface ReadHistory {
  Id: number;
  ReadOrderId: number;
  StartedOnDate: string;
  CompletedOnDate: string;
}

export interface ReadHistoryWithReadOrder extends ReadHistory {
  ReadOrderName: string;
}

export interface ReadHistoryWithCounts extends ReadHistoryWithReadOrder {
  ReadIssueCount: number;
  TotalIssueCount: number;
}

export interface ReadHistoryViewModel {
  id: number;
  readOrderId: number;
  readOrderName: string;
  startedOnDate: string;
  completedOnDate: string | null;
}

export interface ReadHistoryWithCountsViewModel extends ReadHistoryViewModel {
  readIssueCount: number;
  totalIssueCount: number;
}
