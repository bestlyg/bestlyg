import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1785. 构成特定和需要添加的最少元素',
  url: 'https://leetcode.cn/problems/minimum-elements-to-add-to-form-a-given-sum/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组],
  desc: `返回使数组元素总和等于 goal 所需要向数组中添加的 最少元素数量 ，添加元素 不应改变 数组中 abs(nums[i]) <= limit 这一属性。`,
  solutions: [
    {
      script: Script.CPP,
      time: 100,
      memory: 71.7,
      desc: '向上取整',
      code: `class Solution {
public:
    int minElements(vector<int>& nums, int limit, int goal) {
        long long v = goal;
        for (auto &num : nums) v -= num;
        v = abs(v);
        return ceil(1.0 * v / limit);
    }
};`,
    },
    {
      script: Script.TS,
      time: 92,
      memory: 50.5,
      desc: '向上取整',
      code: `function minElements(nums: number[], limit: number, goal: number): number {
        return Math.ceil(Math.abs(nums.reduce((sum, num) => sum - num, goal)) / limit);
    };`,
    },
  ],
};
export default leetCodeMarkdown;
