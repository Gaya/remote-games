import { Character, Player } from '../types';

export enum WSReflexDuelActionTypes {
  'WS_REFLEX_DUEL_REGISTER_PLAYER' = 'WS_REFLEX_DUEL_REGISTER_PLAYER',
  'WS_REFLEX_DUEL_REGISTERED_PLAYER' = 'WS_REFLEX_DUEL_REGISTERED_PLAYER',
  'WS_REFLEX_DUEL_CHANGE_CHARACTER' = 'WS_REFLEX_DUEL_CHANGE_CHARACTER',
  'WS_REFLEX_DUEL_CHANGED_CHARACTER' = 'WS_REFLEX_DUEL_CHANGED_CHARACTER',
  'WS_REFLEX_DUEL_START_DUEL' = 'WS_REFLEX_DUEL_START_DUEL',
  'WS_REFLEX_DUEL_PLAYER_READY' = 'WS_REFLEX_DUEL_PLAYER_READY',
  'WS_REFLEX_DUEL_STRIKE_NOW' = 'WS_REFLEX_DUEL_STRIKE_NOW',
  'WS_REFLEX_DUEL_STRIKE_INPUT' = 'WS_REFLEX_DUEL_STRIKE_INPUT',
  'WS_REFLEX_DUEL_CALL_WINNER' = 'WS_REFLEX_DUEL_CALL_WINNER',
  'WS_REFLEX_DUEL_CALL_TIE' = 'WS_REFLEX_DUEL_CALL_TIE',
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

interface PlayerReady {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_PLAYER_READY;
}

interface StrikeNow {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_STRIKE_NOW;
}

interface StrikeInput {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_STRIKE_INPUT;
  speed: number;
}

interface CallWinner {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CALL_WINNER;
  id: string;
}

interface CallTie {
  type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CALL_TIE;
  id?: string;
}

export type WS_REFLEXDUEL_MESSAGE = RegisterPlayer | RegisteredPlayer | ChangeCharacter
  | ChangedCharacter | StartDuel | PlayerReady | StrikeNow | StrikeInput | CallWinner | CallTie;
