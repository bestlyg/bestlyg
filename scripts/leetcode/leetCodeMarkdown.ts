import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '801. 使序列递增的最小交换次数',
  url: 'https://leetcode.cn/problems/minimum-swaps-to-make-sequences-increasing/',
  difficulty: Difficulty.困难,
  tag: [Tag.数组, Tag.动态规划],
  desc: `返回 使 nums1 和 nums2 严格递增 所需操作的最小次数 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 236,
      memory: 117.2,
      desc: 'dp[i][0|1]表示i为结尾下标时，交换和不交换的最小交换次数',
      code: `class Solution {
public:
    int minSwap(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        vector<vector<int>> dp(n, vector<int>(2, n));
        dp[0][0] = 0;
        dp[0][1] = 1; 
        for (int i = 1; i < n; i++) {
            if (nums1[i - 1] < nums1[i] && nums2[i - 1] < nums2[i]) {
                dp[i][0] = min(dp[i][0], dp[i - 1][0]);
                dp[i][1] = min(dp[i][1], dp[i - 1][1] + 1);
            }
            if (nums1[i - 1] < nums2[i] && nums2[i - 1] < nums1[i]) {
                dp[i][0] = min(dp[i][0], dp[i - 1][1]);
                dp[i][1] = min(dp[i][1], dp[i - 1][0] + 1);
            }
        }
        return min(dp[n - 1][0], dp[n - 1][1]);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
