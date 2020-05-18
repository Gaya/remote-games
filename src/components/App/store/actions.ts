import { User } from './types';

export enum AppActionType {
  INIT = 'INIT',
  RETRY_WS = 'RETRY_WS',
  OPEN_WS = 'OPEN_WS',
  FAILED_WS = 'FAILED_WS',
  CLOSED_WS = 'CLOSED_WS',
  UPDATE_NICKNAME = 'UPDATE_NICKNAME',
  UPDATED_NICKNAME = 'UPDATED_NICKNAME',
  JOIN_ROOM = 'JOIN_ROOM',
  USER_JOINED_ROOM = 'USER_JOINED_ROOM',
  USER_LEFT_ROOM = 'USER_LEFT_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
  GAME_START = 'GAME_START',
  GAME_STARTED = 'GAME_STARTED',
  GAME_END = 'GAME_END',
  GAME_ENDED = 'GAME_ENDED',
}

interface AppInit {
  type: AppActionType.INIT;
}

interface AppOpenWS {
  type: AppActionType.OPEN_WS;
  id: string;
}

interface AppRetryWS {
  type: AppActionType.RETRY_WS;
}

interface AppFailedWS {
  type: AppActionType.FAILED_WS;
}

interface AppCloseWS {
  type: AppActionType.CLOSED_WS;
}

interface AppJoinRoom {
  type: AppActionType.JOIN_ROOM;
  id: string;
  users: User[];
  activeGame: string;
}

interface AppUserJoinedRoom {
  type: AppActionType.USER_JOINED_ROOM;
  id: string;
  user: User;
}

interface AppUserLeftRoom {
  type: AppActionType.USER_LEFT_ROOM;
  id: string;
  userId: string;
}

interface AppLeaveRoom {
  type: AppActionType.LEAVE_ROOM;
}

interface AppUpdateNickname {
  type: AppActionType.UPDATE_NICKNAME;
  nickname: string;
}

interface AppUpdatedNickname {
  type: AppActionType.UPDATED_NICKNAME;
  id: string;
  nickname: string;
}

interface AppStartGame {
  type: AppActionType.GAME_START;
  game: string;
}

interface AppStartedGame {
  type: AppActionType.GAME_STARTED;
  game: string;
}

interface AppEndGame {
  type: AppActionType.GAME_END;
}

interface AppEndedGame {
  type: AppActionType.GAME_ENDED;
}

export type AppActions = AppInit | AppOpenWS | AppRetryWS | AppFailedWS | AppUpdateNickname
  | AppJoinRoom | AppLeaveRoom | AppUpdatedNickname | AppCloseWS | AppUserJoinedRoom
  | AppUserLeftRoom | AppStartGame | AppEndGame | AppStartedGame | AppEndedGame;
