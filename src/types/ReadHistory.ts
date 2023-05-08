export interface ReadHistory {
  Id: number;
  ReadOrderId: number;
  StartedOnDate: string;
  CompletedOnDate: string;
}

export interface ReadHistoryWithReadOrder extends ReadHistory {
  ReadOrderName: string;
}

export interface ReadHistoryViewModel {
  id: number;
  readOrderId: number;
  readOrderName: string;
  startedOnDate: string;
  completedOnDate: string | null;
  // TODO insert complete/remaining counts
}
