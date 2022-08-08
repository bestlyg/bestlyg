function getNext(needle: string): number[] {
  const next = new Array(needle.length).fill(-1);
  for (let i = 1, j = -1; i < needle.length; i++) {
    while (j != -1 && needle[j + 1] != needle[i]) j = next[j];
    if (needle[j + 1] == needle[i]) j++;
    next[i] = j;
  }
  return next;
}
const getIdx = (char: string) => char.codePointAt(0)! - 'a'.codePointAt(0)!;
function getJump(needle: string, next: number[]): number[][] {
  const COUNT = 26;
  const jump = new Array(needle.length + 1).fill(0).map(_ => new Array(COUNT).fill(-1));
  jump[0][getIdx(needle[0])] = 0;
  for (let i = 1; i < needle.length; i++) {
    jump[i] = [...jump[next[i - 1] + 1]];
    jump[i][getIdx(needle[i])] = i;
  }
  return jump;
}
function strStr(haystack: string, needle: string): number {
  const next = getNext(needle);
  // let j = 4;
  // console.log(needle.substring(0, next[j] + 1),needle.substring(j - next[j], j + 1))
  const jump = getJump(needle, next);
  console.log(jump)
  for (let i = 0, j = -1; i < haystack.length; i++) {
    j = jump[j+1][getIdx(haystack[i])];
    if (j === needle.length - 1) return i - j;
  }
  return -1;
}
console.log(strStr('mississippi', 'abcabd1'));
