import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '747. 至少是其他数字两倍的最大数',
  url: 'https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.排序],
  desc: `给你一个整数数组 nums ，其中总是存在 唯一的 一个最大整数 。请你找出数组中的最大元素并检查它是否 至少是数组中每个其他数字的两倍 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 10.7,
      desc: '排序',
      code: `class Solution {
   public:
    int dominantIndex(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return 0;
        int arr[n];
        for (int i = 0; i < n; i++) arr[i] = i;
        sort(arr, arr + n,
             [&](int i1, int i2) -> bool { return nums[i1] < nums[i2]; });
        return nums[arr[n - 1]] >= nums[arr[n - 2]] * 2 ? arr[n - 1] : -1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
