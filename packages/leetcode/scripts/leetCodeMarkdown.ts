import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1223. 掷骰子模拟',
  url: 'https://leetcode.cn/problems/dice-roll-simulation/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `你是一位系统管理员，手里有一份文件夹列表 folder，你的任务是要删除该列表中的所有 子文件夹，并以 任意顺序 返回剩下的文件夹。`,
  solutions: [
    {
      script: Script.CPP,
      time: 196,
      memory: 29.7,
      desc: 'dp[i][j][k]表示第i次投掷时投了j点，且连续投了k次j点的次数',
      code: `class Solution {
public:
    int dieSimulator(int n, vector<int>& rollMax) {
        int mod = 1e9 + 7;
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(6, vector<int>(16, 0)));
        for (int j = 0; j < 6; j++) dp[1][j][1] = 1;
        // 第i次投骰子
        for (int i = 1; i <= n; i++) {
            // 骰子点数是j
            for (int j = 0; j < 6; j++) {
                // 对于每个点数已经消耗了k次连续投掷次数
                for (int k = 1; k <= rollMax[j]; k++) {
                    // 当前次投了p点
                    for (int p = 0; p < 6; p++) {
                        if (p != j) dp[i][p][1] = (dp[i][p][1] + dp[i - 1][j][k]) % mod;
                        else if (k + 1 <= rollMax[j]) dp[i][p][k + 1] = (dp[i][p][k + 1] + dp[i - 1][j][k]) % mod;
                    }
                }
            }
        }
        int res = 0;
        for (int i = 0; i < 6; i++) {
            for (int j = 1; j <= rollMax[i]; j++) {
                res = (res + dp[n][i][j]) % mod;
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 1764,
      memory: 30.7,
      desc: '同上',
      code: `class Solution:
  def dieSimulator(self, n: int, rollMax: List[int]) -> int:
      mod = 10 ** 9 + 7
      dp = [[([0] * 16) for _ in range(6)] for _ in range(n + 1)]
      for j in range(6):
          dp[1][j][1] = 1
      for i in range(1, n + 1):
          for j in range(6):
              for k in range(1, rollMax[j] + 1):
                  for p in range(6):
                      if p != j:
                          dp[i][p][1] = (dp[i][p][1] + dp[i - 1][j][k]) % mod
                      elif k + 1 <= rollMax[j]:
                          dp[i][p][k + 1] = (dp[i][p]
                                             [k + 1] + dp[i-1][j][k]) % mod
      res = 0
      for i in range(6):
          for j in range(1, rollMax[i] + 1):
              res = (res + dp[n][i][j]) % mod
      return res`,
    },
    {
      script: Script.RUST,
      time: 20,
      memory: 5,
      desc: '同上',
      code: `impl Solution {
    pub fn die_simulator(n: i32, roll_max: Vec<i32>) -> i32 {
        let n = n as usize;
        let MOD = 10i32.pow(9) + 7;
        let mut dp = vec![vec![vec![0; 16]; 6]; n + 1];
        for j in 0..6 {
            dp[1][j][1] = 1;
        }
        for i in 1..=n {
            for j in 0..6 {
                for k in 1..=roll_max[j] as usize {
                    for p in 0..6 {
                        if p != j {
                            dp[i][p][1] = (dp[i][p][1] + dp[i - 1][j][k]) % MOD;
                        } else if k + 1 <= roll_max[j] as usize {
                            dp[i][p][k + 1] = (dp[i][p][k + 1] + dp[i - 1][j][k]) % MOD;
                        }
                    }
                }
            }
        }
        let mut res = 0;
        for i in 0..6 {
            for j in 1..=roll_max[i] as usize {
                res = (res + dp[n][i][j]) % MOD;
            }
        }
        res
    }
}`
,
    },
  ],
};

export default leetCodeMarkdown;
