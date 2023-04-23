import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2630. 记忆函数 II',
  url: 'https://leetcode.cn/problems/memoize-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你编写一个函数，它接收一个函数参数 fn，并返回该函数的 记忆化 后的结果。`,
  solutions: [
    {
      script: Script.TS,
      time: 372,
      memory: 102,
      desc: 'trie',
      code: `type Fn = (...params: any) => any;

const EmptyResult = Symbol('EmptyResult');

class Trie {
  children = new Map<any, Trie>();
  result: any = EmptyResult;
  constructor(public val: any) {}
}

function memoize(fn: Fn): Fn {
  const root = new Trie(null);
  return function (...args: any[]) {
    let node = root;
    for (const arg of args) {
      let next = node.children.get(arg);
      if (!next) node.children.set(arg, (next = new Trie(arg)));
      node = next;
    }
    if (node.result !== EmptyResult) return node.result;
    return (node.result = fn(...args));
  };
}`,
    },
//     {
//       script: Script.CPP,
//       time: 112,
//       memory: 53,
//       desc: 'dp[i]表示以i为行末的最大高度',
//       code: `function checkIfInstanceOf(obj: any, classFunction: any): boolean {
//     if (obj === null || obj === undefined || classFunction == null || classFunction == undefined) return false;
//     while ((obj = obj.__proto__) && obj !== classFunction.prototype);
//     return obj === classFunction.prototype;
// }`,
//     },
//     {
//       script: Script.PY3,
//       time: 40,
//       memory: 15.3,
//       desc: '同上',
//       code: `class Solution:
//     def minHeightShelves(self, books: List[List[int]], shelfWidth: int) -> int:
//         n = len(books)
//         dp = [inf] * (n + 1)
//         dp[0] = 0
//         for i in range(1, n+1):
//             sum = h = 0
//             for j in range(i-1, -1, -1):
//                 if sum + books[j][0] > shelfWidth:
//                     break
//                 sum += books[j][0]
//                 h = max(h, books[j][1])
//                 dp[i] = min(dp[i], dp[j]+h)
//         return dp[n]`,
//     },
//     {
//       script: Script.RUST,
//       time: 0,
//       memory: 2.3,
//       desc: '同上',
//       code: `impl Solution {
//     pub fn min_height_shelves(books: Vec<Vec<i32>>, shelf_width: i32) -> i32 {
//         use std::cmp::{max, min};
//         let n = books.len();
//         let mut dp = vec![i32::MAX; n + 1];
//         dp[0] = 0;
//         for i in 1..=n {
//             let mut sum = 0;
//             let mut h = 0;
//             for j in (0..=i - 1).rev() {
//                 if sum + books[j][0] > shelf_width {
//                     break;
//                 }
//                 sum += books[j][0];
//                 h = max(h, books[j][1]);
//                 dp[i] = min(dp[i], dp[j] + h);
//             }
//         }
//         dp[n]
//     }
// }`,
//     },
  ],
};

export default leetCodeMarkdown;
