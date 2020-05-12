import createStore from '../../../core/stores/createStore';

import { Character, GameState } from '../types';
import reducer from './reducer';
import { changeCharacter, registerPlayer } from './actions';
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
  changeCharacter(id: string, character: Character): void;
}

function useReflexDuel(): [GameState, DispatchActions] {
  const { dispatch, useStoreState } = reflexDuelStore;

  const state = useStoreState();

  const mappedActions: DispatchActions = {
    registerPlayer(id: string) {
      dispatch(registerPlayer(id));
    },
    changeCharacter(id: string, character: Character) {
      dispatch(changeCharacter(id, character));
    },
  };

  return [state, mappedActions];
}

export default useReflexDuel;
