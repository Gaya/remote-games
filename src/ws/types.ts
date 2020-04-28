export enum WSActionTypes {
  'WS_OPEN_CONNECTION'= 'WS_OPEN_CONNECTION'
}

interface WSOpenConnection {
  type: WSActionTypes.WS_OPEN_CONNECTION;
}

export type WS_MESSAGE = WSOpenConnection;
