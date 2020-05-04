import { WS_MESSAGE, WSActionTypes } from '../ws/types';
import {
  createRoom, joinRoom, leaveRoom, roomUsers,
} from './rooms';
import { log } from './logging';
import { WsUser } from './types';

const Controller = {
  createRoom(user: WsUser): void {
    const id = createRoom(user);

    user.sendMessage({
      type: WSActionTypes.WS_CREATED_ROOM,
      id,
    });

    log('Create room:', id, user.id);
  },
  leaveRoom(user: WsUser): void {
    leaveRoom(user.currentRoom, user);

    log('Left room:', user.currentRoom, user.id);
  },
  joinRoom(user: WsUser, roomId: string): void {
    try {
      const id = joinRoom(roomId, user);

      user.sendMessage({
        type: WSActionTypes.WS_JOINED_ROOM,
        id,
        users: roomUsers(id).map((u) => u.id),
      });

      log('Join room:', roomId, user.id);
    } catch (err) {
      user.sendMessage({
        type: WSActionTypes.WS_JOIN_ROOM_FAILED,
        error: err.message,
      });

      log('Join room failed:', roomId, user.id);
    }
  },
  updateNickname(user: WsUser, nickname: string): void {
    user.setNickname(nickname);

    roomUsers(user.currentRoom).forEach((u) => {
      u.sendMessage({
        type: WSActionTypes.WS_UPDATED_NICKNAME,
        id: user.id,
        nickname,
      });
    });
  },
};

function handleMessage(data: WS_MESSAGE, user: WsUser): void {
  switch (data.type) {
    case WSActionTypes.WS_CREATE_ROOM:
      return Controller.createRoom(user);
    case WSActionTypes.WS_LEAVE_ROOM:
      return Controller.leaveRoom(user);
    case WSActionTypes.WS_JOIN_ROOM:
      return Controller.joinRoom(user, data.id);
    case WSActionTypes.WS_UPDATE_NICKNAME:
      return Controller.updateNickname(user, data.nickname);
    default: {
      log(`No method found for '${data.type}'`);
      return undefined;
    }
  }
}

export default handleMessage;
