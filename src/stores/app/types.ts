import { AppActions } from './actions';

export interface AppState {
  nickname: string;
  activeRoom: string;
  isActive: boolean;
  hasConnectionError: boolean;
}

export type AppReducer = (state: AppState, action: AppActions) => AppState;
