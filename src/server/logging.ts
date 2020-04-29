const isVerbose = true;

export function log(...msg: any) {
  if (!isVerbose) return;
  console.info(...msg);
}
