import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '775. 全局倒置与局部倒置',
  url: 'https://leetcode.cn/problems/global-and-local-inversions/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.数学],
  desc: `当数组 nums 中 全局倒置 的数量等于 局部倒置 的数量时，返回 true ；否则，返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 128,
      memory: 81.2,
      desc: '局部倒置一定是个全局倒置，如果次数相等，那没有非局部倒置的全局倒置',
      code: `class Solution {
public:
    bool isIdealPermutation(vector<int>& nums) {
        int n = nums.size(), nmin = nums[n - 1];
        for (int i = n - 3; i >= 0; i--) {
            if (nums[i] > nmin) return false;
            nmin = min(nmin, nums[i + 1]);
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
