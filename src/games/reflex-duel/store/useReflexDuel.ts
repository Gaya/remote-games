import createStore from '../../../core/stores/createStore';

import { Character, GameState } from '../types';
import reducer from './reducer';
import { ReflexDuelActionType } from './actions';
import middleware from './middleware';
import { randomCharacter } from '../utils';
import listeners from './listeners';

const defaultState: GameState = {
  players: {},
};

const reflexDuelStore = createStore(
  reducer,
  defaultState,
  middleware,
  listeners,
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
      dispatch({
        type: ReflexDuelActionType.REGISTER_PLAYER,
        id,
        character: randomCharacter(),
      });
    },
    changeCharacter(id: string, character: Character) {
      dispatch({
        type: ReflexDuelActionType.CHANGE_CHARACTER,
        id,
        character,
      });
    },
  };

  return [state, mappedActions];
}

export default useReflexDuel;
