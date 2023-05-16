import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2677. 分块数组',
  url: 'https://leetcode.cn/problems/chunk-array/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `给定一个数组 arr 和一个块大小 size ，返回一个 分块 的数组。分块 的数组包含了 arr 中的原始元素，但是每个子数组的长度都是 size 。如果 arr.length 不能被 size 整除，那么最后一个子数组的长度可能小于 size 。`,
  solutions: [
        {
          script: Script.TS,
          time: 76,
          memory:45.5,
          desc: '利用余数为0判断是否产生分割',
          code: `function chunk(arr: any[], size: number): any[][] {
    const res: any[][] = [];
    const item: any[] = [];
    for (let i = 1; i <= arr.length; i++) {
        item.push(arr[i - 1]);
        if (i % size === 0) res.push([...item]), (item.length = 0);
    }
    if (item.length) res.push([...item]);
    return res;
}`,
        },
//     {
//       script: Script.CPP,
//       time: 52,
//       memory:7.4,
//       desc: 'dp[i][j]表示只有i天时，只有j个job时的最小难度',
//       code: `class Solution {
// public:
//     int minDifficulty(vector<int>& jobDifficulty, int d) {
//         int n = jobDifficulty.size(), num = 0;
//         if (n < d) return -1;
//         vector<vector<int>> dp(d, vector<int>(n, INT_MAX));
//         for (int i = 0; i < n; i++) dp[0][i] = num = max(num, jobDifficulty[i]);
//         for (int dd = 1; dd < d; dd++) {
//             for (int i = dd; i < n; i++) {
//                 num = 0;
//                 for (int j = i; j >= dd; j--) {
//                     num = max(num, jobDifficulty[j]);
//                     dp[dd][i] = min(dp[dd][i], dp[dd - 1][j - 1] + num);
//                 }
//             }
//         }
//         return dp[d - 1][n - 1];
//     }
// };`,
//     },
//     {
//       script: Script.PY3,
//       time: 892,
//       memory: 16.2,
//       desc: '同上',
//       code: `class Solution:
//     def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
//         n = len(jobDifficulty)
//         if n < d:
//             return -1
//         num = 0
//         dp = [[inf for _ in range(n)] for _ in range(d)]
//         for i in range(n):
//             dp[0][i] = num = max(num, jobDifficulty[i])
//         for dd in range(1, d):
//             for i in range(dd, n):
//                 num = 0
//                 for j in range(i, dd - 1, -1):
//                     num = max(num, jobDifficulty[j])
//                     dp[dd][i] = min(dp[dd][i], dp[dd - 1][j - 1] + num)
//         return dp[d - 1][n - 1]`,
//     },
//     {
//       script: Script.RUST,
//       time: 4,
//       memory: 2.1,
//       desc: '同上',
//       code: `impl Solution {
//     pub fn min_difficulty(job_difficulty: Vec<i32>, d: i32) -> i32 {
//         let d = d as usize;
//         let n = job_difficulty.len();
//         if n < d {
//             -1
//         } else {
//             let mut num = 0;
//             let mut dp = vec![vec![i32::MAX; n]; d];
//             for i in 0..n {
//                 num = num.max(job_difficulty[i]);
//                 dp[0][i] = num;
//             }
//             for dd in 1..d {
//                 for i in dd..n {
//                     num = 0;
//                     for j in (dd..=i).rev() {
//                         num = num.max(job_difficulty[j]);
//                         dp[dd][i] = dp[dd][i].min(dp[dd - 1][j - 1] + num);
//                     }
//                 }
//             }
//             dp[d - 1][n - 1]
//         }
//     }
// }
// `,
//     },
  ],
};

export default leetCodeMarkdown;
