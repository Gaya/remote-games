import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { WS_MESSAGE, WSActionTypes } from './actions';

export function ofType(...types: WSActionTypes[]): MonoTypeOperatorFunction<WS_MESSAGE> {
  return filter((msg: WS_MESSAGE) => types.includes(msg.type));
}
