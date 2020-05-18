import { Subject } from 'rxjs';

import { WSActionTypes } from './actions';
import { WS_MSG } from '../server/types';

let ws: WebSocket | undefined;
export const websocketMessages$ = new Subject<WS_MSG>();

export function sendWSMessage(message: WS_MSG): Subject<WS_MSG> {
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
      const data: WS_MSG = JSON.parse(message.data);
      websocketMessages$.next(data);
    });

    ws.addEventListener('close', () => {
      websocketMessages$.next({ type: WSActionTypes.WS_CLOSE_CONNECTION });
      ws = undefined;
    });
  }
}
