import { useCallback, useEffect } from 'react';

import createStore from '../../../stores/createStore';

import reducer from './reducer';
import { AppState } from './types';
import { initApp, leaveRoom, retryWS } from './actions';
import middleware from './middleware';
import listeners from './listeners';

const defaultState = {
  nickname: '',
  isActive: false,
  activeRoom: '',
  hasConnectionError: false,
  userId: '',
};

const appStore = createStore(
  reducer,
  defaultState,
  middleware,
  listeners,
);

function useStore(): [AppState, () => void, () => void] {
  const { dispatch, useStoreState } = appStore;

  const state = useStoreState();

  const retryConnect = useCallback(() => {
    dispatch(retryWS());
  }, [dispatch]);

  const onLeave = useCallback(() => {
    dispatch(leaveRoom());
  }, [dispatch]);

  useEffect(() => {
    if (state.isActive) return;
    dispatch(initApp());
  }, [state.isActive, dispatch])

  return [state, retryConnect, onLeave];
}

export default useStore;
