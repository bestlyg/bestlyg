import { leetcode, markdown, specStr } from './utils';
const { backquote } = specStr;
const { Script, Difficulty, Tag } = leetcode;
const { link } = markdown;
type Script = leetcode.Script;
type Difficulty = leetcode.Difficulty;
type Tag = leetcode.Tag;
type Solution = leetcode.Solution;
type Markdown = leetcode.Markdown;
export const leetCodeMarkdowns: Markdown[] = [
  {
    existMarkdown: !true,
    name: '剑指 Offer II 009. 乘积小于 K 的子数组',
    url: 'https://leetcode-cn.com/problems/ZVAVXX/',
    difficulty: Difficulty.中等,
    tag: [Tag.数组, Tag.滑动窗口],
    desc: `请找出该数组内乘积小于 k 的连续的子数组的个数。`,
    solutions: [
      {
        script: Script.CPP,
        time: 84,
        memory: 59.7,
        desc: '双指针',
        code: `class Solution {
   public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k == 0) return 0;
        int n = nums.size(), l = 0, r = 0, num = 1, ans = 0;
        while (l < n && r <= n) {
            while (r < n && num < k) num *= nums[r++];
            ans += r - l - (num >= k ? 1 : 0);
            num /= nums[l++];
        }
        return max(ans, 0);
    }
};`,
      },
      {
        script: Script.CPP,
        time: 49,
        memory: 59.8,
        desc: '双指针',
        code: `class Solution {
   public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k == 0) return 0;
        int ans = 0, num = 1, l = 0;
        for (int r = 0; r < nums.size(); r++) {
            num *= nums[r];
            while (l <= r && num >= k) num /= nums[l++];
            ans += r - l + 1;
        }
        return ans;
    }
};`,
      },
    ],
  },
];
