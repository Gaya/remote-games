import { Dispatch, useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

/*
  Creates a store hook which can be used as a hook in functional components

  SS: StoreState
  SA: StoreActions
 */
export default function createStore<SS, SA>(
  reducer: (state: SS, action: SA) => SS,
  initialState: SS,
  middleware: ((state: SS, action: SA, dispatch: Dispatch<SA>) => void)[] = [],
) {
  const storeState$ = new BehaviorSubject<SS>(initialState);

  const dispatch = (action: SA) => {
    const currentState = storeState$.getValue();

    // handle middlewares
    middleware.forEach(m => m(currentState, action, delayedDispatch));

    // calc next state
    const nextState = reducer(currentState, action);

    // update state
    storeState$.next(nextState);
  };

  const delayedDispatch = (action: SA) => window.requestAnimationFrame(() => dispatch(action));

  return {
    state$: storeState$,
    dispatch,
    useStoreState: () => {
      const [state, setState] = useState<SS>(initialState);

      useEffect(() => {
        const subscription = storeState$.subscribe((value) => {
          setState(value);
        });

        return () => subscription.unsubscribe();
      }, []);

      return state;
    }
  }
}
