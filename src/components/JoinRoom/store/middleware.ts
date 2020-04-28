import createLogMiddleware from '../../../stores/createLogMiddleware';
import { sendWSMessage } from '../../../ws/websockets';
import { WSActionTypes } from '../../../ws/types';

import {  RoomActions, RoomActionType } from './actions';

function createRoom(action: RoomActions) {
  if (action.type !== RoomActionType.CREATE_ROOM) return;

  sendWSMessage({
    type: WSActionTypes.WS_CREATE_ROOM,
  });
}

export default [createLogMiddleware('Room'), createRoom];
