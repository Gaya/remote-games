export enum AppActionType {
  INIT = 'INIT',
  RETRY_WS = 'RETRY_WS',
  OPEN_WS = 'OPEN_WS',
  FAILED_WS = 'FAILED_WS',
  UPDATE_NICKNAME = 'UPDATE_NICKNAME'
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
}

export function openWS(): AppOpenWS {
  return {
    type: AppActionType.OPEN_WS
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

export type AppActions = AppInit | AppOpenWS | AppRetryWS | AppFailedWS | AppUpdateNickname;
