import { RoomState } from './types';
import { RoomActions, RoomActionType } from './actions';

function reducer(state: RoomState, action: RoomActions): RoomState {
  switch (action.type) {
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
