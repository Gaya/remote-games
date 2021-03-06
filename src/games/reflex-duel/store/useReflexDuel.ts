import createStore from '../../../core/stores/createStore';

import { Character, GameState } from '../types';
import reducer from './reducer';
import { ReflexDuelActionType } from './actions';
import middleware from './middleware';
import listeners from './listeners';

const defaultState: GameState = {
  isStarted: false,
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
  startDuel(): void;
  playerReady(): void;
  onStrikeInput(speed: number): void;
}

function useReflexDuel(): [GameState, DispatchActions] {
  const { dispatch, useStoreState } = reflexDuelStore;

  const state = useStoreState();

  const mappedActions: DispatchActions = {
    registerPlayer(id: string) {
      dispatch({
        type: ReflexDuelActionType.REGISTER_PLAYER,
        id,
      });
    },
    changeCharacter(id: string, character: Character) {
      dispatch({
        type: ReflexDuelActionType.CHANGE_CHARACTER,
        id,
        character,
      });
    },
    startDuel() {
      dispatch({ type: ReflexDuelActionType.START_DUEL });
    },
    playerReady() {
      dispatch({ type: ReflexDuelActionType.PLAYER_READY });
    },
    onStrikeInput(speed: number) {
      dispatch({
        type: ReflexDuelActionType.STRIKE_INPUT,
        speed,
      });
    },
  };

  return [state, mappedActions];
}

export default useReflexDuel;
