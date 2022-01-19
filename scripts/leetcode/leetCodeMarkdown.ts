import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '219. 存在重复元素 II',
  url: 'https://leetcode-cn.com/problems/count-vowels-permutation/',
  difficulty: Difficulty.困难,
  tag: [Tag.动态规划],
  desc: `给你一个整数 n，请你帮忙统计一下我们可以按下述规则形成多少个长度为 n 的字符串`,
  solutions: [
    {
      script: Script.CPP,
      time: 188,
      memory: 75.3,
      desc: '哈希存储',
      code: `class Solution {
   public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> m;
        for (int i = 0; i < nums.size(); i++) {
            if (m.count(nums[i]) && i - m[nums[i]] <= k) return 1;
            m[nums[i]] = i;
        }
        return 0;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
