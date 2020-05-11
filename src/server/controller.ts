import { WS_MESSAGE, WSActionTypes } from '../ws/types';
import {
  activeRoomGame,
  createRoom, endGame,
  joinRoom,
  leaveRoom,
  roomUsers,
  roomUsersWithInfo,
  roomUsersWithoutUser,
  startGame,
} from './rooms';
import { log } from './logging';
import { WsUser } from './types';
import { generateNickname } from './user';

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
    const roomId = user.currentRoom;

    leaveRoom(roomId, user);

    user.sendToRoom({
      type: WSActionTypes.WS_USER_LEFT_ROOM,
      id: roomId,
      userId: user.id,
    });

    log('Left room:', user.currentRoom, user.id);
  },
  joinRoom(user: WsUser, roomId: string): void {
    try {
      const id = joinRoom(roomId, user);

      user.sendMessage({
        type: WSActionTypes.WS_JOINED_ROOM,
        id,
        users: roomUsersWithInfo(id),
        activeGame: activeRoomGame(id),
      });

      user.sendToRoom({
        type: WSActionTypes.WS_USER_JOINED_ROOM,
        id,
        user: user.toInfo(),
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

    const updateMessage: WS_MESSAGE = {
      type: WSActionTypes.WS_UPDATED_NICKNAME,
      id: user.id,
      nickname,
    };

    user.sendMessage(updateMessage);
    user.sendToRoom(updateMessage);

    log('Changed nickname:', user.nickname, user.id);
  },
  generateNickname(user: WsUser): void {
    const nickname = generateNickname();
    Controller.updateNickname(user, nickname);

    log('Generated nickname:', user.nickname, user.id);
  },
  startGame(user: WsUser, game: string): void {
    startGame(user.currentRoom, game);

    user.sendToRoom({
      type: WSActionTypes.WS_GAME_STARTED,
      game,
    });

    log('Started game:', game, user.id, user.currentRoom);
  },
  endGame(user: WsUser): void {
    endGame(user.currentRoom);

    user.sendToRoom({
      type: WSActionTypes.WS_GAME_ENDED,
    });

    log('Ended game:', user.id, user.currentRoom);
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
    case WSActionTypes.WS_REQUEST_NICKNAME:
      return Controller.generateNickname(user);
    case WSActionTypes.WS_GAME_START:
      return Controller.startGame(user, data.game);
    case WSActionTypes.WS_GAME_END:
      return Controller.endGame(user);
    default: {
      log(`No method found for '${data.type}'`);
      return undefined;
    }
  }
}

export default handleMessage;
