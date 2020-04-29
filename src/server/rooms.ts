import shortid from 'shortid';

import { WsUser } from './types';
import { log } from './logging';

const currentRooms: { [id: string]: WsUser[] } = {};

export function createRoom(user: WsUser): string {
  const id = shortid.generate();

  currentRooms[id] = [];

  return joinRoom(id, user);
}

export function joinRoom(id: string, user: WsUser): string {
  // put user in room
  currentRooms[id] = [...currentRooms[id], user];

  // update user room
  user.currentRoom = id;

  return id;
}

export function leaveRoom(id: string, user: WsUser): string {
  // remove user from room
  currentRooms[id] = currentRooms[id].filter(u => u.id !== user.id);

  // remove room if empty
  if (currentRooms[id].length === 0) {
    delete currentRooms[id];
    log('Removing empty room:', id);
  }

  // update user room
  user.currentRoom = '';

  return id;
}
