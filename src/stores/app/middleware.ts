import { Dispatch } from 'react';
import { filter } from 'rxjs/operators';

import websocketMessageObservable from '../../ws/websockets';
import { WSActionTypes } from '../../ws/types';

import { AppActions, AppActionType, failedWS, openWS } from './actions';
import { AppState } from './types';

function logMiddleware(state: AppState, action: AppActions) {
  console.log(state, action);
}

function connectToWS(state: AppState, action: AppActions, dispatch: Dispatch<AppActions>) {
  if (action.type !== AppActionType.INIT && action.type !== AppActionType.RETRY_WS) return;

  const webSocketMessage$ = websocketMessageObservable();

  const subscription = webSocketMessage$
    .pipe(
      filter(msg => msg.type === WSActionTypes.WS_OPEN_CONNECTION || msg.type === WSActionTypes.WS_FAILED_CONNECTION)
    )
    .subscribe((msg) => {
      if (msg.type === WSActionTypes.WS_OPEN_CONNECTION) {
        dispatch(openWS());
      }

      if (msg.type === WSActionTypes.WS_FAILED_CONNECTION) {
        dispatch(failedWS());
      }

      subscription.unsubscribe();
    });
}

const middleware = [logMiddleware, connectToWS];

export default middleware;
