import { useMemo } from 'react';

import createStore from '../../../core/stores/createStore';

import reducer from './reducer';
import { AppState } from './types';
import {
  initApp,
  leaveRoom,
  retryWS,
  updateNickname,
} from './actions';
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
  init: () => void;
  retryConnect: () => void;
  leaveRoom: () => void;
  changeNickname: (nickname: string) => void;
}

function useStore(): [AppState, DispatchActions] {
  const { dispatch, useStoreState } = appStore;

  const state = useStoreState();

  const actions: DispatchActions = useMemo(() => ({
    init(): void {
      dispatch(initApp());
    },
    retryConnect(): void {
      dispatch(retryWS());
    },
    leaveRoom(): void {
      dispatch(leaveRoom());
    },
    changeNickname(nickname: string): void {
      dispatch(updateNickname(nickname));
    },
  }), [dispatch]);

  return [state, actions];
}

export default useStore;
