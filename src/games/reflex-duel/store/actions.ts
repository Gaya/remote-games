export enum ReflexDuelActionType {
  REGISTER_PLAYER = 'REGISTER_PLAYER',
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

export type ReflexDuelAction = RegisterPlayer;
