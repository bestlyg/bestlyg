import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1342. 将数字变成 0 的操作次数',
  url: 'https://leetcode-cn.com/problems/number-of-steps-to-reduce-a-number-to-zero/',
  difficulty: Difficulty.简单,
  tag: [Tag.位运算, Tag.数学],
  desc: `给你一个非负整数 num ，请你返回将它变成 0 所需要的步数。 如果当前数字是偶数，你需要把它除以 2 ；否则，减去 1 。`,
  solutions: [
    {
      script: Script.TS,
      time: 0,
      memory: 5.9,
      desc: '遍历',
      code: `class Solution {
   public:
    int numberOfSteps(int num) {
        int ans = 0;
        while (num) {
            num = num & 1 ? num - 1 : num / 2;
            ++ans;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
