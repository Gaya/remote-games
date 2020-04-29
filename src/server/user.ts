// @ts-ignore
import goby from 'goby';
import shortid from 'shortid';
import WebSocket from 'ws';

import { WS_MESSAGE } from '../ws/types';

import { WsUser } from './types';
import { log } from './logging';

const gb = goby.init();

export function createUser(ws: WebSocket): WsUser {
  return {
    id: shortid.generate(),
    currentRoom: '',
    nickname: gb.generate(['adj', 'pre', 'suf']),
    ws,
    sendMessage(message: WS_MESSAGE) {
      const msg = JSON.stringify(message);

      this.ws.send(msg);

      log('Sent to client:', msg, this.id);
    },
  };
}
