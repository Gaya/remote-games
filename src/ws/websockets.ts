import { Subject } from 'rxjs';

import { WS_MESSAGE, WSActionTypes } from './types';

let ws: WebSocket | undefined;
const websocketMessages$ = new Subject<WS_MESSAGE>();

export function sendWSMessage(message: WS_MESSAGE): Subject<WS_MESSAGE> {
  if (ws) {
    ws.send(JSON.stringify(message));
  }

  return websocketMessages$;
}

export default function websocketMessageObservable(): Subject<WS_MESSAGE> {
  if (!ws) {
    ws = new WebSocket(process.env.REACT_APP_WS_URL || '');

    ws.addEventListener('error', () => {
      websocketMessages$.next({ type: WSActionTypes.WS_FAILED_CONNECTION });
      ws = undefined;
    });

    ws.addEventListener('message', (message: { data: string }) => {
      const data: WS_MESSAGE = JSON.parse(message.data);
      websocketMessages$.next(data);
    });
  }

  return websocketMessages$;
}
