import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '396. 旋转函数',
  url: 'https://leetcode-cn.com/problems/rotate-function/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.数学, Tag.动态规划],
  desc: `返回 F(0), F(1), ..., F(n-1)中的最大值 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 140,
      memory: 93.6,
      desc: '每一次的值可以从上一次推导过来f(n) = f(n-1) + sum - n * nums[i]',
      code: `class Solution {
   public:
    int maxRotateFunction(vector<int>& nums) {
        int sum = 0, prev = 0, n = nums.size();
        for (int i = 0; i < n; i++) {
            sum += nums[i];
            prev += nums[i] * i;
        }
        int ans = prev;
        for (int i = n - 1; i > 0; i--, ans = max(ans, prev))
            prev = prev + sum - n * nums[i];
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
