/* eslint-disable @typescript-eslint/no-explicit-any */
export default function createLogMiddleware(name: string): (
  action: any,
  state: any,
  dispatch: any,
  nextState: any,
) => void {
/* eslint-enable @typescript-eslint/no-explicit-any */
  return (action, state, dispatch, nextState): void => {
    if (process.env.NODE_ENV !== 'development') return;

    /* eslint-disable no-console */
    console.group(`ACTION ON '${name}'`);
    console.dir(action);
    console.dir(state);
    console.dir(nextState);
    console.groupEnd();
    /* eslint-enable no-console */
  };
}
