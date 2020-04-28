import openWebSocketConnection, { sendWSMessage } from '../../../ws/websockets';
import createLogMiddleware from '../../../stores/createLogMiddleware';

import { AppActions, AppActionType } from './actions';
import { WSActionTypes } from '../../../ws/types';

function connectToWS(action: AppActions) {
  if (action.type !== AppActionType.INIT && action.type !== AppActionType.RETRY_WS) return;

  // create websocket connection
  openWebSocketConnection();
}

function onLeaveRoom(action: AppActions) {
  if (action.type !== AppActionType.LEAVE_ROOM) return;

  sendWSMessage({
    type: WSActionTypes.WS_LEAVE_ROOM,
  })
}

const middleware = [createLogMiddleware('App'), connectToWS, onLeaveRoom];

export default middleware;
