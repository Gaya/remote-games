import openWebSocketConnection, { sendWSMessage } from '../../../ws/websockets';
import createLogMiddleware from '../../../core/stores/createLogMiddleware';
import { WSActionTypes } from '../../../ws/types';

import { AppActions, AppActionType } from './actions';
import { storeNickname } from './utils';

function connectToWS(action: AppActions): void {
  if (action.type !== AppActionType.INIT && action.type !== AppActionType.RETRY_WS) return;

  // create websocket connection
  openWebSocketConnection();
}

function onLeaveRoom(action: AppActions): void {
  if (action.type !== AppActionType.LEAVE_ROOM) return;

  sendWSMessage({
    type: WSActionTypes.WS_LEAVE_ROOM,
  });
}

function onUpdateNickname(action: AppActions): void {
  if (action.type !== AppActionType.UPDATE_NICKNAME) return;

  storeNickname(action.nickname);

  sendWSMessage({
    type: WSActionTypes.WS_UPDATE_NICKNAME,
    nickname: action.nickname,
  });
}

function onStartGame(action: AppActions): void {
  if (action.type !== AppActionType.GAME_START) return;

  sendWSMessage({
    type: WSActionTypes.WS_GAME_START,
    game: action.game,
  });
}

function onEndGame(action: AppActions): void {
  if (action.type !== AppActionType.GAME_END) return;

  sendWSMessage({
    type: WSActionTypes.WS_GAME_END,
  });
}

const middleware = [
  createLogMiddleware('App'),
  connectToWS,
  onLeaveRoom,
  onUpdateNickname,
  onStartGame,
  onEndGame,
];

export default middleware;
