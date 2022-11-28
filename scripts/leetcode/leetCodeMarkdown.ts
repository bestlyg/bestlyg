import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '813. 最大平均值和的分组',
  url: 'https://leetcode.cn/problems/largest-sum-of-averages',
  difficulty: Difficulty.中等,
  tag: [],
  desc: `给定数组 nums 和一个整数 k 。我们将给定的数组 nums 分成 最多 k 个相邻的非空子数组 。 分数 由每个子数组内的平均值的总和构成。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 7.7,
      desc: 'dp[i][j] = 最多分成i组，只用到前j个字符串的最大平均值',
      code: `class Solution {
public:
    double largestSumOfAverages(vector<int>& nums, int k) {
        int n = nums.size();
        vector<vector<double>> dp(k + 1, vector<double>(n + 1, 0));
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += nums[i];
            dp[1][i + 1] = 1.0 * sum / (i + 1);
        }
        double ans = dp[1][n];
        for (int knum = 2; knum <= k; knum++) {
            for (int i = knum; i <= n; i++) {
                int sum = 0, cnt = 0;
                for (int j = i; j >= knum; j--) {
                    sum += nums[j - 1];
                    cnt += 1;
                    dp[knum][i] = max(dp[knum][i], dp[knum - 1][j - 1] + 1.0 * sum / cnt);
                }
            }
            ans = max(ans, dp[knum][n]);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
