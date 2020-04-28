import { useEffect } from 'react';

import reducer from './reducer';
import { AppState } from './types';
import { initApp } from './actions';
import middleware from './middleware';
import createStore from '../createStore';

const defaultState = {
  nickname: '',
  isActive: false,
  activeRoom: '',
};

const appStore = createStore(reducer, defaultState, middleware);

function useApp(): [AppState] {
  const [appState, dispatch] = appStore();

  useEffect(() => {
    if (appState.isActive) return;
    dispatch(initApp());
  }, [appState.isActive, dispatch])

  return [appState];
}

export default useApp;
