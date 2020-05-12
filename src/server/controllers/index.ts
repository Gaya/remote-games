import { WS_MESSAGE } from '../../ws/actions';
import { WsUser } from '../types';

import general from './general';

function handleMessage(data: WS_MESSAGE, user: WsUser): void {
  [general].forEach((f) => f(data, user));
}

export default handleMessage;
