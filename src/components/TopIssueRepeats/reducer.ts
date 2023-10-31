import { IssueRepeatDetailViewModel } from '@/types/Stats';

export enum TopIssueRepeatActionType {
  LOAD_REPEATS
}

type TopIssueRepeatAction = {
  type: TopIssueRepeatActionType.LOAD_REPEATS;
  key: number;
  data: IssueRepeatDetailViewModel[];
};

interface TopIssueRepeatsState {
  repeats: Map<number, IssueRepeatDetailViewModel[]>;
}

export function reducer(
  state: TopIssueRepeatsState,
  action: TopIssueRepeatAction
) {
  switch (action.type) {
    case TopIssueRepeatActionType.LOAD_REPEATS:
      const repeats = state.repeats;

      return {
        ...state,
        repeats: repeats.set(action.key, action.data)
      };
    default:
      return { ...state };
  }
}
