import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common, sequence } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  random,
  remove,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger, resolve, fs } from '../utils';
import { ListNode } from './structures';

function fallingSquares(positions: number[][]): number[] {
  const ans: number[] = [];
  let max = -1;
  const arr: number[][] = [];
  for (const [pos, size] of positions) {
    const idx = find(pos);
    // 与其它无关
    if (idx === arr.length) {
      // 与前一块没有重叠
      if (arr.length === 0 || arr[idx - 1][1] <= pos) {
        arr.push([pos, pos + size, size]);
        updateAns(size);
      } else {
        arr[idx - 1][1] = pos;
        arr.push([pos, pos + size, size + arr[idx - 1][2]]);
        updateAns(size + arr[idx - 1][2]);
      }
      continue;
    }
    const endIdx = pos + size;
    if (arr[idx - 1][1] <= pos) {
      arr.push([pos, pos + size, size]);
      updateAns(size);
    }
    // 完全在某一块上面
    if (idx === arr.length - 1 || endIdx <= arr[idx + 1][0]) {
      arr[idx][1] = pos;
      arr.splice(idx + 1, 0, [pos, pos + size, size + arr[idx][2]]);
      continue;
    }
  }
  return ans;
  function find(pos: number): number {
    let l = 0;
    let r = arr.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (arr[m][0] >= pos) r = m;
      else l = m + 1;
    }
    return l;
  }
  function updateAns(val: number) {
    max = Math.max(max, val);
    ans.push(max);
  }
}
console.log(
  fallingSquares([
    [1, 2],
    [2, 3],
    [6, 1],
  ])
);
