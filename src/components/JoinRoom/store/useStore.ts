import createStore from '../../../stores/createStore';

import reducer from './reducer';
import { RoomState } from './types';
import middleware from './middleware';
import { useCallback } from 'react';
import { createRoom, joinRoom } from './actions';

const defaultState: RoomState = {
  isCreating: false,
  isJoining: false,
};

const appStore = createStore(reducer, defaultState, middleware);

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
