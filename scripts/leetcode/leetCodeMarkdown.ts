import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '357. 统计各位数字都不同的数字个数',
  url: 'https://leetcode-cn.com/problems/reaching-points/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定四个整数 sx , sy ，tx 和 ty，如果通过一系列的转换可以从起点 (sx, sy) 到达终点 (tx, ty)，则返回 true，否则返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '遍历统计每种情况的可能数量',
      code: `class Solution {
   public:
    int countNumbersWithUniqueDigits(int n) {
        if (n == 0) return 1;
        if (n == 1) return 10;
        int ans = 10, num = 9;
        for (int i = 2, cur = 9; i <= n; i++, cur--) {
            num *= cur;
            ans += num;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
