import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { WS_MSG } from '../server/types';

export function ofType(...types: string[]): MonoTypeOperatorFunction<WS_MSG> {
  return filter((msg: WS_MSG) => types.includes(msg.type));
}
