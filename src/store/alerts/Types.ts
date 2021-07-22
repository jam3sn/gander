export interface IAlertsState {
  alerts: IAlert[];
}

export interface IAlert {
  id: number;
  title: string;
  body: string;
  type: AlertType;
  timeout: AlertTimeout;
  activeTimeout?: number;
}

export enum AlertType {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

export enum AlertTimeout {
  SHORT = '5000', // 5 Seconds
  MEDIUM = '10000', // 10 Seconds
  LONG = '30000', // 30 Seconds
  NONE = 'NONE', // Until user dismisses
}
