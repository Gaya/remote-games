import React from 'react';

export interface Game {
  id: string;
  name: string;
  cover: string;
  game: React.LazyExoticComponent<React.FC>;
  minPlayers: number;
  maxPlayers: number;
}

export interface Games {
  [id: string]: Game;
}
