import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1092. 最短公共超序列',
  url: 'https://leetcode.cn/problems/shortest-common-supersequence/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给出两个字符串 str1 和 str2，返回同时以 str1 和 str2 作为子序列的最短字符串。如果答案不止一个，则可以返回满足条件的任意一个答案。`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 12.7,
      desc: 'dp[i][j]=str1前i个字符匹配str2前j个字符的最短长度，再从后往前遍历求出路径字符串',
      code: `class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n1 = str1.size(), n2 = str2.size();
        vector<vector<int>> dp(n1 + 1, vector<int>(n2 + 1));
        for (int i = 0; i < n1; i++) dp[i][0] = i;
        for (int j = 0; j < n2; j++) dp[0][j] = j;
        for (int i = 1; i <= n1; i++) {
            for (int j = 1; j <= n2; j++) {
                if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + 1;
                }
            }
        }
        string res = "";
        int i = n1, j = n2;
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                res += str1[i - 1];
                i -= 1;
                j -= 1;
            } else {
                if (dp[i - 1][j] < dp[i][j - 1]) {
                    res += str1[i - 1];
                    i -= 1;
                } else {
                    res += str2[j - 1];
                    j -= 1;
                }
            }
        }
        reverse(res.begin(), res.end());
        return str1.substr(0, i) + str2.substr(0, j) + res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 320,
      memory: 59.1,
      desc: '同上',
      code: `class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        n1, n2 = len(str1), len(str2)
        dp = [[0] * (n2 + 1) for _ in range(n1 + 1)]
        for i in range(n1):
            dp[i][0] = i
        for j in range(n2):
            dp[0][j] = j
        for i in range(1, n1+1):
            for j in range(1, n2+1):
                if str1[i - 1] == str2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + 1
        res = ""
        i, j = n1, n2
        while i > 0 and j > 0:
            if str1[i - 1] == str2[j - 1]:
                res += str1[i - 1]
                i -= 1
                j -= 1
            else:
                if dp[i - 1][j] < dp[i][j - 1]:
                    res += str1[i - 1]
                    i -= 1
                else:
                    res += str2[j - 1]
                    j -= 1
        res = res[::-1]
        return str1[0:i] + str2[0:j] + res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 9.5,
      desc: '同上',
      code: `impl Solution {
    pub fn shortest_common_supersequence(str1: String, str2: String) -> String {
        let (str1, str2) = (
            str1.chars().collect::<Vec<char>>(),
            str2.chars().collect::<Vec<char>>(),
        );
        let (n1, n2) = (str1.len(), str2.len());
        let mut dp = vec![vec![0; n2 + 1]; n1 + 1];
        for i in 0..n1 {
            dp[i][0] = i;
        }
        for j in 0..n2 {
            dp[0][j] = j;
        }
        for i in 1..=n1 {
            for j in 1..=n2 {
                if str1[i - 1] == str2[j - 1] {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = dp[i - 1][j].min(dp[i][j - 1]) + 1;
                }
            }
        }
        let mut s = vec![];
        let (mut i, mut j) = (n1, n2);
        while i > 0 && j > 0 {
            if str1[i - 1] == str2[j - 1] {
                s.push(*&str1[i - 1]);
                i -= 1;
                j -= 1;
            } else {
                if dp[i - 1][j] < dp[i][j - 1] {
                    s.push(*&str1[i - 1]);
                    i -= 1;
                } else {
                    s.push(*&str2[j - 1]);
                    j -= 1;
                }
            }
        }
        s = s.into_iter().rev().collect();
        String::from_utf8(
            [&str1[0..i], &str2[0..j], &s[..]]
                .concat()
                .into_iter()
                .map(|v| v as u8)
                .collect::<Vec<u8>>(),
        )
        .unwrap()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
