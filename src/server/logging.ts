const isVerbose = true;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(...msg: any): void {
  if (!isVerbose) return;
  // eslint-disable-next-line no-console
  console.info(...msg);
}
