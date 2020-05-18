import { Character, Player } from '../types';

export enum ReflexDuelActionType {
  REGISTER_PLAYER = 'REGISTER_PLAYER',
  REGISTERED_PLAYER = 'REGISTERED_PLAYER',
  CHANGE_CHARACTER = 'CHANGE_CHARACTER',
  CHANGED_CHARACTER = 'CHANGED_CHARACTER',
}

interface RegisterPlayer {
  type: ReflexDuelActionType.REGISTER_PLAYER;
  id: string;
  character: Character;
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

export type ReflexDuelAction = RegisterPlayer | RegisteredPlayer | ChangeCharacter
  | ChangedCharacter;
