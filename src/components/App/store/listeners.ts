import { Dispatch } from 'react';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { ofType } from '../../../ws/utils';
import { WS_MESSAGE, WSActionTypes } from '../../../ws/types';
import { sendWSMessage } from '../../../ws/websockets';

import {
  AppActions, closedWS, failedWS, joinRoom, openWS, updatedNickname,
} from './actions';
import { AppState } from './types';
import { getStoredNickname } from './utils';

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

      dispatch(openWS(action.id));

      const nickname = getStoredNickname();

      const nicknameAction: WS_MESSAGE = nickname && nickname !== '' ? {
        type: WSActionTypes.WS_UPDATE_NICKNAME,
        nickname,
      } : {
        type: WSActionTypes.WS_REQUEST_NICKNAME,
      };

      sendWSMessage(nicknameAction);
    });
}

function onCloseConnection(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_CLOSE_CONNECTION),
    )
    .subscribe(() => {
      dispatch(closedWS());
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

function onCreateRoom(
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

function onJoinRoom(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
  state$: Subject<AppState>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_JOINED_ROOM),
      withLatestFrom(state$),
    )
    .subscribe(([action]) => {
      if (action.type !== WSActionTypes.WS_JOINED_ROOM) return;

      dispatch(joinRoom(action.id, action.users));
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
    .subscribe(([action]) => {
      if (action.type !== WSActionTypes.WS_UPDATED_NICKNAME) return;

      dispatch(updatedNickname(action.id, action.nickname));
    });
}

export default [onConnectionOpen, onConnectionFailed, onJoinRoom, onUpdatedNickname, onCreateRoom,
  onCloseConnection];
