export enum RoomActionType {
  'CREATE_ROOM' = 'CREATE_ROOM',
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

export type RoomActions = RoomCreateAction | RoomJoinAction;
