export enum WSActionTypes {
  'WS_OPEN_CONNECTION'= 'WS_OPEN_CONNECTION',
  'WS_FAILED_CONNECTION'= 'WS_FAILED_CONNECTION'
}

interface WSFailedConnection {
  type: WSActionTypes.WS_FAILED_CONNECTION;
}

interface WSOpenConnection {
  type: WSActionTypes.WS_OPEN_CONNECTION;
}

export type WS_MESSAGE = WSOpenConnection | WSFailedConnection;
