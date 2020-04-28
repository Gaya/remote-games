import shortid from 'shortid';

import { WsUser } from './types';

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

  // update user room
  user.currentRoom = '';

  return id;
}
