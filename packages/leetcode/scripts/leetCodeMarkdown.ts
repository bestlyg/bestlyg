import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '剑指 Offer 47. 礼物的最大价值',
  url: 'https://leetcode.cn/problems/li-wu-de-zui-da-jie-zhi-lcof///',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 9,
      desc: 'dp[i][j]表示i行j列时最多能拿多少礼物',
      code: `class Solution {
public:
    int maxValue(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size(), dp[205][205] = {0};
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                dp[i][j] = grid[i][j];
                if (i == 0 && j != 0) dp[i][j] += dp[i][j - 1];
                else if (i != 0 && j == 0) dp[i][j] += dp[i - 1][j];
                else if (i != 0 && j != 0)dp[i][j] += max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[n - 1][m - 1];
    }
};`,
    },
    {
      script: Script.PY3,
      time: 64,
      memory: 17.6,
      desc: '同上',
      code: `class Solution:
    def maxValue(self, grid: List[List[int]]) -> int:
        n, m = len(grid), len(grid[0])
        dp = [[grid[i][j] for j in range(m)] for i in range(n)]
        for i in range(n):
            for j in range(m):
                if i == 0 and j != 0:
                    dp[i][j] += dp[i][j - 1]
                elif i != 0 and j == 0:
                    dp[i][j] += dp[i - 1][j]
                elif i != 0 and j != 0:
                    dp[i][j] += max(dp[i - 1][j], dp[i][j - 1])
        return dp[n-1][m-1]`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.5,
      desc: '同上',
      code: `impl Solution {
        pub fn max_value(grid: Vec<Vec<i32>>) -> i32 {
            let (n, m) = (grid.len(), grid[0].len());
            let mut dp = vec![vec![0; m]; n];
            for i in 0..n {
                for j in 0..m {
                    dp[i][j] = grid[i][j];
                    if i == 0 && j != 0 {
                        dp[i][j] += dp[i][j - 1];
                    } else if i != 0 && j == 0 {
                        dp[i][j] += dp[i - 1][j];
                    } else if i != 0 && j != 0 {
                        dp[i][j] += dp[i - 1][j].max(dp[i][j - 1]);
                    }
                }
            }
            dp[n - 1][m - 1]
        }
    }`,
    },
  ],
};

export default leetCodeMarkdown;
