import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '719. 找出第 K 小的数对距离',
  url: 'https://leetcode.cn/problems/find-k-th-smallest-pair-distance/',
  difficulty: Difficulty.困难,
  tag: [Tag.数组, Tag.双指针, Tag.二分查找,Tag.排序],
  desc: `返回 所有数对距离中 第 k 小的数对距离。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 9.7,
      desc: '排序后，对于每一种差值，计算可能的数量',
      code: `class Solution {
   public:
    int smallestDistancePair(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), l = 0, r = nums[n - 1] - nums[0], m;
        while (l < r) {
            m = (l + r) >> 1;
            int cnt = 0;
            for (int i = 0; i < n; i++) cnt += i - bs(nums, i, nums[i] - m);
            if (cnt >= k)
                r = m;
            else
                l = m + 1;
        }
        return l;
    }
    int bs(vector<int>& nums, int r, int target) {
        int l = 0, m;
        while (l < r) {
            m = (l + r) >> 1;
            if (nums[m] >= target)
                r = m;
            else
                l = m + 1;
        }
        return l;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
