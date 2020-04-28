import { Dispatch, useEffect, useReducer } from 'react';

/*
  Creates a store hook which can be used as a hook in functional components

  SS: StoreState
  SA: StoreActions
 */
export default function createStore<SS, SA>(
  reducer: (state: SS, action: SA) => SS,
  initialState: SS,
  middleware?: ((state: SS, action: SA, dispatch: Dispatch<SA>) => void)[]
) {
  let dispatcher: Dispatch<SA>;

  const withMiddleware = (state: SS, action: SA) => {
    if (middleware && middleware.length > 0) {
      middleware.forEach(m => m(state, action, dispatcher))
    }

    return reducer(state, action);
  }

  return (): [SS, Dispatch<SA>] => {
    const [state, dispatch] = useReducer(withMiddleware, initialState);

    useEffect(() => {
      dispatcher = dispatch;
    }, [dispatch]);

    return [state, dispatch];
  }
}
