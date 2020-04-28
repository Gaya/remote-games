import { Dispatch } from 'react';
import { Subject } from 'rxjs';

import { ofType } from '../../../ws/utils';
import { WS_MESSAGE, WSActionTypes, WSCreatedRoom } from '../../../ws/types';

import { AppActions, failedWS, joinRoom, openWS } from './actions';

function onConnectionOpen(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
) {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_OPEN_CONNECTION)
    )
    .subscribe(() => {
      dispatch(openWS());
    });
}

function onConnectionFailed(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
) {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_FAILED_CONNECTION)
    )
    .subscribe(() => {
      dispatch(failedWS());
    });
}

function onJoinRoom(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
) {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_CREATED_ROOM)
    )
    .subscribe((msg) => {
      const _msg = msg as WSCreatedRoom;
      dispatch(joinRoom(_msg.id));
    });
}

export default [onConnectionOpen, onConnectionFailed, onJoinRoom];
