import { Character, GameState } from '../types';
import { ReflexDuelAction, ReflexDuelActionType } from './actions';
import { replaceAtId } from '../../../core/stores/utils';

function randomCharacter(): Character {
  const characters: Character[] = [
    Character.A,
    Character.B,
  ];

  return characters[Math.floor(Math.random() * characters.length)];
}

function reducer(state: GameState, action: ReflexDuelAction): GameState {
  switch (action.type) {
    case ReflexDuelActionType.REGISTER_PLAYER:
      return {
        ...state,
        players: {
          ...state.players,
          [action.id]: {
            id: action.id,
            wins: 0,
            loses: 0,
            isReady: false,
            character: randomCharacter(),
          },
        },
      };
    case ReflexDuelActionType.CHANGE_CHARACTER:
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
