import { useMemo } from 'react';

import createStore from '../../../core/stores/createStore';

import reducer from './reducer';
import { AppState } from './types';
import { AppActionType } from './actions';
import middleware from './middleware';
import listeners from './listeners';

const defaultState = {
  app: {
    isActive: false,
    hasNickname: false,
    hasConnectionError: false,
    userId: '',
    activeRoom: '',
  },
  users: {},
  rooms: {},
};

const appStore = createStore(
  reducer,
  defaultState,
  middleware,
  listeners,
);

interface DispatchActions {
  init(): void;
  retryConnect(): void;
  leaveRoom(): void;
  changeNickname(nickname: string): void;
  startGame(game: string): void;
  endGame(): void;
}

function useStore(): [AppState, DispatchActions] {
  const { dispatch, useStoreState } = appStore;

  const state = useStoreState();

  const actions: DispatchActions = useMemo(() => ({
    init(): void {
      dispatch({ type: AppActionType.INIT });
    },
    retryConnect(): void {
      dispatch({ type: AppActionType.RETRY_WS });
    },
    leaveRoom(): void {
      dispatch({ type: AppActionType.LEAVE_ROOM });
    },
    changeNickname(nickname: string): void {
      dispatch({
        type: AppActionType.UPDATE_NICKNAME,
        nickname,
      });
    },
    startGame(game: string): void {
      dispatch({
        type: AppActionType.GAME_START,
        game,
      });
    },
    endGame(): void {
      dispatch({ type: AppActionType.GAME_END });
    },
  }), [dispatch]);

  return [state, actions];
}

export default useStore;
