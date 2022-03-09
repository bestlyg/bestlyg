import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '798. 得分最高的最小轮调',
  url: 'https://leetcode-cn.com/problems/smallest-rotation-with-highest-score/',
  difficulty: Difficulty.困难,
  tag: [Tag.数组, Tag.前缀和],
  desc: `在所有可能的轮调中，返回我们所能得到的最高分数对应的轮调下标 k 。如果有多个答案，返回满足条件的最小的下标 k 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 92,
      memory: 70.1,
      desc: '统计每个点可实现的k区间，利用差分加速',
      code: `class Solution {
   public:
    int list[100001] = {0};
    int bestRotation(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (i >= nums[i]) {
                list[0]++;
                list[i - nums[i] + 1]--;
            }
            list[i + 1]++;
            list[min(i + n - nums[i] + 1, n)]--;
        }
        int ans = 0, ansnum = 0, sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += list[i];
            if (sum > ansnum) {
                ans = i;
                ansnum = sum;
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
