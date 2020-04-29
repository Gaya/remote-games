export enum AppActionType {
  INIT = 'INIT',
  RETRY_WS = 'RETRY_WS',
  OPEN_WS = 'OPEN_WS',
  FAILED_WS = 'FAILED_WS',
  UPDATE_NICKNAME = 'UPDATE_NICKNAME',
  JOIN_ROOM = 'JOIN_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
}

interface AppInit {
  type: AppActionType.INIT
}

export function initApp(): AppInit {
  return {
    type: AppActionType.INIT
  };
}

interface AppOpenWS {
  type: AppActionType.OPEN_WS
  id: string;
  nickname: string;
}

export function openWS(id: string, nickname: string): AppOpenWS {
  return {
    type: AppActionType.OPEN_WS,
    id,
    nickname,
  };
}

interface AppRetryWS {
  type: AppActionType.RETRY_WS
}

export function retryWS(): AppRetryWS {
  return {
    type: AppActionType.RETRY_WS
  };
}

interface AppFailedWS {
  type: AppActionType.FAILED_WS
}

export function failedWS(): AppFailedWS {
  return {
    type: AppActionType.FAILED_WS
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

interface AppJoinRoom {
  type: AppActionType.JOIN_ROOM;
  id: string;
}

export function joinRoom(id: string): AppJoinRoom {
  return {
    type: AppActionType.JOIN_ROOM,
    id,
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

export type AppActions = AppInit | AppOpenWS | AppRetryWS | AppFailedWS | AppUpdateNickname | AppJoinRoom | AppLeaveRoom;
