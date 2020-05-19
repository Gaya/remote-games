import WebSocket from 'ws';
import serveStatic from 'serve-static';
import express from 'express';

import * as path from 'path';
import { WSActionTypes } from '../ws/actions';

import { createUser } from './entities/user';
import { log } from './logging';
import handleMessage from './controllers';

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

    const data = JSON.parse(message);

    handleMessage(data, user);
  });
});

const serve = serveStatic(path.join(__dirname, '../../build'));
const app = express();

app.use(serve);

app.listen(parseInt(process.env.PORT || '5000', 10));

log('Server started');
