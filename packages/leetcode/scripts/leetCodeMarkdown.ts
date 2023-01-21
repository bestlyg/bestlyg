import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1824. 最少侧跳次数',
  url: 'https://leetcode.cn/problems/minimum-sideway-jumps/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.动态规划],
  desc: `这只青蛙从点 0 处跑道 2 出发，并想到达点 n 处的 任一跑道 ，请你返回 最少侧跳次数 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 584,
      memory: 313.1,
      desc: 'dp',
      code: `#define MAX 0x3f3f3f3f
class Solution {
public:
    int minSideJumps(vector<int>& obstacles) {
        int n = obstacles.size();
        vector<vector<int>> dp(n, vector<int>(4, MAX));
        dp[0][2] = 0;
        dp[0][1] = dp[0][3] = 1;
        for (int i = 1; i < n; i++) {
            if (obstacles[i] != 1) dp[i][1] = dp[i - 1][1];
            if (obstacles[i] != 2) dp[i][2] = dp[i - 1][2];
            if (obstacles[i] != 3) dp[i][3] = dp[i - 1][3];
            if (obstacles[i - 1] == 1) dp[i][1] = min(dp[i][2], dp[i][3]) + 1;
            if (obstacles[i - 1] == 2) dp[i][2] = min(dp[i][1], dp[i][3]) + 1;
            if (obstacles[i - 1] == 3) dp[i][3] = min(dp[i][1], dp[i][2]) + 1;
        }
        return min({dp[n - 1][1], dp[n - 1][2], dp[n - 1][3]});
    }
};`,
    },
    {
      script: Script.RUST,
      time: 100,
      memory: 30.7,
      desc: '同上',
      code: `impl Solution {
    pub fn min_side_jumps(obstacles: Vec<i32>) -> i32 {
        let n = obstacles.len();
        let mut dp = vec![vec![0x3f3f3f3f; 4]; n];
        dp[0][1] = 1;
        dp[0][2] = 0;
        dp[0][3] = 1;
        for i in 1..n {
            if obstacles[i] != 1 {
                dp[i][1] = dp[i - 1][1];
            }
            if obstacles[i] != 2 {
                dp[i][2] = dp[i - 1][2];
            }
            if obstacles[i] != 3 {
                dp[i][3] = dp[i - 1][3];
            }
            if obstacles[i - 1] == 1 {
                dp[i][1] = dp[i][2].min(dp[i][3]) + 1;
            }
            if obstacles[i - 1] == 2 {
                dp[i][2] = dp[i][1].min(dp[i][3]) + 1;
            }
            if obstacles[i - 1] == 3 {
                dp[i][3] = dp[i][1].min(dp[i][2]) + 1;
            }
        }
        dp[n - 1][1].min(dp[n - 1][2]).min(dp[n - 1][3])
    }
}
`,
    },
    {
      script: Script.PY3,
      time: 1964,
      memory: 88,
      desc: '同上',
      code: `class Solution:
def minSideJumps(self, obstacles: List[int]) -> int:
    n = len(obstacles)
    dp = [[0x3f3f3f3f for _ in range(4)] for _ in range(n)]
    dp[0][2] = 0
    dp[0][1] = dp[0][3] = 1
    for i in range(1, n):
        if obstacles[i] != 1:
            dp[i][1] = dp[i - 1][1]
        if obstacles[i] != 2:
            dp[i][2] = dp[i - 1][2]
        if obstacles[i] != 3:
            dp[i][3] = dp[i - 1][3]
        if obstacles[i - 1] == 1:
            dp[i][1] = min(dp[i][2], dp[i][3]) + 1
        if obstacles[i - 1] == 2:
            dp[i][2] = min(dp[i][1], dp[i][3]) + 1
        if obstacles[i - 1] == 3:
            dp[i][3] = min(dp[i][1], dp[i][2]) + 1
    return min(dp[n - 1][1], dp[n - 1][2], dp[n - 1][3])`,
    },
  ],
};

export default leetCodeMarkdown;
