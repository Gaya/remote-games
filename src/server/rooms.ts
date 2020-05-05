import shortid from 'shortid';

import { WsUser, WsUserInfo } from './types';
import { log } from './logging';

const currentRooms: { [id: string]: WsUser[] | undefined } = {};

export function roomUsers(id: string): WsUser[] {
  return currentRooms[id] || [];
}

export function roomUsersWithoutUser(id: string, userId: string): WsUser[] {
  return roomUsers(id)
    .filter((u) => u.id !== userId);
}

export function roomUsersWithInfo(id: string): WsUserInfo[] {
  return roomUsers(id).map((user) => ({ id: user.id, nickname: user.nickname }));
}

export function createRoom(user: WsUser): string {
  const id = shortid.generate();

  currentRooms[id] = [];

  return joinRoom(id, user);
}

export function joinRoom(id: string, user: WsUser): string {
  if (!currentRooms[id]) {
    throw new Error(`Room '${id}' does not exist`);
  }

  // put user in room
  currentRooms[id] = [...(currentRooms[id] || []), user];

  // update user room
  user.setCurrentRoom(id);

  return id;
}

export function leaveRoom(id: string, user: WsUser): string {
  // remove user from room
  currentRooms[id] = (currentRooms[id] || []).filter((u) => u.id !== user.id);

  // remove room if empty
  if ((currentRooms[id] || []).length === 0) {
    delete currentRooms[id];
    log('Removing empty room:', id);
  }

  // update user room
  user.setCurrentRoom('');

  return id;
}
