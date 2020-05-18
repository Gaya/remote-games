import { Character } from '../types';

export enum ReflexDuelActionType {
  REGISTER_PLAYER = 'REGISTER_PLAYER',
  CHANGE_CHARACTER = 'CHANGE_CHARACTER',
}

interface RegisterPlayer {
  type: ReflexDuelActionType.REGISTER_PLAYER;
  id: string;
}

interface ChangeCharacter {
  type: ReflexDuelActionType.CHANGE_CHARACTER;
  id: string;
  character: Character;
}

export type ReflexDuelAction = RegisterPlayer | ChangeCharacter;
