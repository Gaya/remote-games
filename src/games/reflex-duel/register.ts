import React from 'react';

import registerGame from '../../core/games/registerGame';

import cover from './assets/cover.jpg';

const reflexDuelInfo = {
  id: 'reflex-duel',
  name: 'Reflex Duel',
  minPlayers: 2,
  maxPlayers: 2,
  cover,
  game: React.lazy(() => import('./ReflexDuel')),
};

registerGame(reflexDuelInfo);
