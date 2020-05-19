import { Character, Player } from '../types';

export enum ReflexDuelActionType {
  REGISTER_PLAYER = 'REGISTER_PLAYER',
  REGISTERED_PLAYER = 'REGISTERED_PLAYER',
  CHANGE_CHARACTER = 'CHANGE_CHARACTER',
  CHANGED_CHARACTER = 'CHANGED_CHARACTER',
  START_DUEL = 'START_DUEL',
  PLAYER_READY = 'PLAYER_READY',
}

interface RegisterPlayer {
  type: ReflexDuelActionType.REGISTER_PLAYER;
  id: string;
}

interface RegisteredPlayer {
  type: ReflexDuelActionType.REGISTERED_PLAYER;
  player: Player;
}

interface ChangeCharacter {
  type: ReflexDuelActionType.CHANGE_CHARACTER;
  id: string;
  character: Character;
}

interface ChangedCharacter {
  type: ReflexDuelActionType.CHANGED_CHARACTER;
  id: string;
  character: Character;
}

interface StartDuel {
  type: ReflexDuelActionType.START_DUEL;
}

interface PlayerReady {
  type: ReflexDuelActionType.PLAYER_READY;
}

export type ReflexDuelAction = RegisterPlayer | RegisteredPlayer | ChangeCharacter
  | ChangedCharacter | StartDuel | PlayerReady;
