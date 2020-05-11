import createLogMiddleware from '../../../core/stores/createLogMiddleware';
import { sendWSMessage } from '../../../ws/websockets';
import { WSActionTypes } from '../../../ws/types';

import { RoomActions, RoomActionType } from './actions';

function createRoom(action: RoomActions): void {
  if (action.type !== RoomActionType.CREATE_ROOM) return;

  sendWSMessage({
    type: WSActionTypes.WS_CREATE_ROOM,
  });
}

function joinRoom(action: RoomActions): void {
  if (action.type !== RoomActionType.JOIN_ROOM) return;

  sendWSMessage({
    type: WSActionTypes.WS_JOIN_ROOM,
    id: action.id,
  });
}

export default [createLogMiddleware('Room'), createRoom, joinRoom];
