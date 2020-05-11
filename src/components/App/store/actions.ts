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

export function initApp(): AppInit {
  return {
    type: AppActionType.INIT,
  };
}

interface AppOpenWS {
  type: AppActionType.OPEN_WS;
  id: string;
}

export function openWS(id: string): AppOpenWS {
  return {
    type: AppActionType.OPEN_WS,
    id,
  };
}

interface AppRetryWS {
  type: AppActionType.RETRY_WS;
}

export function retryWS(): AppRetryWS {
  return {
    type: AppActionType.RETRY_WS,
  };
}

interface AppFailedWS {
  type: AppActionType.FAILED_WS;
}

export function failedWS(): AppFailedWS {
  return {
    type: AppActionType.FAILED_WS,
  };
}

interface AppCloseWS {
  type: AppActionType.CLOSED_WS;
}

export function closedWS(): AppCloseWS {
  return {
    type: AppActionType.CLOSED_WS,
  };
}

interface AppJoinRoom {
  type: AppActionType.JOIN_ROOM;
  id: string;
  users: User[];
  activeGame: string;
}

export function joinRoom(id: string, users: User[], activeGame: string): AppJoinRoom {
  return {
    type: AppActionType.JOIN_ROOM,
    id,
    users,
    activeGame,
  };
}

interface AppUserJoinedRoom {
  type: AppActionType.USER_JOINED_ROOM;
  id: string;
  user: User;
}

export function userJoinedRoom(id: string, user: User): AppUserJoinedRoom {
  return {
    type: AppActionType.USER_JOINED_ROOM,
    id,
    user,
  };
}

interface AppUserLeftRoom {
  type: AppActionType.USER_LEFT_ROOM;
  id: string;
  userId: string;
}

export function userLeftRoom(id: string, userId: string): AppUserLeftRoom {
  return {
    type: AppActionType.USER_LEFT_ROOM,
    id,
    userId,
  };
}

interface AppLeaveRoom {
  type: AppActionType.LEAVE_ROOM;
}

export function leaveRoom(): AppLeaveRoom {
  return {
    type: AppActionType.LEAVE_ROOM,
  };
}

interface AppUpdateNickname {
  type: AppActionType.UPDATE_NICKNAME;
  nickname: string;
}

export function updateNickname(nickname: string): AppUpdateNickname {
  return {
    type: AppActionType.UPDATE_NICKNAME,
    nickname,
  };
}

interface AppUpdatedNickname {
  type: AppActionType.UPDATED_NICKNAME;
  id: string;
  nickname: string;
}

export function updatedNickname(id: string, nickname: string): AppUpdatedNickname {
  return {
    type: AppActionType.UPDATED_NICKNAME,
    id,
    nickname,
  };
}

interface AppStartGame {
  type: AppActionType.GAME_START;
  game: string;
}

export function startGame(game: string): AppStartGame {
  return {
    type: AppActionType.GAME_START,
    game,
  };
}

interface AppStartedGame {
  type: AppActionType.GAME_STARTED;
  game: string;
}

export function startedGame(game: string): AppStartedGame {
  return {
    type: AppActionType.GAME_STARTED,
    game,
  };
}

interface AppEndGame {
  type: AppActionType.GAME_END;
}

export function endGame(): AppEndGame {
  return {
    type: AppActionType.GAME_END,
  };
}

interface AppEndedGame {
  type: AppActionType.GAME_ENDED;
}

export function endedGame(): AppEndedGame {
  return {
    type: AppActionType.GAME_ENDED,
  };
}

export type AppActions = AppInit | AppOpenWS | AppRetryWS | AppFailedWS | AppUpdateNickname
  | AppJoinRoom | AppLeaveRoom | AppUpdatedNickname | AppCloseWS | AppUserJoinedRoom
  | AppUserLeftRoom | AppStartGame | AppEndGame | AppStartedGame | AppEndedGame;
