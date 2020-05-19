// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(...msg: any): void {
  if (!process.env.SHOW_SERVER_LOGS) return;
  // eslint-disable-next-line no-console
  console.info(...msg);
}
