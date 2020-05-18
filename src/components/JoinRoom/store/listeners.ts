import { Dispatch } from 'react';
import { Subject } from 'rxjs';

import { WS_MESSAGE, WSActionTypes } from '../../../ws/actions';
import { ofType } from '../../../ws/utils';

import { RoomActions, RoomActionType } from './actions';
import { WS_MSG } from '../../../server/types';

function onJoinRoom(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<RoomActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_CREATED_ROOM, WSActionTypes.WS_JOINED_ROOM),
    )
    .subscribe(() => {
      dispatch({
        type: RoomActionType.RESET,
      });
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
      dispatch({
        type: RoomActionType.CREATE_ROOM_FAILED,
        error: 'Creating room failed',
      });
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

      dispatch({
        type: RoomActionType.JOIN_ROOM_FAILED,
        error: action.error,
      });
    });
}

export default [onJoinRoom, onCreateFailed, onJoinFailed]
  .map((f) => (
    webSocketMessage$: Subject<WS_MSG>,
    dispatch: Dispatch<RoomActions>,
  ): void => {
    f(webSocketMessage$ as Subject<WS_MESSAGE>, dispatch);
  });
