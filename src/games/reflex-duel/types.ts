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

interface Player {
  id: string;
  character: Character;
  isReady: boolean;
  wins: number;
  loses: number;
}

export type MappedPlayer = Player & User;

export interface MappedPlayers {
  [id: string]: MappedPlayer;
}

export interface GameState {
  players: {
    [id: string]: Player;
  };
}
