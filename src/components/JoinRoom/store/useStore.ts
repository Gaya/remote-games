import { useCallback, useMemo } from 'react';

import createStore from '../../../stores/createStore';

import reducer, { defaultState } from './reducer';
import { RoomState } from './types';
import middleware from './middleware';
import listeners from './listeners';
import { createRoom, joinRoom } from './actions';

const appStore = createStore(reducer, defaultState, middleware, listeners);

interface DispatchActions {
  createRoom: () => void;
  joinRoom: (id: string) => void;
}

function useStore(): [RoomState, DispatchActions] {
  const { dispatch, useStoreState } = appStore;

  const state = useStoreState();

  const actions: DispatchActions = useMemo(() => ({
    createRoom: (): void => {
      dispatch(createRoom());
    },
    joinRoom: (id: string): void => {
      dispatch(joinRoom(id));
    },
  }), [dispatch]);

  return [state, actions];
}

export default useStore;
