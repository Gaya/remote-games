export default function createLogMiddleware(name: string): (action: any, state: any) => void {
  return (state, action) => {
    console.group(`ACTION ON '${name}'`);
    console.dir(action);
    console.dir(state);
    console.groupEnd();
  }
}
