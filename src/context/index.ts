import * as React from 'react';

import { AlertAction } from '@/types/Alert';

interface AppContextProps {
  dispatch: React.Dispatch<AlertAction>;
}

export const AppContext = React.createContext({
  dispatch: () => null
} as AppContextProps);
