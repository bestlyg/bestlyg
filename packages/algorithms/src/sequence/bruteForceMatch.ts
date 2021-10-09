export function bruteForceMatch(text: string, pattern: string): number {
  const len = pattern.length;
  for (let i = 0; text[i]; i++) {
    const substr = text.substr(i, len);
    if (substr === pattern) return i;
  }
  return -1;
}
