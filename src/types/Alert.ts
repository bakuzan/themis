export type AlertAction =
  | { type: 'ON_ERROR'; messages: string[] }
  | { type: 'CLEAR_ALERT'; key: string };

export enum AlertType {
  error = 'error',
  info = 'info'
}

export interface Alert {
  key: string;
  type: AlertType;
  message: string;
}
