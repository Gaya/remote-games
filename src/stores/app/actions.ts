export enum AppActionType {
  INIT = 'INIT',
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

export type AppActions = AppInit | AppUpdateNickname;
