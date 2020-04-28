export enum RoomActionType {
  'CREATE_ROOM' = 'CREATE_ROOM',
  'CREATE_ROOM_FAILED' = 'CREATE_ROOM_FAILED',
  'JOIN_ROOM' = 'JOIN_ROOM',
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
}

export function createRoomFailed(): RoomCreateFailedAction {
  return {
    type: RoomActionType.CREATE_ROOM_FAILED,
  };
}

export type RoomActions = RoomCreateAction | RoomJoinAction | RoomCreateFailedAction;
