import { Dispatch } from 'react';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { ofType } from '../../../ws/utils';
import { WS_MESSAGE, WSActionTypes } from '../../../ws/types';

import {
  AppActions,
  failedWS,
  joinRoom,
  openWS, updatedNickname,
} from './actions';
import { AppState } from './types';

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
  state$: Subject<AppState>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_CREATED_ROOM),
      withLatestFrom(state$),
    )
    .subscribe(([msg, state]) => {
      if (msg.type === WSActionTypes.WS_CREATED_ROOM) {
        dispatch(joinRoom(msg.id, [state.app.userId]));
      }
    });
}

function onUpdatedNickname(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
  state$: Subject<AppState>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_UPDATED_NICKNAME),
      withLatestFrom(state$),
    )
    .subscribe(([msg, state]) => {
      if (msg.type === WSActionTypes.WS_UPDATED_NICKNAME && state.app.userId !== msg.id) {
        dispatch(updatedNickname(msg.id, msg.nickname));
      }
    });
}

export default [onConnectionOpen, onConnectionFailed, onJoinRoom, onUpdatedNickname];
