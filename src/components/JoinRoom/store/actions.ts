export enum RoomActionType {
  'RESET' = 'RESET',
  'CREATE_ROOM' = 'CREATE_ROOM',
  'CREATE_ROOM_FAILED' = 'CREATE_ROOM_FAILED',
  'JOIN_ROOM' = 'JOIN_ROOM',
  'JOIN_ROOM_FAILED' = 'JOIN_ROOM_FAILED',
}

interface RoomReset {
  type: RoomActionType.RESET;
}

interface RoomCreateAction {
  type: RoomActionType.CREATE_ROOM;
}

interface RoomJoinAction {
  type: RoomActionType.JOIN_ROOM;
  id: string;
}

interface RoomCreateFailedAction {
  type: RoomActionType.CREATE_ROOM_FAILED;
  error: string;
}

interface RoomJoinFailedAction {
  type: RoomActionType.JOIN_ROOM_FAILED;
  error: string;
}

export type RoomActions = RoomCreateAction | RoomJoinAction | RoomCreateFailedAction | RoomReset
  | RoomJoinFailedAction;
