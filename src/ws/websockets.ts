import { Subject } from 'rxjs';

import { WS_MESSAGE, WSActionTypes } from './actions';

let ws: WebSocket | undefined;
export const websocketMessages$ = new Subject<WS_MESSAGE>();

export function sendWSMessage(message: WS_MESSAGE): Subject<WS_MESSAGE> {
  if (ws) {
    ws.send(JSON.stringify(message));
  }

  return websocketMessages$;
}

export default function openWebSocketConnection(): void {
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

    ws.addEventListener('close', () => {
      websocketMessages$.next({ type: WSActionTypes.WS_CLOSE_CONNECTION });
      ws = undefined;
    });
  }
}
