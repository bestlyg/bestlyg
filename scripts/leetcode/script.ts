function getNext(needle: string): number[] {
  const next = new Array(needle.length).fill(-1);
  for (let i = 1, j = -1; i < needle.length; i++) {
    while (j != -1 && needle[j + 1] != needle[i]) j = next[j];
    if (needle[j + 1] == needle[i]) j++;
    next[i] = j;
  }
  return next;
}
function strStr(haystack: string, needle: string): number {
  const next = getNext(needle);
  for (let i = 0, j = -1; i < haystack.length; i++) {
    while (j != -1 && needle[j + 1] != haystack[i]) j = next[j];
    if (needle[j + 1] === haystack[i]) j++;
    if (j === needle.length - 1) return i - j;
  }
  return -1;
}