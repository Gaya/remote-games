import { Dispatch } from 'react';
import { Subject } from 'rxjs';

import { WS_MESSAGE, WSActionTypes } from '../../../ws/types';
import { ofType } from '../../../ws/utils';

import { createRoomFailed, reset, RoomActions } from './actions';

function onJoinRoom(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<RoomActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_CREATED_ROOM, WSActionTypes.WS_JOINED_ROOM),
    )
    .subscribe(() => {
      dispatch(reset());
    });
}

function onCreateFailed(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<RoomActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_CREATE_ROOM_FAILED),
    )
    .subscribe(() => {
      dispatch(createRoomFailed());
    });
}

export default [onJoinRoom, onCreateFailed];
