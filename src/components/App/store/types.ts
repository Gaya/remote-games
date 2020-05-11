import { Game } from '../../../core/games/types';

export interface AppState {
  app: App;
  users: Users;
  rooms: Rooms;
}

export interface App {
  isActive: boolean;
  hasNickname: boolean;
  hasConnectionError: boolean;
  userId: string;
  activeRoom: Room['id'];
}

export interface User {
  id: string;
  nickname: string;
}

export interface Users {
  [id: string]: User;
}

export interface Room {
  id: string;
  users: string[];
  activeGame: Game['id'];
}

export interface Rooms {
  [id: string]: Room;
}

export enum LocalStorageKeys {
  nickname = 'RG_NICKNAME'
}
