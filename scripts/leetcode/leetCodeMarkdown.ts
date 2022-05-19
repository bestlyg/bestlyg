import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '462. 最少移动次数使数组元素相等 II',
  url: 'https://leetcode-cn.com/problems/minimum-genetic-mutation/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.哈希表, Tag.字符串],
  desc: `给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 10.5,
      desc: '遍历',
      code: `class Solution {
   public:
    int minMoves2(vector<int> &nums) {
        sort(nums.begin(), nums.end());
        int m = nums[nums.size() / 2];
        int ans = 0;
        for (auto &num : nums) {
            ans += abs(m - num);
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
