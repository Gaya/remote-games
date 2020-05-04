import { AppState, Room, User } from './types';

export function currentUser(state: AppState): User | undefined {
  return state.users[state.app.userId];
}

export function currentRoom(state: AppState): Room | undefined {
  return state.rooms[state.app.activeRoom];
}
