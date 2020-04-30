// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createLogMiddleware(name: string): (action: any, state: any) => void {
  return (state, action): void => {
    if (process.env.NODE_ENV !== 'development') return;

    /* eslint-disable no-console */
    console.group(`ACTION ON '${name}'`);
    console.dir(action);
    console.dir(state);
    console.groupEnd();
    /* eslint-enable no-console */
  };
}
