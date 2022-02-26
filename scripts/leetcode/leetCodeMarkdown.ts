import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2016. 增量元素之间的最大差值',
  url: 'https://leetcode-cn.com/problems/maximum-difference-between-increasing-elements/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组],
  desc: `给你一个下标从 0 开始的整数数组 nums ，该数组的大小为 n ，请你计算 nums[j] - nums[i] 能求得的 最大差值 ，其中 0 <= i < j < n 且 nums[i] < nums[j] 。返回 最大差值 。如果不存在满足要求的 i 和 j ，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 8,
      desc: '遍历，记录最小值',
      code: `class Solution {
   public:
    int maximumDifference(vector<int>& nums) {
        int minnum = nums[0], ans = INT_MIN;
        for (auto& num : nums) {
            if (num > minnum) {
                ans = max(ans, num - minnum);
            }
            minnum = min(minnum, num);
        }
        return ans == INT_MIN ? -1 : ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
