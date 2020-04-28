import WebSocket from 'ws';

export interface WsUser {
  id: string;
  ws: WebSocket;
}
