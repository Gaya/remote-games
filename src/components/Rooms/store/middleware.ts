import createLogMiddleware from '../../../stores/createLogMiddleware';

import { RoomActions, RoomActionType } from './actions';
import { sendWSMessage } from '../../../ws/websockets';
import { WSActionTypes } from '../../../ws/types';
import { ofType } from '../../../ws/utils';

function createRoom(action: RoomActions) {
  if (action.type !== RoomActionType.CREATE_ROOM) return;

  const webSocketMessages$ = sendWSMessage({
    type: WSActionTypes.WS_CREATE_ROOM,
  });

  const subscription = webSocketMessages$.pipe(
    ofType(WSActionTypes.WS_CREATED_ROOM, WSActionTypes.WS_CREATE_ROOM_FAILED),
  ).subscribe((msg) => {
    console.log(msg);

    subscription.unsubscribe();
  });
}

export default [createLogMiddleware('Room'), createRoom];
