import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '258. 各位相加',
  url: 'https://leetcode-cn.com/problems/add-digits/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学, Tag.数论, Tag.模拟],
  desc: `给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。返回这个结果。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.7,
      desc: '递归遍历',
      code: `class Solution {
   public:
    int addDigits(int num) {
        if (num < 10) return num;
        int ans = 0;
        for (; num; num /= 10) ans += num % 10;
        return addDigits(ans);
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
