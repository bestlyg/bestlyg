import { structures, log } from './utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  min,
  random,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
const {
  TreeNode,
  UnionFind,

  ListNode,
  Heap,
  // Trie, TrieNode
} = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
// type TrieNode = structures.TrieNode;
// type Trie = structures.Trie;

/*
 */
function isRectangleCover(rectangles: number[][]): boolean {
  /**
   完美矩形要满足:
   1. 最左上、左下、右上、右下四个顶点只出现1次;
   2. 重合顶点重合次数必须为2、4，不能出现一次。
   3. 大矩形面积等于小矩形面积之和。
   */
  type Data = { cnt: number; point: number[] };
  const set = new Set<string>();
  const map: Record<string, Data> = {};
  const format = (x: number, y: number) => `${x}:${y}`;
  const map_add = (x: number, y: number) => {
    const formatStr = format(x, y);
    let data = map[formatStr];
    if (!data) map[formatStr] = data = { cnt: 0, point: [x, y] };
    data.cnt++;
  };
  let sum = 0;
  const vertex: number[] = [];
  const is_vertex = (x: number, y: number) =>
    (x === vertex[0] && y === vertex[1]) ||
    (x === vertex[2] && y === vertex[3]) ||
    (x === vertex[0] && y === vertex[3]) ||
    (x === vertex[2] && y === vertex[1]);
  for (const [x, y, a, b] of rectangles) {
    const formatStr = format(x, y) + ':' + format(a, b);
    if (set.has(formatStr)) return false;
    set.add(formatStr);
    if (vertex[0] === undefined || vertex[0] > x || vertex[1] > y) {
      vertex[0] = x;
      vertex[1] = y;
    }
    if (vertex[2] === undefined || vertex[2] < a || vertex[3] < b) {
      vertex[2] = a;
      vertex[3] = b;
    }
    sum += (a - x) * (b - y);
    map_add(x, y);
    map_add(a, b);
    map_add(x, b);
    map_add(a, y);
  }
  log({ vertex, sum });
  if ((vertex[2] - vertex[0]) * (vertex[3] - vertex[1]) !== sum) return false;
  console.log('sum checked');
  for (const {
    cnt,
    point: [x, y],
  } of Object.values(map)) {
    if ((cnt === 1 && !is_vertex(x, y)) || (cnt !== 1 && cnt !== 2 && cnt !== 4)) {
      console.log('err data');
      console.log(cnt, x, y);
      return false;
    }
  }
  return true;
}
const arr = [
  [0, 0, 4, 1],
  [7, 0, 8, 2],
  [6, 2, 8, 3],
  [5, 1, 6, 3],
  [4, 0, 5, 1],
  [6, 0, 7, 2],
  [4, 2, 5, 3],
  [2, 1, 4, 3],
  [0, 1, 2, 2],
  [0, 2, 2, 3],
  [4, 1, 5, 2],
  [5, 0, 6, 1],
];
log([
  isRectangleCover([
    [0, 0, 4, 1],
    [7, 0, 8, 2],
    [6, 2, 8, 3],
    [5, 1, 6, 3],
    [4, 0, 5, 1],
    [6, 0, 7, 2],
    [4, 2, 5, 3],
    [2, 1, 4, 3],
    [0, 1, 2, 2],
    [0, 2, 2, 3],
    [4, 1, 5, 2],
    [5, 0, 6, 1],
  ]),
]);
