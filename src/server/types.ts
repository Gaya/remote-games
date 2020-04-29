import WebSocket from 'ws';
import { WS_MESSAGE } from '../ws/types';

export interface WsUser {
  id: string;
  currentRoom: string;
  nickname: string;
  ws: WebSocket;
  sendMessage(message: WS_MESSAGE): void;
}
