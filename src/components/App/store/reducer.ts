import {
  App,
  AppState,
  Rooms,
  Users,
} from './types';
import { AppActions, AppActionType } from './actions';

function app(state: App, action: AppActions): App {
  switch (action.type) {
    case AppActionType.LEAVE_ROOM:
      return {
        ...state,
        activeRoom: '',
      };
    case AppActionType.JOIN_ROOM:
      return {
        ...state,
        activeRoom: action.id,
      };
    case AppActionType.OPEN_WS:
      return {
        ...state,
        isActive: true,
        userId: action.id,
      };
    case AppActionType.FAILED_WS:
      return {
        ...state,
        hasConnectionError: true,
      };
    case AppActionType.RETRY_WS:
      return {
        ...state,
        hasConnectionError: false,
      };
    default:
      return state;
  }
}

function users(state: Users, action: AppActions, root: AppState): Users {
  switch (action.type) {
    case AppActionType.OPEN_WS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          nickname: action.nickname,
        },
      };
    case AppActionType.UPDATE_NICKNAME:
      return {
        ...state,
        [root.app.userId]: {
          ...state[root.app.userId],
          nickname: action.nickname,
        },
      };
    default:
      return state;
  }
}

function rooms(state: Rooms, action: AppActions, root: AppState): Rooms {
  switch (action.type) {
    case AppActionType.JOIN_ROOM:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          users: [root.app.userId],
        },
      };
    default:
      return state;
  }
}

function reducer(state: AppState, action: AppActions): AppState {
  return {
    app: app(state.app, action),
    users: users(state.users, action, state),
    rooms: rooms(state.rooms, action, state),
  };
}

export default reducer;
