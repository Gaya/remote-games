import { useCallback, useEffect } from 'react';

import reducer from './reducer';
import { AppState } from './types';
import { initApp, retryWS } from './actions';
import middleware from './middleware';
import createStore from '../createStore';

const defaultState = {
  nickname: '',
  isActive: false,
  activeRoom: '',
  hasConnectionError: false,
};

const appStore = createStore(reducer, defaultState, middleware);

function useApp(): [AppState, () => void] {
  const { dispatch, useStoreState } = appStore;

  const state = useStoreState();

  const retryConnect = useCallback(() => {
    dispatch(retryWS());
  }, [dispatch]);

  useEffect(() => {
    if (state.isActive) return;
    dispatch(initApp());
  }, [state.isActive, dispatch])

  return [state, retryConnect];
}

export default useApp;
