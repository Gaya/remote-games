// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import generateName from 'project-name-generator';

import shortid from 'shortid';
import WebSocket from 'ws';

import { WS_MESSAGE } from '../ws/types';

import { WsUser } from './types';
import { log } from './logging';

export function createUser(ws: WebSocket): WsUser {
  return {
    id: shortid.generate(),
    currentRoom: '',
    nickname: generateName().spaced,
    ws,
    sendMessage(message: WS_MESSAGE): void {
      const msg = JSON.stringify(message);

      this.ws.send(msg);

      log('Sent to client:', msg, this.id);
    },
    setCurrentRoom(id: string): void {
      this.currentRoom = id;
    },
    setNickname(nickname: string): void {
      this.nickname = nickname;
    },
  };
}
