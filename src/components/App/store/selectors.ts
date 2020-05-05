import { useMemo } from 'react';

import { AppState, Room, User } from './types';

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
