import WebSocket from 'ws';
import { WS_MESSAGE } from '../ws/types';

export interface WsUser extends WsUserInfo {
  currentRoom: string;
  ws: WebSocket;
  setCurrentRoom(room: string): void;
  sendMessage(message: WS_MESSAGE): void;
  setNickname(nickname: string): void;
  toInfo(): WsUserInfo;
}

export interface WsUserInfo {
  id: string;
  nickname: string;
}
