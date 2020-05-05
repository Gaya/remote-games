import { User } from '../components/App/store/types';

export enum WSActionTypes {
  'WS_OPEN_CONNECTION'= 'WS_OPEN_CONNECTION',
  'WS_CLOSE_CONNECTION'= 'WS_CLOSE_CONNECTION',
  'WS_FAILED_CONNECTION'= 'WS_FAILED_CONNECTION',
  'WS_CREATE_ROOM'= 'WS_CREATE_ROOM',
  'WS_CREATE_ROOM_FAILED'= 'WS_CREATE_ROOM_FAILED',
  'WS_CREATED_ROOM'= 'WS_CREATED_ROOM',
  'WS_JOIN_ROOM'= 'WS_JOIN_ROOM',
  'WS_JOIN_ROOM_FAILED'= 'WS_JOIN_ROOM_FAILED',
  'WS_JOINED_ROOM'= 'WS_JOINED_ROOM',
  'WS_USER_JOINED_ROOM'= 'WS_USER_JOINED_ROOM',
  'WS_USER_LEFT_ROOM'= 'WS_USER_LEFT_ROOM',
  'WS_LEAVE_ROOM'= 'WS_LEAVE_ROOM',
  'WS_UPDATE_NICKNAME'= 'WS_UPDATE_NICKNAME',
  'WS_UPDATED_NICKNAME'= 'WS_UPDATED_NICKNAME',
  'WS_REQUEST_NICKNAME'= 'WS_REQUEST_NICKNAME',
}

interface WSCloseConnection {
  type: WSActionTypes.WS_CLOSE_CONNECTION;
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
  users: User[];
}

export interface WSUserJoinedRoom {
  type: WSActionTypes.WS_USER_JOINED_ROOM;
  id: string;
  user: User;
}

export interface WSUserLeftRoom {
  type: WSActionTypes.WS_USER_LEFT_ROOM;
  id: string;
  userId: string;
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

interface WSRequestNickname {
  type: WSActionTypes.WS_REQUEST_NICKNAME;
}

export type WS_MESSAGE = WSOpenConnection | WSFailedConnection | WSCreateRoom | WSCreatedRoom
  | WSCreateRoomFailed | WSLeaveRoom | WSJoinRoom | WSJoinedRoom | WSJoinRoomFailed
  | WSUpdateNickname | WSUpdatedNickname | WSCloseConnection | WSRequestNickname | WSUserJoinedRoom
  | WSUserLeftRoom;
