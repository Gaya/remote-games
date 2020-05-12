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
