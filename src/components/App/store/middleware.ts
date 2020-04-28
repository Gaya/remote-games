import { Dispatch } from 'react';

import websocketMessageObservable from '../../../ws/websockets';
import { WSActionTypes } from '../../../ws/types';
import createLogMiddleware from '../../../stores/createLogMiddleware';
import { ofType } from '../../../ws/utils';

import { AppActions, AppActionType, failedWS, openWS } from './actions';
import { AppState } from './types';

function connectToWS(action: AppActions, state: AppState, dispatch: Dispatch<AppActions>) {
  if (action.type !== AppActionType.INIT && action.type !== AppActionType.RETRY_WS) return;

  const webSocketMessage$ = websocketMessageObservable();

  const subscription = webSocketMessage$
    .pipe(
      ofType(WSActionTypes.WS_OPEN_CONNECTION, WSActionTypes.WS_FAILED_CONNECTION)
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
