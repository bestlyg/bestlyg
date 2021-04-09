import { structures } from '../utils';

const { Heap } = structures;

function topKFrequent(words: string[], k: number): string[] {
  const map: Record<string, number> = {};
  for (const word of words) map[word] = (map[word] ?? 0) + 1;
  const strCheck = (str1: string, str2: string) => {
    let i = 0;
    while (str1[i] && str1[i] === str2[i]) i++;
    if (str1[i] && !str2[i]) return -1;
    else if (!str1[i] && str2[i]) return 1;
    else return str2.codePointAt(i)! - str1.codePointAt(i)!;
  };
  const heap = new Heap<[string, number]>(([str1, v1], [str2, v2]) =>
    v1 === v2 ? strCheck(str1, str2) : v1 - v2
  );
  Object.entries(map).forEach(v => heap.add(v));
  const ans: string[] = [];
  while (heap.size && k--) {
    ans.push(heap.remove()[0]);
  }
  return ans;
}
console.log(topKFrequent(['i', 'love', 'leetcode', 'i', 'love', 'coding'], 3));
