import { Character, Player } from './types';

export function createPlayer(id: string, character: Character): Player {
  return {
    id,
    wins: 0,
    loses: 0,
    isReady: false,
    character,
  };
}

export function randomCharacter(): Character {
  const characters: Character[] = [
    Character.A,
    Character.B,
  ];

  return characters[Math.floor(Math.random() * characters.length)];
}
