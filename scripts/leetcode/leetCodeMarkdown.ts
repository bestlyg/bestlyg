import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1800. 最大升序子数组和',
  url: 'https://leetcode.cn/problems/maximum-ascending-subarray-sum/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组],
  desc: `给你一个正整数组成的数组 nums ，返回 nums 中一个 升序 子数组的最大可能元素和。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 8.1,
      desc: '遍历',
      code: `class Solution {
public:
    int maxAscendingSum(vector<int>& nums) {
        int ans = 0;
        for (int i = 0; i < nums.size(); i++) {
            int sum = nums[i];
            while (i + 1 < nums.size() && nums[i + 1] > nums[i]) sum += nums[++i];
            ans = max(ans, sum);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
