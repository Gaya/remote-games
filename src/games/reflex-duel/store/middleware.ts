import createLogMiddleware from '../../../core/stores/createLogMiddleware';

import { ReflexDuelAction, ReflexDuelActionType } from './actions';
import { sendWSMessage } from '../../../ws/websockets';
import { WSReflexDuelActionTypes } from '../server/actions';

function onChangeCharacters(action: ReflexDuelAction): void {
  if (action.type !== ReflexDuelActionType.CHANGE_CHARACTER) return;

  sendWSMessage({
    type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGE_CHARACTER,
    id: action.id,
    character: action.character,
  });
}

export default [createLogMiddleware('ReflexDuel'), onChangeCharacters];
