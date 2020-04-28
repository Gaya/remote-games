import { WS_MESSAGE, WSActionTypes } from './types';
import { filter } from 'rxjs/operators';

export function ofType(...types: WSActionTypes[]) {
  return filter((msg: WS_MESSAGE) => types.includes(msg.type));
}
