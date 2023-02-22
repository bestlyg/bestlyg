import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1140. 石子游戏 II',
  url: 'https://leetcode.cn/problems/stone-game-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `假设爱丽丝和鲍勃都发挥出最佳水平，返回爱丽丝可以得到的最大数量的石头。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 14.3,
      desc: 'dp[i][m]=第i轮拾取时m情况下的最大数量',
      code: `class Solution {
public:
    int stoneGameII(vector<int>& piles) {
        int n = piles.size(), sum = 0;
        vector<vector<int>> dp(n, vector<int>(n + 1));
        for (int i = n - 1; i >= 0; i--) {
            sum += piles[i];
            for (int m = 1; m <= n; m++) {
                if (i + 2 * m >= n) dp[i][m] = sum;
                else for (int x = 1; x <= 2 * m; x++) dp[i][m] = max(dp[i][m], sum - dp[i + x][max(m, x)]);
            }
        }
        return dp[0][1];
    }
};`,
    },
    {
      script: Script.PY3,
      time: 428,
      memory: 15.3,
      desc: '同上',
      code: `class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        n, sumv = len(piles), 0
        dp = [[0] * (n + 1) for _ in range(n)]
        for i in range(n - 1, -1, -1):
            sumv += piles[i]
            for m in range(1, n + 1):
                if i + 2 * m >= n:
                    dp[i][m] = sumv
                else:
                    for x in range(1, 2*m+1):
                        dp[i][m] = max(dp[i][m], sumv - dp[i + x][max(x, m)])
        return dp[0][1]`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn stone_game_ii(piles: Vec<i32>) -> i32 {
        let n = piles.len();
        let mut sum = 0;
        let mut dp = vec![vec![0; n + 1]; n];
        for i in (0..n).rev() {
            sum += piles[i];
            for m in 1..=n {
                if i + 2 * m >= n {
                    dp[i][m] = sum
                } else {
                    for x in 1..=(2 * m) {
                        dp[i][m] = dp[i][m].max(sum - dp[i + x][x.max(m)])
                    }
                }
            }
        }
        dp[0][1]
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
