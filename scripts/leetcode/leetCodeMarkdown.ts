import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '747. 至少是其他数字两倍的最大数',
  url: 'https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.排序],
  desc: `给你一个整数数组 nums ，其中总是存在 唯一的 一个最大整数 。请你找出数组中的最大元素并检查它是否 至少是数组中每个其他数字的两倍 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 10.5,
      desc: '遍历两次，第一次记录最大值，第二次判断其他值的两倍是否超过最大值',
      code: `class Solution {
   public:
    int dominantIndex(vector<int>& nums) {
        int maxn = INT_MIN, maxi;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] > maxn) {
                maxn = nums[i];
                maxi = i;
            }
        }
        for (auto& num : nums) {
            if (num != maxn && num * 2 > maxn) return -1;
        }
        return maxi;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
