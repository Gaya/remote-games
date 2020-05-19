import createLogMiddleware from '../../../core/stores/createLogMiddleware';

import { ReflexDuelAction, ReflexDuelActionType } from './actions';
import { sendWSMessage } from '../../../ws/websockets';
import { WSReflexDuelActionTypes } from '../server/actions';

function onRegisterPlayer(action: ReflexDuelAction): void {
  if (action.type !== ReflexDuelActionType.REGISTER_PLAYER) return;

  sendWSMessage({ type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTER_PLAYER });
}

function onChangeCharacter(action: ReflexDuelAction): void {
  if (action.type !== ReflexDuelActionType.CHANGE_CHARACTER) return;

  sendWSMessage({
    type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGE_CHARACTER,
    character: action.character,
  });
}

function onStartDuel(action: ReflexDuelAction): void {
  if (action.type !== ReflexDuelActionType.START_DUEL) return;

  sendWSMessage({
    type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_START_DUEL,
  });
}

function onPlayerReady(action: ReflexDuelAction): void {
  if (action.type !== ReflexDuelActionType.PLAYER_READY) return;

  sendWSMessage({
    type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_PLAYER_READY,
  });
}

function onStrikeInput(action: ReflexDuelAction): void {
  if (action.type !== ReflexDuelActionType.STRIKE_INPUT) return;

  sendWSMessage({
    type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_STRIKE_INPUT,
    speed: action.speed,
  });
}

export default [
  createLogMiddleware('ReflexDuel'),
  onRegisterPlayer,
  onChangeCharacter,
  onStartDuel,
  onPlayerReady,
  onStrikeInput,
];
