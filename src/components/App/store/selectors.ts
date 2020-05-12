import { useMemo } from 'react';

import {
  AppState, Room, User, Users,
} from './types';

export function useCurrentUser(state: AppState): User | undefined {
  return useMemo(
    (): User | undefined => state.users[state.app.userId],
    [state.users, state.app.userId],
  );
}

export function useCurrentRoom(state: AppState): Room | undefined {
  return useMemo(
    (): Room | undefined => state.rooms[state.app.activeRoom],
    [state.rooms, state.app.activeRoom],
  );
}

export function useMappedUsers(state: AppState, users: string[] = []): User[] {
  return useMemo(() => users
    .map((id): User => state.users[id])
    .filter((user) => typeof user !== 'undefined'), [state.users, users]);
}

export function useMappedUserDict(state: AppState, users: string[] = []): Users {
  return useMemo(() => users
    .reduce((acc, id): Users => ({
      ...acc,
      [id]: { ...state.users[id] },
    }), {}), [state.users, users]);
}
