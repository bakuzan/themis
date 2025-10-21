'use client';
import { useReducer } from 'react';

import { AppContext } from '@/context';
import { Alert, AlertAction, AlertType } from '@/types/Alert';

import AlertBox from '@/components/AlertBox';

interface AppState {
  alerts: Alert[];
}

function reducer(state: AppState, action: AlertAction): AppState {
  const alertCount = state.alerts.length;

  switch (action.type) {
    case 'CLEAR_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter((x) => x.key !== action.key)
      };
    case 'ON_ERROR':
      return {
        ...state,
        alerts: [
          ...state.alerts,
          ...action.messages.map((message, idx) => ({
            key: `error_${alertCount + idx}`,
            type: AlertType.error,
            message
          }))
        ]
      };
    default:
      return { ...state };
  }
}

const DEFAULT_STATE: AppState = {
  alerts: []
};

export default function AppAlertWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <AppContext.Provider value={{ dispatch }}>
      <AlertBox
        items={state.alerts}
        onClear={(key) => dispatch({ type: 'CLEAR_ALERT', key })}
      />
      {children}
    </AppContext.Provider>
  );
}
