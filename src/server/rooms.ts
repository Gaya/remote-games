import shortid from 'shortid';

import { WsUser } from './types';

const currentRooms: { [id: string]: WsUser[] } = {};

export function createRoom(user: WsUser): string {
  const id = shortid.generate();

  currentRooms[id] = [];

  return joinRoom(id, user);
}

export function joinRoom(id: string, user: WsUser): string {
  currentRooms[id] = [...currentRooms[id], user];

  return id;
}
