import { Character } from '../types';

export enum WSReflexDuelActionTypes {
  'WS_REFLEX_DUEL_CHANGE_CHARACTER' = 'WS_REFLEX_DUEL_CHANGE_CHARACTER',
}

interface ChangeCharacter {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGE_CHARACTER;
  id: string;
  character: Character;
}

export type WSReflexDuel = ChangeCharacter;
