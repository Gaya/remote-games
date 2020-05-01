import { Dispatch } from 'react';
import { Subject } from 'rxjs';

import { ofType } from '../../../ws/utils';
import { WS_MESSAGE, WSActionTypes } from '../../../ws/types';

import {
  AppActions,
  failedWS,
  joinRoom,
  openWS,
} from './actions';

function onConnectionOpen(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_OPEN_CONNECTION),
    )
    .subscribe((msg) => {
      if (msg.type === WSActionTypes.WS_OPEN_CONNECTION) {
        dispatch(openWS(msg.id, msg.nickname));
      }
    });
}

function onConnectionFailed(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_FAILED_CONNECTION),
    )
    .subscribe(() => {
      dispatch(failedWS());
    });
}

function onJoinRoom(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_CREATED_ROOM),
    )
    .subscribe((msg) => {
      if (msg.type === WSActionTypes.WS_CREATED_ROOM) {
        dispatch(joinRoom(msg.id));
      }
    });
}

export default [onConnectionOpen, onConnectionFailed, onJoinRoom];
