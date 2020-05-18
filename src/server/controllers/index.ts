import { WS_MSG, WsUser } from '../types';

import general from './general';

import reflexDuel from '../../games/reflex-duel/server/controller';

function handleMessage(data: WS_MSG, user: WsUser): void {
  [general, reflexDuel].forEach((f) => f(data, user));
}

export default handleMessage;
