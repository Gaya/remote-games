import createLogMiddleware from '../../../core/stores/createLogMiddleware';

import { ReflexDuelAction, ReflexDuelActionType } from './actions';
import { sendWSMessage } from '../../../ws/websockets';
import { WSReflexDuelActionTypes } from '../server/actions';

function onRegisterPlayer(action: ReflexDuelAction): void {
  if (action.type !== ReflexDuelActionType.REGISTER_PLAYER) return;

  sendWSMessage({
    type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTER_PLAYER,
    character: action.character,
  });
}

function onChangeCharacter(action: ReflexDuelAction): void {
  if (action.type !== ReflexDuelActionType.CHANGE_CHARACTER) return;

  sendWSMessage({
    type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGE_CHARACTER,
    character: action.character,
  });
}

export default [createLogMiddleware('ReflexDuel'), onRegisterPlayer, onChangeCharacter];
