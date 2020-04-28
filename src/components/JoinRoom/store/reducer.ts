import { RoomState } from './types';
import { RoomActions, RoomActionType } from './actions';
import { defaultState } from './useStore';

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
