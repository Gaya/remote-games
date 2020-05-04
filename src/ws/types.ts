export enum WSActionTypes {
  'WS_OPEN_CONNECTION'= 'WS_OPEN_CONNECTION',
  'WS_FAILED_CONNECTION'= 'WS_FAILED_CONNECTION',
  'WS_CREATE_ROOM'= 'WS_CREATE_ROOM',
  'WS_CREATE_ROOM_FAILED'= 'WS_CREATE_ROOM_FAILED',
  'WS_CREATED_ROOM'= 'WS_CREATED_ROOM',
  'WS_JOIN_ROOM'= 'WS_JOIN_ROOM',
  'WS_JOIN_ROOM_FAILED'= 'WS_JOIN_ROOM_FAILED',
  'WS_JOINED_ROOM'= 'WS_JOINED_ROOM',
  'WS_LEAVE_ROOM'= 'WS_LEAVE_ROOM',
  'WS_UPDATE_NICKNAME'= 'WS_UPDATE_NICKNAME',
  'WS_UPDATED_NICKNAME'= 'WS_UPDATED_NICKNAME',
}

interface WSFailedConnection {
  type: WSActionTypes.WS_FAILED_CONNECTION;
}

export interface WSOpenConnection {
  type: WSActionTypes.WS_OPEN_CONNECTION;
  id: string;
  nickname: string;
}

interface WSCreateRoom {
  type: WSActionTypes.WS_CREATE_ROOM;
}

export interface WSCreatedRoom {
  type: WSActionTypes.WS_CREATED_ROOM;
  id: string;
}

interface WSCreateRoomFailed {
  type: WSActionTypes.WS_CREATE_ROOM_FAILED;
}

interface WSLeaveRoom {
  type: WSActionTypes.WS_LEAVE_ROOM;
}

export interface WSJoinRoom {
  type: WSActionTypes.WS_JOIN_ROOM;
  id: string;
}

export interface WSJoinedRoom {
  type: WSActionTypes.WS_JOINED_ROOM;
  id: string;
  users: string[];
}

interface WSJoinRoomFailed {
  type: WSActionTypes.WS_JOIN_ROOM_FAILED;
  error: string;
}

interface WSUpdateNickname {
  type: WSActionTypes.WS_UPDATE_NICKNAME;
  nickname: string;
}

interface WSUpdatedNickname {
  type: WSActionTypes.WS_UPDATED_NICKNAME;
  id: string;
  nickname: string;
}

export type WS_MESSAGE = WSOpenConnection | WSFailedConnection | WSCreateRoom | WSCreatedRoom
  | WSCreateRoomFailed | WSLeaveRoom | WSJoinRoom | WSJoinedRoom | WSJoinRoomFailed
  | WSUpdateNickname | WSUpdatedNickname;
