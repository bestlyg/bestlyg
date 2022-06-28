import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '324. 摆动排序 II',
  url: 'https://leetcode.cn/problems/wiggle-sort-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.哈希表, Tag.双指针, Tag.字符串, Tag.排序],
  desc: `给你一个整数数组 nums，将它重新排列成 nums[0] < nums[1] > nums[2] < nums[3]... 的顺序。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 17.2,
      desc: '从最大值和中间值往左遍历',
      code: `class Solution {
   public:
    void wiggleSort(vector<int>& nums) {
        vector<int> list = nums;
        sort(list.begin(), list.end());
        int n = nums.size(), mid = (n + 1) / 2, i1 = mid - 1, i2 = n - 1, i = 0;
        while (i1 >= 0 || i2 >= mid) {
            if (i1 >= 0) nums[i++] = list[i1--];
            if (i2 >= mid) nums[i++] = list[i2--];
        }
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
