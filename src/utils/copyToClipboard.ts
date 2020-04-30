function copyToClipboard(text: string): void {
  if (!navigator.clipboard) return;

  navigator.clipboard.writeText(text).then();
}

export default copyToClipboard;
