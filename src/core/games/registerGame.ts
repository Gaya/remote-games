import { Game } from './types';

import games$ from './subject';

function registerGame(game: Game): void {
  const currentGames = games$.getValue();
  games$.next({
    ...currentGames,
    [game.id]: game,
  });
}

export default registerGame;
