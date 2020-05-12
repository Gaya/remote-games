import React from 'react';

import { Character, PlayerSprite, Pose } from '../../types';

import './Player.css';
import sprites from './sprites';

interface PlayerProps {
  character: Character;
  pose: Pose;
  scale?: number;
  flipped?: boolean;
}

interface PlayerStyle {
  backgroundImage: string;
  backgroundPositionX: number;
  backgroundPositionY: number;
  width: number;
  height: number;
  transform?: string;
}

function styleForPose(sprite: PlayerSprite, pose: Pose, scale = 1, flipped = false): PlayerStyle {
  const box = sprite[pose];

  return {
    backgroundImage: `url(${sprite.sprite})`,
    backgroundPositionX: (box.x1 * scale) * -1,
    backgroundPositionY: (box.y1 * scale) * -1,
    width: (box.x2 * scale) - (box.x1 * scale),
    height: (box.y2 * scale) - (box.y1 * scale),
    transform: flipped ? 'scaleX(-1)' : undefined,
  };
}

const Player: React.FC<PlayerProps> = ({
  character, pose, scale = 2, flipped = false,
}) => {
  const sprite = sprites.get(character);

  if (!sprite) return null;

  return (
    <div className="ReflexDuel__Player" style={{ ...styleForPose(sprite, pose, scale, flipped) }} />
  );
};

export default Player;
