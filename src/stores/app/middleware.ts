import { AppActions, AppActionType } from './actions';
import { AppState } from './types';
import openWebSocket from '../../ws/websockets';

function logMiddleware(state: AppState, action: AppActions) {
  console.log(state, action);
}

function connectToWS(state: AppState, action: AppActions) {
  if (action.type !== AppActionType.INIT) return;
  openWebSocket();
}

const middleware = [logMiddleware, connectToWS];

export default middleware;
