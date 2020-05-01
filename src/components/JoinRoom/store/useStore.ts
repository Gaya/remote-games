import { useCallback } from 'react';

import createStore from '../../../stores/createStore';

import reducer, { defaultState } from './reducer';
import { RoomState } from './types';
import middleware from './middleware';
import listeners from './listeners';
import { createRoom, joinRoom } from './actions';

const appStore = createStore(reducer, defaultState, middleware, listeners);

function useStore(): [RoomState, () => void, (id: string) => void] {
  const { dispatch, useStoreState } = appStore;

  const state = useStoreState();

  const onCreateRoom = useCallback(() => {
    dispatch(createRoom());
  }, [dispatch]);

  const onJoinRoom = useCallback((id: string) => {
    dispatch(joinRoom(id));
  }, [dispatch]);

  return [state, onCreateRoom, onJoinRoom];
}

export default useStore;
