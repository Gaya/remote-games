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

export function reset(): RoomReset {
  return {
    type: RoomActionType.RESET,
  };
}

interface RoomCreateAction {
  type: RoomActionType.CREATE_ROOM;
}

export function createRoom(): RoomCreateAction {
  return {
    type: RoomActionType.CREATE_ROOM,
  };
}

interface RoomJoinAction {
  type: RoomActionType.JOIN_ROOM;
  id: string;
}

export function joinRoom(id: string): RoomJoinAction {
  return {
    type: RoomActionType.JOIN_ROOM,
    id,
  };
}

interface RoomCreateFailedAction {
  type: RoomActionType.CREATE_ROOM_FAILED;
  error: string;
}

export function createRoomFailed(error: string): RoomCreateFailedAction {
  return {
    type: RoomActionType.CREATE_ROOM_FAILED,
    error,
  };
}

interface RoomJoinFailedAction {
  type: RoomActionType.JOIN_ROOM_FAILED;
  error: string;
}

export function joinRoomFailed(error: string): RoomJoinFailedAction {
  return {
    type: RoomActionType.JOIN_ROOM_FAILED,
    error,
  };
}

export type RoomActions = RoomCreateAction | RoomJoinAction | RoomCreateFailedAction | RoomReset
  | RoomJoinFailedAction;
