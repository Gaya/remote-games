export interface AppState {
  app: App;
  users: Users;
  rooms: Rooms;
}

export interface App {
  isActive: boolean;
  hasConnectionError: boolean;
  userId: string;
  activeRoom: string;
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
}

export interface Rooms {
  [id: string]: Room;
}
