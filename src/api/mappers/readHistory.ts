import {
  ReadHistoryWithReadOrder,
  ReadHistoryViewModel
} from '@/types/ReadHistory';

export function toReadHistoryViewModel(
  history: ReadHistoryWithReadOrder
): ReadHistoryViewModel {
  return {
    id: history.Id,
    readOrderId: history.ReadOrderId,
    readOrderName: history.ReadOrderName,
    startedOnDate: history.StartedOnDate,
    completedOnDate: history.CompletedOnDate
    // TODO add counts...
  };
}
