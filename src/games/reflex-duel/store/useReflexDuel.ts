import createStore from '../../../core/stores/createStore';

import { GameState } from '../types';
import reducer from './reducer';
import { registerPlayer } from './actions';
import middleware from './middleware';

const defaultState: GameState = {
  players: {},
};

const reflexDuelStore = createStore(
  reducer,
  defaultState,
  middleware,
);

interface DispatchActions {
  registerPlayer(id: string): void;
}

function useReflexDuel(): [GameState, DispatchActions] {
  const { dispatch, useStoreState } = reflexDuelStore;

  const state = useStoreState();

  const mappedActions: DispatchActions = {
    registerPlayer(id: string) {
      dispatch(registerPlayer(id));
    },
  };

  return [state, mappedActions];
}

export default useReflexDuel;
