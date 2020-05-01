import { RoomState } from './types';
import { RoomActions, RoomActionType } from './actions';

export const defaultState: RoomState = {
  isCreating: false,
  isJoining: false,
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
    default:
      return state;
  }
}

export default reducer;
