import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1608. 特殊数组的特征值',
  url: 'https://leetcode.cn/problems/special-array-with-x-elements-greater-than-or-equal-x/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.二分查找, Tag.排序],
  desc: `如果存在一个数 x ，使得 nums 中恰好有 x 个元素 大于或者等于 x ，那么就称 nums 是一个 特殊数组 ，而 x 是该数组的 特征值 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 8.1,
      desc: '排序后遍历',
      code: `class Solution {
public:
    int specialArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), cnt = n;
        for (int i = 0; i < n; i++, cnt--) {
            if (nums[i] >= cnt && (i > 0 && cnt > nums[i - 1] || i == 0)) return cnt;
        }
        return -1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
