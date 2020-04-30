import WebSocket from 'ws';

import { WS_MESSAGE, WSActionTypes } from '../ws/types';

import { createUser } from './user';
import { log } from './logging';
import handleMessage from './controller';

const wss = new WebSocket.Server({ port: parseInt(process.env.WS_PORT || '4000', 10) });

wss.on('connection', (ws) => {
  // create user for session
  const user = createUser(ws);

  log('Client connected:', user.id);

  // send connection signal
  user.sendMessage({
    type: WSActionTypes.WS_OPEN_CONNECTION,
    id: user.id,
    nickname: user.nickname,
  });

  // listen to when user disconnects
  ws.on('close', () => {
    log('Disconnecting:', user.id);

    if (user.currentRoom !== '') {
      handleMessage({ type: WSActionTypes.WS_LEAVE_ROOM }, user);
    }
  });

  // listen to user messages
  ws.on('message', (message: string) => {
    log('Received:', message, user.id);

    const data: WS_MESSAGE = JSON.parse(message);

    handleMessage(data, user);
  });
});

log('Server started');
