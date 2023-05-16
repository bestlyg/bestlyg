import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1335. 工作计划的最低难度',
  url: 'https://leetcode.cn/problems/minimum-difficulty-of-a-job-schedule/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `返回整个工作计划的 最小难度 。如果无法制定工作计划，则返回 -1 。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 76,
    //       memory: 45.9,
    //       desc: '哈希存储',
    //       code: `function findMaxK(nums: number[]): number {
    //     const set1 = new Set<number>();
    //     const set2 = new Set<number>();
    //     for (const num of nums) {
    //         if (set1.has(-num)) set2.add(Math.abs(num));
    //         set1.add(num);
    //     }
    //     return [...set2].sort((a, b) => b - a)[0] ?? -1;
    // }`,
    //       date: new Date('2022/10/16').getTime(),
    //     },
    {
      script: Script.CPP,
      time: 52,
      memory:7.4,
      desc: 'dp[i][j]表示只有i天时，只有j个job时的最小难度',
      code: `class Solution {
public:
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size(), num = 0;
        if (n < d) return -1;
        vector<vector<int>> dp(d, vector<int>(n, INT_MAX));
        for (int i = 0; i < n; i++) dp[0][i] = num = max(num, jobDifficulty[i]);
        for (int dd = 1; dd < d; dd++) {
            for (int i = dd; i < n; i++) {
                num = 0;
                for (int j = i; j >= dd; j--) {
                    num = max(num, jobDifficulty[j]);
                    dp[dd][i] = min(dp[dd][i], dp[dd - 1][j - 1] + num);
                }
            }
        }
        return dp[d - 1][n - 1];
    }
};`,
    },
    {
      script: Script.PY3,
      time: 892,
      memory: 16.2,
      desc: '同上',
      code: `class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        n = len(jobDifficulty)
        if n < d:
            return -1
        num = 0
        dp = [[inf for _ in range(n)] for _ in range(d)]
        for i in range(n):
            dp[0][i] = num = max(num, jobDifficulty[i])
        for dd in range(1, d):
            for i in range(dd, n):
                num = 0
                for j in range(i, dd - 1, -1):
                    num = max(num, jobDifficulty[j])
                    dp[dd][i] = min(dp[dd][i], dp[dd - 1][j - 1] + num)
        return dp[d - 1][n - 1]`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn min_difficulty(job_difficulty: Vec<i32>, d: i32) -> i32 {
        let d = d as usize;
        let n = job_difficulty.len();
        if n < d {
            -1
        } else {
            let mut num = 0;
            let mut dp = vec![vec![i32::MAX; n]; d];
            for i in 0..n {
                num = num.max(job_difficulty[i]);
                dp[0][i] = num;
            }
            for dd in 1..d {
                for i in dd..n {
                    num = 0;
                    for j in (dd..=i).rev() {
                        num = num.max(job_difficulty[j]);
                        dp[dd][i] = dp[dd][i].min(dp[dd - 1][j - 1] + num);
                    }
                }
            }
            dp[d - 1][n - 1]
        }
    }
}
`,
    },
  ],
};

export default leetCodeMarkdown;
