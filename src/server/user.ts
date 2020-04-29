import shortid from 'shortid';
import WebSocket from 'ws';
// @ts-ignore
import generateName from 'project-name-generator';

import { WS_MESSAGE } from '../ws/types';

import { WsUser } from './types';
import { log } from './logging';

export function createUser(ws: WebSocket): WsUser {
  return {
    id: shortid.generate(),
    currentRoom: '',
    nickname: generateName().spaced,
    ws,
    sendMessage(message: WS_MESSAGE) {
      const msg = JSON.stringify(message);

      this.ws.send(msg);

      log('Sent to client:', msg, this.id);
    },
  };
}
