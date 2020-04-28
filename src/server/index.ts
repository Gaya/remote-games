import WS from 'ws';

import { WS_MESSAGE, WSActionTypes } from '../ws/types';

const wss = new WS.Server({ port: parseInt(process.env.WS_PORT || '4000') });

const isVerbose = true;

function log(...msg: any) {
  if (!isVerbose) return;
  console.info(...msg);
}

function createRoom(): string {
  const roomId = 'hallo_met_ad';

  return roomId;
}

wss.on('connection', function connection(ws) {
  function sendMessage(message: WS_MESSAGE) {
    const msg = JSON.stringify(message);

    ws.send(msg);
    log('Sent to client:', msg);
  }

  ws.on('message', function incoming(message: string) {
    const data: WS_MESSAGE = JSON.parse(message);
    log('Received:', data);

    switch(data.type) {
      case WSActionTypes.WS_CREATE_ROOM:
        sendMessage({
          type: WSActionTypes.WS_CREATED_ROOM,
          id: createRoom(),
        });
      break;
    }
  });

  log('Client connected', ws);
  sendMessage({ type: WSActionTypes.WS_OPEN_CONNECTION });
});

log('Server started');
