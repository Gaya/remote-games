import { Character } from '../types';

export enum ReflexDuelActionType {
  REGISTER_PLAYER = 'REGISTER_PLAYER',
  CHANGE_CHARACTER = 'CHANGE_CHARACTER',
}

interface RegisterPlayer {
  type: ReflexDuelActionType.REGISTER_PLAYER;
  id: string;
}

export function registerPlayer(id: string): RegisterPlayer {
  return {
    type: ReflexDuelActionType.REGISTER_PLAYER,
    id,
  };
}

interface ChangeCharacter {
  type: ReflexDuelActionType.CHANGE_CHARACTER;
  id: string;
  character: Character;
}

export function changeCharacter(id: string, character: Character): ChangeCharacter {
  return {
    type: ReflexDuelActionType.CHANGE_CHARACTER,
    id,
    character,
  };
}

export type ReflexDuelAction = RegisterPlayer | ChangeCharacter;
