import { Dispatch } from 'react';
import { Subject } from 'rxjs';

import { WS_MESSAGE, WSActionTypes } from '../../../ws/actions';
import { ofType } from '../../../ws/utils';

import {
  createRoomFailed,
  joinRoomFailed,
  reset,
  RoomActions,
} from './actions';

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
      dispatch(createRoomFailed('Creating room failed'));
    });
}

function onJoinFailed(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<RoomActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_JOIN_ROOM_FAILED),
    )
    .subscribe((action) => {
      if (action.type !== WSActionTypes.WS_JOIN_ROOM_FAILED) return;

      dispatch(joinRoomFailed(action.error));
    });
}

export default [onJoinRoom, onCreateFailed, onJoinFailed]
  .map((f) => (
    webSocketMessage$: Subject<unknown>,
    dispatch: Dispatch<RoomActions>,
  ): void => {
    f(webSocketMessage$ as Subject<WS_MESSAGE>, dispatch);
  });
