import WebSocket from 'ws';
import { WS_MESSAGE } from '../ws/types';

export interface WsUser {
  id: string;
  currentRoom: string;
  nickname: string;
  ws: WebSocket;
  setCurrentRoom(room: string): void;
  sendMessage(message: WS_MESSAGE): void;
}
