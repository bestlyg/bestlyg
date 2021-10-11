function getMap(pattern: string): (c: string) => number {
  const map: Record<string, number> = {};
  for (let i = 0; pattern[i]; i++) map[pattern[i]] = i;
  return c => map[c] ?? -1;
}
export function sunday(text: string, pattern: string): number {
  const map = getMap(pattern);
  const len = pattern.length;
  for (let i = 0; text[i]; i += len - map(text[i + len])) {
    let j = 0;
    while (pattern[j] && pattern[j] === text[i + j]) j++;
    if (!pattern[j]) return i;
  }
  return -1;
}
