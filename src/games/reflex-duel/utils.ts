import { Player } from './types';

export function createPlayer(id: string): Player {
  return {
    id,
    wins: 0,
    loses: 0,
  };
}
