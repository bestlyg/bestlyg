import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1641. 统计字典序元音字符串的数目',
  url: 'https://leetcode.cn/problems/count-sorted-vowel-strings/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个整数 n，请返回长度为 n 、仅由元音 (a, e, i, o, u) 组成且按 字典序排列 的字符串数量。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: 'dp[i][j]表示i个字符长度时j字符为首有几种',
      code: `class Solution {
public:
    int countVowelStrings(int n) {
        int dp[55][5] = {0};
        for (int j = 0; j < 5; j++) dp[1][j] = 1;
        for (int i = 2; i <= n; i++) {
            int v = 0;
            for (int j = 0; j < 5; j++) {
                v += dp[i - 1][j];
                dp[i][j] = v;
            }
        }
        return accumulate(dp[n], dp[n] + 5, 0);
    }
};`,
    },
    {
      script: Script.PY3,
      time: 20,
      memory: 14.8,
      desc: '同上',
      code: `class Solution:
    def countVowelStrings(self, n: int) -> int:
        dp = [[0] * 5 for _ in range(55)]
        for j in range(5):
            dp[1][j] = 1
        for i in range(2, n+1):
            v = 0
            for j in range(5):
                v += dp[i-1][j]
                dp[i][j] = v
        return sum(dp[n])`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn count_vowel_strings(n: i32) -> i32 {
        let n = n as usize;
        let mut dp = vec![vec![0; 5]; 55];
        for j in 0..5 {
            dp[1][j] = 1;
        }
        for i in 2..=n {
            let mut v = 0;
            for j in 0..5 {
                v += dp[i - 1][j];
                dp[i][j] = v
            }
        }
        dp[n].iter().sum()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
