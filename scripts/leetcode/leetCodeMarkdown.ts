import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '540. 有序数组中的单一元素',
  url: 'https://leetcode-cn.com/problems/single-element-in-a-sorted-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.二分查找],
  desc: `给你一个仅由整数组成的有序数组，其中每个元素都会出现两次，唯有一个数只会出现一次。请你找出并返回只出现一次的那个数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 21.9,
      desc: 'bs',
      code: `class Solution {
   public:
    int singleNonDuplicate(vector<int>& nums) {
        return bs(nums, 0, nums.size() - 1);
    }
    int bs(vector<int>& nums, int l, int r) {
        int n = r - l + 1, m = (l + r) >> 1;
        if (n == 1 || nums[l] != nums[l + 1]) return nums[l];
        if (nums[r] != nums[r - 1]) return nums[r];
        if (nums[m] != nums[m - 1] && nums[m] != nums[m + 1]) return nums[m];
        if (nums[m] == nums[m - 1]) m--;
        if ((m - l) & 1)
            return bs(nums, l, m - 1);
        else
            return bs(nums, m + 2, r);
    }
};`,
    },
    {
      script: Script.CPP,
      time: 20,
      memory: 21.9,
      desc: 'bs, 如果是偶数下标与后面的比，奇数下标与前面的比',
      code: `class Solution {
   public:
    int singleNonDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size() - 1, m;
        while (l < r) {
            m = (l + r) >> 1;
            if (nums[m] == nums[m ^ 1])
                l = m + 1;
            else
                r = m;
        }
        return nums[l];
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
