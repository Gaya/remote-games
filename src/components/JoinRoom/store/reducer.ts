import { RoomState } from './types';
import { RoomActions, RoomActionType } from './actions';

export const defaultState: RoomState = {
  isCreating: false,
  createError: '',
  isJoining: false,
  joinError: '',
};

function reducer(state: RoomState, action: RoomActions): RoomState {
  switch (action.type) {
    case RoomActionType.RESET:
      return defaultState;
    case RoomActionType.CREATE_ROOM:
      return {
        ...state,
        isCreating: true,
      };
    case RoomActionType.CREATE_ROOM_FAILED:
      return {
        ...state,
        isCreating: false,
        createError: action.error,
      };
    case RoomActionType.JOIN_ROOM_FAILED:
      return {
        ...state,
        isJoining: false,
        joinError: action.error,
      };
    default:
      return state;
  }
}

export default reducer;
