import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '剑指 Offer II 091. 粉刷房子',
  url: 'https://leetcode.cn/problems/find-largest-value-in-each-tree-row/',
  difficulty: Difficulty.中等,
  tag: [Tag.树, Tag.深度优先搜索, Tag.广度优先搜索, Tag.二叉树],
  desc: `给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 9.6,
      desc: 'dp',
      code: `class Solution {
   public:
    int minCost(vector<vector<int>>& costs) {
        int n = costs.size(), ans = INT_MAX;
        vector<vector<int>> dp(3, vector<int>(n, 0));
        for (int i = 0; i < 3; i++) dp[i][0] = costs[0][i];
        for (int j = 1; j < n; j++) {
            dp[0][j] = min(dp[1][j - 1], dp[2][j - 1]) + costs[j][0];
            dp[1][j] = min(dp[0][j - 1], dp[2][j - 1]) + costs[j][1];
            dp[2][j] = min(dp[0][j - 1], dp[1][j - 1]) + costs[j][2];
        }
        for (int i = 0; i < 3; i++) ans = min(ans, dp[i][n - 1]);
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
