import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1742. 盒子中小球的最大数量',
  url: 'https://leetcode.cn/problems/maximum-number-of-balls-in-a-box/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.数学, Tag.计数],
  desc: `给你两个整数 lowLimit 和 highLimit ，返回放有最多小球的盒子中的小球数量。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 5.8,
      desc: '模拟',
      code: `class Solution {
 public:
     int countBalls(int lowLimit, int highLimit) {
         int ans = 0, list[46] = {0};
         for (int num = lowLimit; num <= highLimit; num++) ans = max(ans, ++list[t(num)]);
         return ans;
     }
     int t(int num) {
         int ans = 0;
         for (; num; num /= 10) ans += num % 10;
         return ans;
     }
 };`,
    },
  ],
};
export default leetCodeMarkdown;
