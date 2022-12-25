import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6272. 好分区的数目',
  url: 'https://leetcode.cn/problems/number-of-great-partitions/',
  difficulty: Difficulty.困难,
  tag: [],
  desc: `返回 不同 的好分区的数目。由于答案可能很大，请返回对 109 + 7 取余 后的结果。`,
  solutions: [
    {
      script: Script.CPP,
      time: 112,
      memory: 36.7,
      desc: '逆向统计，统计出有多少组是少于k的，res  = sum - 2 * val',
      code: `class Solution {
public:
    int countPartitions(vector<int>& nums, int k) {
        if (accumulate(nums.begin(), nums.end(), 0LL) < 2 * k) return 0;
        sort(nums.begin(), nums.end());
        int n = nums.size(), mod = 1e9 + 7, ans = 1;
        vector<vector<int>> dp(n + 1, vector<int>(k, 0));
        dp[0][0] = 1;
        for (int i = 1; i <= n; i++) {
            ans = (ans * 2) % mod;
            dp[i][0] = 1;
            for (int j = 1; j < k; j++) {
                dp[i][j] = (dp[i][j] + dp[i - 1][j]) % mod;
                if (j >= nums[i - 1]) dp[i][j] = (dp[i][j] + dp[i - 1][j - nums[i - 1]]) % mod;
            }
        }
        for (auto &num : dp[n]) ans = (ans - 2 * num % mod + mod) % mod;
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
