import openWebSocketConnection from '../../../ws/websockets';
import createLogMiddleware from '../../../stores/createLogMiddleware';

import { AppActions, AppActionType } from './actions';
import { AppState } from './types';

function connectToWS(action: AppActions, state: AppState) {
  if (action.type !== AppActionType.INIT && action.type !== AppActionType.RETRY_WS) return;

  // create websocket connection
  openWebSocketConnection();
}

const middleware = [createLogMiddleware('App'), connectToWS];

export default middleware;
