import { Dispatch } from 'react';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { ofType } from '../../../ws/utils';
import { WS_MESSAGE, WSActionTypes } from '../../../ws/actions';
import { sendWSMessage } from '../../../ws/websockets';

import { AppActions, AppActionType } from './actions';
import { AppState } from './types';
import { getStoredNickname } from './utils';
import { WS_MSG } from '../../../server/types';

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

      dispatch({
        type: AppActionType.OPEN_WS,
        id: action.id,
      });

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
      dispatch({ type: AppActionType.CLOSED_WS });
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
      dispatch({ type: AppActionType.FAILED_WS });
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

      dispatch({
        type: AppActionType.JOIN_ROOM,
        id: action.id,
        users: [state.users[state.app.userId]],
        activeGame: '',
      });
    });
}

function onJoinRoom(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_JOINED_ROOM),
    )
    .subscribe((action) => {
      if (action.type !== WSActionTypes.WS_JOINED_ROOM) return;

      dispatch({
        type: AppActionType.JOIN_ROOM,
        id: action.id,
        users: action.users,
        activeGame: action.activeGame,
      });
    });
}

function onUserJoinedRoom(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_USER_JOINED_ROOM),
    )
    .subscribe((action) => {
      if (action.type !== WSActionTypes.WS_USER_JOINED_ROOM) return;

      dispatch({
        type: AppActionType.USER_JOINED_ROOM,
        id: action.id,
        user: action.user,
      });
    });
}

function onUserLeftRoom(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_USER_LEFT_ROOM),
    )
    .subscribe((action) => {
      if (action.type !== WSActionTypes.WS_USER_LEFT_ROOM) return;

      dispatch({
        type: AppActionType.USER_LEFT_ROOM,
        id: action.id,
        userId: action.userId,
      });
    });
}

function onUpdatedNickname(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_UPDATED_NICKNAME),
    )
    .subscribe((action) => {
      if (action.type !== WSActionTypes.WS_UPDATED_NICKNAME) return;

      dispatch({
        type: AppActionType.UPDATED_NICKNAME,
        id: action.id,
        nickname: action.nickname,
      });
    });
}

function onGameStarted(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_GAME_STARTED),
    )
    .subscribe((action) => {
      if (action.type !== WSActionTypes.WS_GAME_STARTED) return;

      dispatch({
        type: AppActionType.GAME_STARTED,
        game: action.game,
      });
    });
}

function onGameEnded(
  webSocketMessage$: Subject<WS_MESSAGE>,
  dispatch: Dispatch<AppActions>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_GAME_ENDED),
    )
    .subscribe((action) => {
      if (action.type !== WSActionTypes.WS_GAME_ENDED) return;

      dispatch({ type: AppActionType.GAME_ENDED });
    });
}

export default [onConnectionOpen, onConnectionFailed, onJoinRoom, onUpdatedNickname, onCreateRoom,
  onCloseConnection, onUserJoinedRoom, onUserLeftRoom, onGameStarted, onGameEnded]
  .map((f) => (
    webSocketMessage$: Subject<WS_MSG>,
    dispatch: Dispatch<AppActions>,
    state$: Subject<AppState>,
  ): void => {
    f(webSocketMessage$ as Subject<WS_MESSAGE>, dispatch, state$);
  });
