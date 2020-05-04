import openWebSocketConnection, { sendWSMessage } from '../../../ws/websockets';
import createLogMiddleware from '../../../stores/createLogMiddleware';

import { AppActions, AppActionType } from './actions';
import { WSActionTypes } from '../../../ws/types';

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

  sendWSMessage({
    type: WSActionTypes.WS_UPDATE_NICKNAME,
    nickname: action.nickname,
  });
}

const middleware = [createLogMiddleware('App'), connectToWS, onLeaveRoom, onUpdateNickname];

export default middleware;
