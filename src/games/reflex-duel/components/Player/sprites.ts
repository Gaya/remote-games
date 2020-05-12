import CharacterA from '../../assets/characters/A.png';
import CharacterB from '../../assets/characters/B.png';

import { Character, PlayerSprite, Pose } from '../../types';

const a: PlayerSprite = {
  sprite: CharacterA,
  [Pose.IDLE]: {
    x1: 0,
    x2: 71,
    y1: 0,
    y2: 120,
  },
  [Pose.STANCE]: {
    x1: 72,
    x2: 159,
    y1: 0,
    y2: 120,
  },
  [Pose.WIN]: {
    x1: 160,
    x2: 284,
    y1: 0,
    y2: 120,
  },
  [Pose.LOSE]: {
    x1: 285,
    x2: 360,
    y1: 0,
    y2: 120,
  },
};

const b: PlayerSprite = {
  sprite: CharacterB,
  [Pose.IDLE]: {
    x1: 0,
    x2: 76,
    y1: 0,
    y2: 128,
  },
  [Pose.STANCE]: {
    x1: 77,
    x2: 174,
    y1: 0,
    y2: 128,
  },
  [Pose.WIN]: {
    x1: 175,
    x2: 290,
    y1: 0,
    y2: 128,
  },
  [Pose.LOSE]: {
    x1: 291,
    x2: 424,
    y1: 0,
    y2: 128,
  },
};

const Sprites: Map<Character, PlayerSprite> = new Map();

Sprites.set(Character.A, a);
Sprites.set(Character.B, b);

export default Sprites;
