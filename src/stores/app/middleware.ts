import { Dispatch } from 'react';
import { filter } from 'rxjs/operators';

import websocketMessageObservable from '../../ws/websockets';
import { WSActionTypes } from '../../ws/types';
import createLogMiddleware from '../createLogMiddleware';

import { AppActions, AppActionType, failedWS, openWS } from './actions';
import { AppState } from './types';

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

const middleware = [createLogMiddleware('App'), connectToWS];

export default middleware;