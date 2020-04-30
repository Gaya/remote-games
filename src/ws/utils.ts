import { filter } from 'rxjs/operators';

import { WS_MESSAGE, WSActionTypes } from './types';

export function ofType(...types: WSActionTypes[]) {
  return filter((msg: WS_MESSAGE) => types.includes(msg.type));
}
