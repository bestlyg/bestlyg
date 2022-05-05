import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '713. 乘积小于 K 的子数组',
  url: 'https://leetcode-cn.com/problems/find-the-winner-of-the-circular-game/',
  difficulty: Difficulty.中等,
  tag: [Tag.递归, Tag.队列, Tag.数组, Tag.数学, Tag.模拟],
  desc: `给你参与游戏的小伙伴总数 n ，和一个整数 k ，返回游戏的获胜者。`,
  solutions: [
    {
      script: Script.CPP,
      time: 76,
      memory: 9.4,
      desc: '滑动窗口',
      code: `int numSubarrayProductLessThanK(int *nums, int numsSize, int k) {
    int l = 0, r = 0, sum = 1, ans = 0;
    while (l < numsSize) {
        while (r < numsSize && sum * nums[r] < k) sum *= nums[r++];
        if (l == r) {
            l++;
            r++;
        } else {
            ans += r - l;
            sum /= nums[l++];
        }
    }
    return ans;
}`,
    },
  ],
};
export default leetCodeMarkdown;
