import WebSocket from 'ws';

import { WS_MESSAGE, WSActionTypes } from '../ws/types';
import { createRoom } from './rooms';
import shortid from 'shortid';
import construct = Reflect.construct;
import { WsUser } from './types';

const wss = new WebSocket.Server({ port: parseInt(process.env.WS_PORT || '4000') });

const isVerbose = true;

function log(...msg: any) {
  if (!isVerbose) return;
  console.info(...msg);
}

wss.on('connection', function connection(ws) {
  let currentRoom: string;

  const user: WsUser = {
    id: shortid.generate(),
    ws,
  };

  function sendMessage(message: WS_MESSAGE) {
    const msg = JSON.stringify(message);

    ws.send(msg);

    log('Sent to client:', msg);
  }

  ws.on('message', function incoming(message: string) {
    log('Received:', message);

    const data: WS_MESSAGE = JSON.parse(message);

    switch(data.type) {
      case WSActionTypes.WS_CREATE_ROOM: {
        const id = createRoom(user);

        currentRoom = id;

        sendMessage({
          type: WSActionTypes.WS_CREATED_ROOM,
          id,
        });
      }
      break;
      case WSActionTypes.WS_LEAVE_ROOM: {
        log(`Left room ${currentRoom}`)
      }
      break;
    }
  });

  log('Client connected', ws);

  sendMessage({ type: WSActionTypes.WS_OPEN_CONNECTION, id: user.id });
});

log('Server started');
