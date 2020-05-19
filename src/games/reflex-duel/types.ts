import { User } from '../../components/App/store/types';

interface SpriteFrame {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export enum Pose {
  IDLE = 'IDLE',
  STANCE = 'STANCE',
  WIN = 'WIN',
  LOSE = 'LOSE',
}

export enum DuelState {
  IDLE = 'IDLE',
  STRIKE = 'STRIKE',
  WAIT = 'WAIT',
  TIE = 'TIE',
  P1WIN = 'P1WIN',
  P2WIN = 'P2WIN',
  P1TIE = 'P1TIE',
  P2TIE = 'P2TIE',
}

export enum PlayerState {
  WAITING = 'WAITING',
  READY = 'READY',
  INPUT = 'INPUT',
}

export interface PlayerSprite {
  sprite: string;
  [Pose.IDLE]: SpriteFrame;
  [Pose.STANCE]: SpriteFrame;
  [Pose.WIN]: SpriteFrame;
  [Pose.LOSE]: SpriteFrame;
}

export enum Character {
  A = 'A',
  B = 'B',
}

export interface Player {
  id: string;
  character?: Character;
  wins: number;
  loses: number;
}

export type MappedPlayer = Player & User;

export interface MappedPlayers {
  [id: string]: MappedPlayer;
}

export interface GameState {
  isStarted: boolean;
  players: {
    [id: string]: Player;
  };
}

export interface ServerGameState extends GameState {
  duel: {
    state: DuelState;
    participants: {
      [id: string]: PlayerState;
    };
    results: {
      [id: string]: number;
    };
    timeouts: {
      [id: string]: ReturnType<typeof setTimeout>;
    };
  };
}
