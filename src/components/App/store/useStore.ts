import { useEffect, useMemo } from 'react';

import createStore from '../../../stores/createStore';

import reducer from './reducer';
import { AppState } from './types';
import {
  initApp,
  retryWS,
  updateNickname,
} from './actions';
import middleware from './middleware';
import listeners from './listeners';

const defaultState = {
  app: {
    isActive: false,
    activeRoom: '',
    hasConnectionError: false,
    userId: '',
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
  retryConnect: () => void;
  leaveRoom: () => void;
  changeNickname: (nickname: string) => void;
}

function useStore(): [AppState, DispatchActions] {
  const { dispatch, useStoreState } = appStore;

  const state = useStoreState();

  const actions: DispatchActions = useMemo(() => ({
    retryConnect: (): void => {
      dispatch(retryWS());
    },
    leaveRoom: (): void => {
      dispatch(retryWS());
    },
    changeNickname: (nickname: string): void => {
      dispatch(updateNickname(nickname));
    },
  }), [dispatch]);

  useEffect(() => {
    if (state.app.isActive) return;
    dispatch(initApp());
  }, [state.app.isActive, dispatch]);

  return [state, actions];
}

export default useStore;
