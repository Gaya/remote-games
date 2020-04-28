export enum WSActionTypes {
  'WS_OPEN_CONNECTION'= 'WS_OPEN_CONNECTION',
  'WS_FAILED_CONNECTION'= 'WS_FAILED_CONNECTION',
  'WS_CREATE_ROOM'= 'WS_CREATE_ROOM',
  'WS_CREATE_ROOM_FAILED'= 'WS_CREATE_ROOM_FAILED',
  'WS_CREATED_ROOM'= 'WS_CREATED_ROOM',
}

interface WSFailedConnection {
  type: WSActionTypes.WS_FAILED_CONNECTION;
}

interface WSOpenConnection {
  type: WSActionTypes.WS_OPEN_CONNECTION;
}

interface WSCreateRoom {
  type: WSActionTypes.WS_CREATE_ROOM;
}

interface WSCreatedRoom {
  type: WSActionTypes.WS_CREATED_ROOM;
  id: string;
}

interface WSCreateRoomFailed {
  type: WSActionTypes.WS_CREATE_ROOM_FAILED;
}

export type WS_MESSAGE = WSOpenConnection | WSFailedConnection | WSCreateRoom | WSCreatedRoom | WSCreateRoomFailed;
