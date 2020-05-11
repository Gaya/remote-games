import { useEffect, useMemo, useState } from 'react';

import { Game, Games } from './types';

import games$ from './subject';

function useGames(): [Game[], Games] {
  const [games, setGames] = useState<Games>(games$.getValue());

  const gameList = useMemo(() => Object.entries(games).map(([, game]) => game), [games]);

  useEffect(() => {
    const subscription = games$.subscribe((newState) => {
      setGames(newState);
    });

    return (): void => subscription.unsubscribe();
  });

  return [gameList, games];
}

export default useGames;
