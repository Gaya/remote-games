import { AppActions } from './actions';

export interface AppState {
  nickname: string;
  isActive: boolean;
}

export type AppReducer = (state: AppState, action: AppActions) => AppState;
