import { AppState } from './types';
import { AppActions, AppActionType } from './actions';

function reducer(state: AppState, action: AppActions): AppState {
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
    case AppActionType.UPDATE_NICKNAME:
      return {
        ...state,
        nickname: action.nickname,
      };
    default:
      return state;
  }
}

export default reducer;
