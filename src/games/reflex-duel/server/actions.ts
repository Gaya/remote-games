import { Character, Player } from '../types';

export enum WSReflexDuelActionTypes {
  'WS_REFLEX_DUEL_REGISTER_PLAYER' = 'WS_REFLEX_DUEL_REGISTER_PLAYER',
  'WS_REFLEX_DUEL_REGISTERED_PLAYER' = 'WS_REFLEX_DUEL_REGISTERED_PLAYER',
  'WS_REFLEX_DUEL_CHANGE_CHARACTER' = 'WS_REFLEX_DUEL_CHANGE_CHARACTER',
  'WS_REFLEX_DUEL_CHANGED_CHARACTER' = 'WS_REFLEX_DUEL_CHANGED_CHARACTER',
  'WS_REFLEX_DUEL_START_DUEL' = 'WS_REFLEX_DUEL_START_DUEL',
}

interface RegisterPlayer {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTER_PLAYER;
}

interface RegisteredPlayer {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTERED_PLAYER;
  player: Player;
}

interface ChangeCharacter {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGE_CHARACTER;
  character: Character;
}

interface ChangedCharacter {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGED_CHARACTER;
  id: string;
  character: Character;
}

interface StartDuel {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_START_DUEL;
}

export type WS_REFLEXDUEL_MESSAGE = RegisterPlayer | RegisteredPlayer | ChangeCharacter
  | ChangedCharacter | StartDuel;
