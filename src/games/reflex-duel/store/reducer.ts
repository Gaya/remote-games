import { GameState } from '../types';
import { ReflexDuelAction, ReflexDuelActionType } from './actions';
import { replaceAtId } from '../../../core/stores/utils';
import { createPlayer } from '../utils';

function reducer(state: GameState, action: ReflexDuelAction): GameState {
  switch (action.type) {
    case ReflexDuelActionType.REGISTERED_PLAYER:
      return {
        ...state,
        players: {
          ...state.players,
          [action.player.id]: action.player,
        },
      };
    case ReflexDuelActionType.REGISTER_PLAYER:
      return {
        ...state,
        players: {
          ...state.players,
          [action.id]: createPlayer(action.id),
        },
      };
    case ReflexDuelActionType.CHANGE_CHARACTER:
    case ReflexDuelActionType.CHANGED_CHARACTER:
      return {
        ...state,
        players: replaceAtId(state.players, {
          ...state.players[action.id],
          character: action.character,
        }),
      };
    default:
      return state;
  }
}

export default reducer;
