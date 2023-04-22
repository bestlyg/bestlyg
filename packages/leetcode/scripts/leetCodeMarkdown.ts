import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1027. 最长等差数列',
  url: 'https://leetcode.cn/problems/longest-arithmetic-subsequence/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个整数数组 nums，返回 nums 中最长等差子序列的长度。`,
  solutions: [
    {
      script: Script.CPP,
      time: 268,
      memory:138.1,
      desc: 'dp[i][j]表示以i为结尾，公差为j的最大序列长度',
      code: `class Solution {
    public:
        int longestArithSeqLength(vector<int>& nums) {
            int n = nums.size(), res = 0;
            vector<vector<int>> dp(n, vector<int>(1005, 0));
            for (int i = 0; i < n; i++) {
                for (int j = i - 1; j >= 0; j--) {
                    int num = nums[i] - nums[j] + 500;
                    dp[i][num] = max(dp[i][num], dp[j][num] + 1);
                    res = max(res, dp[i][num]);
                }
            }
            return res + 1;
        }
    };`,
    },
    {
      script: Script.PY3,
      time: 2916,
      memory: 22.9,
      desc: '同上',
      code: `class Solution:
    def longestArithSeqLength(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        dp = [[0] * 1005 for _ in range(n)]
        for i in range(n):
            for j in range(i-1, -1, -1):
                num = nums[i] - nums[j] + 500
                dp[i][num] = max(dp[i][num], dp[j][num] + 1)
                res = max(dp[i][num], res)
        return res + 1`,
    },
    {
      script: Script.RUST,
      time: 40,
      memory: 5.9,
      desc: '同上',
      code: `impl Solution {
    pub fn longest_arith_seq_length(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut res = 0;
        let mut dp = vec![vec![0; 1005]; n];
        for i in 0..n {
            for j in (0..i).rev() {
                let num = (nums[i] - nums[j] + 500) as usize;
                dp[i][num] = dp[i][num].max(dp[j][num] + 1);
                res = res.max(dp[i][num]);
            }
        }
        res + 1
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
