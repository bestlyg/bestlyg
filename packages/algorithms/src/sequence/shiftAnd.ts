function getNext(pattern: string): (c: string) => number {
  const next: Record<string, number> = {};
  for (let i = 0; pattern[i]; i++) {
    if (!next[pattern[i]]) next[pattern[i]] = 0;
    next[pattern[i]] |= 1 << i;
  }
  return c => next[c] ?? 0;
}
export function shiftAnd(text: string, pattern: string): number {
  const next = getNext(pattern);
  const len = pattern.length;
  let p = 0;
  for (let i = 0; text[i]; i++) {
    p = ((p << 1) | 1) & next(text[i]);
    if (p & (1 << (len - 1))) return i - len + 1;
  }
  return -1;
}
