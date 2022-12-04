import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1774. 最接近目标价格的甜点成本',
  url: 'https://leetcode.cn/problems/closest-dessert-cost',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.动态规划, Tag.回溯],
  desc: `返回最接近 target 的甜点成本。如果有多种方案，返回 成本相对较低 的一种。`,
  solutions: [
    {
      script: Script.CPP,
      time: 76,
      memory: 9.4,
      desc: 'dfs',
      code: `class Solution {
public:
    int closestCost(vector<int>& baseCosts, vector<int>& toppingCosts, int target) {
        int ans = baseCosts[0], n = toppingCosts.size();
        function<void(int, int)> dfs = [&](int cur, int idx) {
            if (abs(cur - target) < abs(ans - target) || abs(cur - target) == abs(ans - target) && cur < ans) ans = cur;
            if (idx == n) return;
            dfs(cur, idx + 1);
            dfs(cur + toppingCosts[idx], idx + 1);
            dfs(cur + toppingCosts[idx] * 2, idx + 1);
        };
        for (auto &cost : baseCosts) dfs(cost, 0);
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
