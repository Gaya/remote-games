function copyToClipboard(text: string) {
  if (!navigator.clipboard) return;

  navigator.clipboard.writeText(text).then();
}

export default copyToClipboard;
