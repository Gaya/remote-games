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
    .subscribe((action) => {
      if (action.type !== WSActionTypes.WS_OPEN_CONNECTION) return;

      dispatch(openWS(action.id, action.nickname));
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
    .subscribe(([action, state]) => {
      if (action.type !== WSActionTypes.WS_CREATED_ROOM) return;

      dispatch(joinRoom(action.id, [state.app.userId]));
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
    .subscribe(([action, state]) => {
      if (action.type !== WSActionTypes.WS_UPDATED_NICKNAME
        || state.app.userId !== action.id) return;

      dispatch(updatedNickname(action.id, action.nickname));
    });
}

export default [onConnectionOpen, onConnectionFailed, onJoinRoom, onUpdatedNickname];
