import WebSocket from 'ws';

export interface WsUser {
  id: string;
  currentRoom: string;
  ws: WebSocket;
}
