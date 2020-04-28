import { Dispatch } from 'react';

import createLogMiddleware from '../../../stores/createLogMiddleware';
import { sendWSMessage } from '../../../ws/websockets';
import { WSActionTypes } from '../../../ws/types';
import { ofType } from '../../../ws/utils';

import { createRoomFailed, RoomActions, RoomActionType } from './actions';
import { RoomState } from './types';

function createRoom(action: RoomActions, state: RoomState, dispatch: Dispatch<RoomActions>) {
  if (action.type !== RoomActionType.CREATE_ROOM) return;

  const webSocketMessages$ = sendWSMessage({
    type: WSActionTypes.WS_CREATE_ROOM,
  });

  const subscription = webSocketMessages$.pipe(
    ofType(WSActionTypes.WS_CREATED_ROOM, WSActionTypes.WS_CREATE_ROOM_FAILED),
  ).subscribe((msg) => {
    if (msg.type === WSActionTypes.WS_CREATE_ROOM_FAILED) {
      dispatch(createRoomFailed());
    }

    subscription.unsubscribe();
  });
}

export default [createLogMiddleware('Room'), createRoom];
