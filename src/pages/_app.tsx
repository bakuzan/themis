import '@/styles/globals.css';
import { useReducer } from 'react';
import type { AppProps } from 'next/app';

import { Alert, AlertAction, AlertType } from '@/types/Alert';
import { AppContext } from '@/context';

import Layout from './layout';
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

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <Layout>
      <AppContext.Provider value={{ dispatch }}>
        <AlertBox
          items={state.alerts}
          onClear={(key) => dispatch({ type: 'CLEAR_ALERT', key })}
        />
        <Component {...pageProps} />
      </AppContext.Provider>
    </Layout>
  );
}
