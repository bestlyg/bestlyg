import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1748. 唯一元素的和',
  url: 'https://leetcode-cn.com/problems/sum-of-unique-elements/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.哈希表, Tag.计数],
  desc: `给你一个整数数组 nums 。数组中唯一元素是那些只出现 恰好一次 的元素。请你返回 nums 中唯一元素的 和 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 7.6,
      desc: '遍历',
      code: `class Solution {
   public:
    int sumOfUnique(vector<int>& nums) {
        int check[110] = {0}, ans = 0;
        for (int i = 0, n = nums.size(); i < n; ++i) {
            ++check[nums[i]];
            if (check[nums[i]] == 2)
                ans -= nums[i];
            else if (check[nums[i]] == 1)
                ans += nums[i];
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
