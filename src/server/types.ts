import WebSocket from 'ws';
import { WS_MESSAGE } from '../ws/actions';
import { WS_REFLEXDUEL_MESSAGE } from '../games/reflex-duel/server/actions';

export interface WsUser extends WsUserInfo {
  currentRoom: string;
  ws: WebSocket;
  setCurrentRoom(room: string): void;
  sendMessage(message: WS_MSG): void;
  sendToRoom(message: WS_MSG): void;
  setNickname(nickname: string): void;
  toInfo(): WsUserInfo;
}

export interface WsUserInfo {
  id: string;
  nickname: string;
}

export interface WsRoom {
  users: WsUser[];
  activeGame: string;
}

export interface WsRooms {
  [id: string]: WsRoom | undefined;
}

export type WS_MSG = WS_MESSAGE | WS_REFLEXDUEL_MESSAGE;
