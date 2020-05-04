export function replaceAtId<I extends { id: string }>(
  state: { [key: string]: I },
  item: I,
): { [key: string]: I } {
  return {
    ...state,
    [item.id]: item,
  };
}
