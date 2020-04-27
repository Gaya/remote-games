import { useEffect, useReducer } from 'react';

import reducer from '../../stores/app/reducer';
import { AppState } from '../../stores/app/types';
import { initApp } from '../../stores/app/actions';

const defaultState = {
  nickname: '',
  isActive: false,
};

function useApp(): [AppState] {
  const [appState, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (!appState.isActive) {
      dispatch(initApp());
    }
  }, [appState.isActive])

  return [appState];
}

export default useApp;
