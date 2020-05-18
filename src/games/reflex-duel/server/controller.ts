import { WsUser } from '../../../server/types';

import { WS_REFLEXDUEL_MESSAGE, WSReflexDuelActionTypes } from './actions';

function handleMessage(data: unknown, user: WsUser): void {
  const message = data as WS_REFLEXDUEL_MESSAGE;

  switch (message.type) {
    case WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGE_CHARACTER:
      user;
      return undefined;
    default:
      return undefined;
  }
}

export default handleMessage;
