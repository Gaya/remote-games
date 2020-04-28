import WebSocket from 'ws';
import shortid from 'shortid';

import { WS_MESSAGE, WSActionTypes } from '../ws/types';

import { createRoom, joinRoom, leaveRoom } from './rooms';
import { WsUser } from './types';

const wss = new WebSocket.Server({ port: parseInt(process.env.WS_PORT || '4000') });

const isVerbose = true;

function log(...msg: any) {
  if (!isVerbose) return;
  console.info(...msg);
}

function sendMessage(user: WsUser, message: WS_MESSAGE) {
  const msg = JSON.stringify(message);

  user.ws.send(msg);

  log('Sent to client:', msg, user.id);
}

wss.on('connection', function connection(ws) {
  const user: WsUser = {
    id: shortid.generate(),
    currentRoom: '',
    ws,
  };

  ws.on('close', function closeConnection() {
    log('Disconnecting:', user.id);

    if (user.currentRoom !== '') {
      leaveRoom(user.currentRoom, user);
    }
  })

  ws.on('message', function incoming(message: string) {
    log('Received:', message, user.id);

    const data: WS_MESSAGE = JSON.parse(message);

    switch(data.type) {
      case WSActionTypes.WS_CREATE_ROOM: {
        const id = createRoom(user);

        sendMessage(user, {
          type: WSActionTypes.WS_CREATED_ROOM,
          id,
        });

        log('Create room:', id, user.id);
      }
        break;
      case WSActionTypes.WS_LEAVE_ROOM: {
        leaveRoom(user.currentRoom, user);

        log('Left room:', user.currentRoom, user.id);
      }
        break;
      case WSActionTypes.WS_JOIN_ROOM: {
        try {
          const id = joinRoom(data.id, user);

          sendMessage(user, {
            type: WSActionTypes.WS_JOINED_ROOM,
            id,
          });

          log('Join room:', data.id, user.id);
        } catch (err) {
          sendMessage(user, {
            type: WSActionTypes.WS_JOIN_ROOM_FAILED,
            message: err.message,
          });

          log('Join room failed:', data.id, user.id);
        }
      }
        break;
    }
  });

  log('Client connected:', user.id);

  sendMessage(user, { type: WSActionTypes.WS_OPEN_CONNECTION, id: user.id });
});

log('Server started');
