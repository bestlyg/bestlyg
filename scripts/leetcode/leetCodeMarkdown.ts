import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1217. 玩筹码',
  url: 'https://leetcode.cn/problems/minimum-cost-to-move-chips-to-the-same-position/',
  difficulty: Difficulty.简单,
  tag: [Tag.贪心, Tag.数组, Tag.数学],
  desc: `返回将所有筹码移动到同一位置上所需要的 最小代价 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 7,
      desc: '因为跳一格1消费，跳两格0消费，相当于只有在相邻格才会消费',
      code: `class Solution {
   public:
    int minCostToMoveChips(vector<int>& position) {
        int ans1 = 0, ans2 = 0;
        for (auto& num : position) {
            if (num & 1)
                ans1++;
            else
                ans2++;
        }
        return min(ans1, ans2);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
