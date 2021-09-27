import { structures, log } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
1*
 */
function numDecodings(s: string): number {
  const MOD = 10 ** 9 + 7;
  const n = s.length;
  const dp: number[] = new Array(n).fill(0);
  dp[0] = s[0] === '*' ? 9 : s[0] === '0' ? 0 : 1;
  let prev = s[0];
  const add = (idx: number, val: number) => (dp[idx] = (dp[idx] + val) % MOD);
  for (let i = 1; i < n; i++) {
    const prev2Num = dp[i - 2] ?? 1;
    const char = s[i];
    if (char === '*') {
      add(i, 9 * dp[i - 1]);
      const c = prev === '1' ? 9 : prev === '*' ? 9 + 6 : prev === '2' ? 6 : 0;
      add(i, c * prev2Num);
    } else if (char !== '0') {
      dp[i] += dp[i - 1];
      let c = 0;
      if (prev === '1' || prev === '*') c++;
      if ((prev === '2' || prev === '*') && char !== '7' && char !== '8' && char !== '9') c++;
      add(i, c * prev2Num);
    } else {
      if (prev !== '1' && prev !== '2' && prev !== '*') return 0;
      const c = prev === '*' ? 2 : 1;
      add(i, c * prev2Num);
    }
    prev = char;
  }
  return dp[n - 1];
}
[
  '1*6*7*1*9*6*2*9*2*3*3*6*3*2*2*4*7*2*9*6*0*6*4*4*1*6*9*0*5*9*2*5*7*7*0*6*9*7*1*5*5*9*3*0*4*9*2*6*2*5*7*6*1*9*4*5*8*4*7*4*2*7*1*2*1*9*1*3*0*6*',
].forEach(v => {
  log({ data: v, ans: numDecodings(v) });
});
