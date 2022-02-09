import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2006. 差的绝对值为 K 的数对数目',
  url: 'https://leetcode-cn.com/problems/count-number-of-pairs-with-absolute-difference-k/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.哈希表, Tag.计数],
  desc: `给你一个整数数组 nums 和一个整数 k ，请你返回数对 (i, j) 的数目，满足 i < j 且 |nums[i] - nums[j]| == k 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 12.1,
      desc: '遍历',
      code: `class Solution {
   public:
    int countKDifference(vector<int>& nums, int k) {
        int m[300] = {0}, ans = 0;
        for (auto& num : nums) {
            ans += m[num + k + 100] + m[num - k + 100];
            m[num + 100]++;
        }
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 8,
      memory: 14,
      desc: '遍历',
      code: `class Solution {
   public:
    int countKDifference(vector<int>& nums, int k) {
        unordered_map<int, int> m;
        int ans = 0;
        for (auto& num : nums) {
            ans += m[num + k] + m[num - k];
            m[num]++;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
