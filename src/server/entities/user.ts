// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import generateName from 'project-name-generator';

import shortid from 'shortid';
import WebSocket from 'ws';

import { WS_MESSAGE } from '../../ws/actions';

import { WsUser, WsUserInfo } from '../types';
import { log } from '../logging';
import { roomUsersWithoutUser } from './rooms';

export function generateNickname(): string {
  return generateName().spaced;
}

export function createUser(ws: WebSocket): WsUser {
  return {
    id: shortid.generate(),
    currentRoom: '',
    nickname: '',
    ws,
    sendMessage(message: WS_MESSAGE): void {
      const msg = JSON.stringify(message);

      this.ws.send(msg);

      log('Sent to client:', msg, this.id);
    },
    sendToRoom(message: WS_MESSAGE): void {
      roomUsersWithoutUser(this.currentRoom, this.id)
        .forEach((u) => u.sendMessage(message));
    },
    setCurrentRoom(id: string): void {
      this.currentRoom = id;
    },
    setNickname(nickname: string): void {
      this.nickname = nickname;
    },
    toInfo(): WsUserInfo {
      return {
        id: this.id,
        nickname: this.nickname,
      };
    },
  };
}
