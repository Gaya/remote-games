import {
  Dispatch,
  useEffect,
  useState,
} from 'react';
import { BehaviorSubject, Subject } from 'rxjs';

import { websocketMessages$ } from '../../ws/websockets';
import { WS_MSG } from '../../server/types';

interface Store<SS, SA> {
  state$: BehaviorSubject<SS>;
  dispatch: (action: SA) => void;
  useStoreState: () => SS;
}

export type WebsocketListener<SS, SA, WSM> =
  (wsm$: Subject<WSM>, dispatch: Dispatch<SA>, ss$: Subject<SS>) => void;

/*
  Creates a store hook which can be used as a hook in functional components

  SS: StoreState
  SA: StoreActions
 */
export default function createStore<SS, SA>(
  reducer: (state: SS, action: SA) => SS,
  initialState: SS,
  middleware: ((action: SA, state: SS, dispatch: Dispatch<SA>, nextState: SS) => void)[] = [],
  websocketListeners: WebsocketListener<SS, SA, WS_MSG>[] = [],
): Store<SS, SA> {
  const storeState$ = new BehaviorSubject<SS>(initialState);

  const dispatch = (action: SA): void => {
    const currentState = storeState$.getValue();

    // calc next state
    const nextState = reducer(currentState, action);

    // handle middlewares
    middleware.forEach((m) => m(action, currentState, delayedDispatch, nextState));

    // update state
    storeState$.next(nextState);
  };

  const delayedDispatch = (action: SA): void => {
    window.requestAnimationFrame(() => dispatch(action));
  };

  websocketListeners.forEach(
    (listener) => listener(websocketMessages$, delayedDispatch, storeState$),
  );

  return {
    state$: storeState$,
    dispatch,
    useStoreState: (): SS => {
      const [state, setState] = useState<SS>(initialState);

      useEffect(() => {
        const subscription = storeState$.subscribe((value) => {
          setState(value);
        });

        return (): void => subscription.unsubscribe();
      }, []);

      return state;
    },
  };
}
