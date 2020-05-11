import {
  App, AppState, Rooms, Users,
} from './types';
import { AppActions, AppActionType } from './actions';
import { replaceAtId } from '../../../core/stores/utils';

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
    case AppActionType.CLOSED_WS:
      return {
        ...state,
        isActive: false,
        hasConnectionError: true,
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
    case AppActionType.UPDATED_NICKNAME:
      return {
        ...state,
        hasNickname: true,
      };
    default:
      return state;
  }
}

function users(state: Users, action: AppActions, root: AppState): Users {
  switch (action.type) {
    case AppActionType.OPEN_WS:
      return replaceAtId(state, {
        ...state[action.id],
        id: action.id,
      });
    case AppActionType.USER_JOINED_ROOM:
      return replaceAtId(state, {
        ...state[action.id],
        id: action.user.id,
        nickname: action.user.nickname,
      });
    case AppActionType.UPDATED_NICKNAME:
    case AppActionType.UPDATE_NICKNAME:
      return replaceAtId(state, {
        ...state[root.app.userId],
        id: root.app.userId,
        nickname: action.nickname,
      });
    case AppActionType.JOIN_ROOM:
      return action.users.reduce((acc, user): Users => replaceAtId(acc, {
        ...acc[user.id],
        id: user.id,
        nickname: user.nickname,
      }), state);
    default:
      return state;
  }
}

function rooms(state: Rooms, action: AppActions, root: AppState): Rooms {
  switch (action.type) {
    case AppActionType.USER_LEFT_ROOM:
      return replaceAtId(state, {
        ...state[action.id],
        id: action.id,
        users: state[action.id].users.filter((u) => u !== action.userId),
      });
    case AppActionType.USER_JOINED_ROOM:
      return replaceAtId(state, {
        ...state[action.id],
        id: action.id,
        users: [...state[action.id].users, action.user.id],
      });
    case AppActionType.JOIN_ROOM:
      return replaceAtId(state, {
        ...state[action.id],
        id: action.id,
        users: action.users.map((u) => u.id),
        activeGame: action.activeGame,
      });
    case AppActionType.GAME_START:
    case AppActionType.GAME_STARTED:
      return replaceAtId(state, {
        ...state[root.app.activeRoom],
        activeGame: action.game,
      });
    case AppActionType.GAME_END:
    case AppActionType.GAME_ENDED:
      return replaceAtId(state, {
        ...state[root.app.activeRoom],
        activeGame: '',
      });
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
