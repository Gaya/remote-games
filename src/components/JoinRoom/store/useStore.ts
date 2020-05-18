import { useMemo } from 'react';

import createStore from '../../../core/stores/createStore';

import reducer, { defaultState } from './reducer';
import { RoomState } from './types';
import middleware from './middleware';
import listeners from './listeners';
import { RoomActionType } from './actions';

const appStore = createStore(reducer, defaultState, middleware, listeners);

interface DispatchActions {
  createRoom: () => void;
  joinRoom: (id: string) => void;
}

function useStore(): [RoomState, DispatchActions] {
  const { dispatch, useStoreState } = appStore;

  const state = useStoreState();

  const actions: DispatchActions = useMemo(() => ({
    createRoom(): void {
      dispatch({
        type: RoomActionType.CREATE_ROOM,
      });
    },
    joinRoom(id: string): void {
      dispatch({
        type: RoomActionType.JOIN_ROOM,
        id,
      });
    },
  }), [dispatch]);

  return [state, actions];
}

export default useStore;
