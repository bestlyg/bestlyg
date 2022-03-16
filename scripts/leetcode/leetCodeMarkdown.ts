import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '324. 摆动排序 II',
  url: 'https://leetcode-cn.com/problems/wiggle-sort-ii/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.分治, Tag.快速选择, Tag.排序],
  desc: `给你一个整数数组 nums，将它重新排列成 nums[0] < nums[1] > nums[2] < nums[3]... 的顺序。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 18.1,
      desc: '排序后遍历，最值尽可能放中间',
      code: `class Solution {
   public:
    void wiggleSort(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), mid = (n + 1) / 2, imin = mid - 1, imax = n - 1;
        vector<int> ans;
        while (imin >= 0 || imax >= mid) {
            if (imin >= 0) ans.push_back(nums[imin--]);
            if (imax >= mid) ans.push_back(nums[imax--]);
        }
        nums = ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
