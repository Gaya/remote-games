import { WS_MESSAGE, WSActionTypes } from '../ws/types';
import { createRoom, joinRoom, leaveRoom } from './rooms';
import { log } from './logging';
import { WsUser } from './types';

const Controller = {
  createRoom(user: WsUser) {
    const id = createRoom(user);

    user.sendMessage({
      type: WSActionTypes.WS_CREATED_ROOM,
      id,
    });

    log('Create room:', id, user.id);
  },
  leaveRoom(user: WsUser) {
    leaveRoom(user.currentRoom, user);

    log('Left room:', user.currentRoom, user.id);
  },
  joinRoom(user: WsUser, roomId: string) {
    try {
      const id = joinRoom(roomId, user);

      user.sendMessage({
        type: WSActionTypes.WS_JOINED_ROOM,
        id,
      });

      log('Join room:', roomId, user.id);
    } catch (err) {
      user.sendMessage({
        type: WSActionTypes.WS_JOIN_ROOM_FAILED,
        message: err.message,
      });

      log('Join room failed:', roomId, user.id);
    }
  }
};

function handleMessage(data: WS_MESSAGE, user: WsUser): void {
  switch(data.type) {
    case WSActionTypes.WS_CREATE_ROOM:
      return Controller.createRoom(user);
    case WSActionTypes.WS_LEAVE_ROOM:
      return Controller.leaveRoom(user);
    case WSActionTypes.WS_JOIN_ROOM:
      return Controller.joinRoom(user, data.id);
  }
}

export default handleMessage;