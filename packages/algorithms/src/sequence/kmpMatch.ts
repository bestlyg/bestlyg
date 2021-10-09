function getNext(pattern: string): number[] {
  const next = [-1];
  for (let i = 1, j = -1; pattern[i]; i++) {
    while (j !== -1 && pattern[i] !== pattern[j + 1]) j = next[j];
    if (pattern[i] === pattern[j + 1]) j++;
    next[i] = j;
  }
  return next;
}
export function kmpMatch(text: string, pattern: string): number {
  const next = getNext(pattern);
  for (let i = 0, j = -1; text[i]; i++) {
    const c = text[i];
    while (j !== -1 && c !== pattern[j + 1]) j = next[j];
    if (c === pattern[j + 1]) j++;
    if (!pattern[j + 1]) return i - j;
  }
  return -1;
}
