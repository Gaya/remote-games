import { AppState } from './types';
import { AppActions, AppActionType } from './actions';

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionType.INIT:
      return {
        ...state,
        isActive: true,
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
