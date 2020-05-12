import { Character, GameState } from '../types';
import { ReflexDuelAction, ReflexDuelActionType } from './actions';

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
          [action.id]: {
            id: action.id,
            wins: 0,
            loses: 0,
            isReady: false,
            character: randomCharacter(),
          },
        },
      };
    default:
      return state;
  }
}

export default reducer;
