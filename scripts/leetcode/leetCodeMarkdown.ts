import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '334. 递增的三元子序列',
  url: 'https://leetcode-cn.com/problems/increasing-triplet-subsequence/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组],
  desc: `给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。`,
  solutions: [
    {
      script: Script.CPP,
      time: 48,
      memory: 60.1,
      desc: '每遍历一个数值记录前面的值是否匹配',
      code: `class Solution {
   public:
    bool increasingTriplet(vector<int>& nums) {
        int pre1 = INT_MAX, pre2 = INT_MAX;
        for (auto& num : nums) {
            if (num > pre2) return 1;
            if (num > pre1) pre2 = min(pre2, num);
            pre1 = min(pre1, num);
        }
        return 0;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
