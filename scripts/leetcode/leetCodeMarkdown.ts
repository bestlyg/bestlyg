import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1945. 字符串转化后的各位数字之和',
  url: 'https://leetcode.cn/problems/sum-of-digits-of-string-after-convert/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串, Tag.模拟],
  desc: `给你一个由小写字母组成的字符串 s ，以及一个整数 k 。返回执行上述操作后得到的结果整数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '模拟',
      code: `class Solution {
public:
    int getLucky(string s, int k) {
        int num = format(s);
        for (int i = 1; i < k; i++) num = toNum(num);
        return num;
    }
    int format(string &s) {
        int ans = 0;
        for (auto &c : s) ans = ans + toNum(c - 'a' + 1);
        return ans;
    }
    int toNum(int num) {
        int ans = 0;
        for (; num; num /= 10) ans = ans + num % 10;
        return ans;
    }
};`,
    },
    {
      script: Script.TS,
      time: 64,
      memory: 44.3,
      desc: '模拟',
      code: `function getLucky(s: string, k: number): number {
    return new Array(k)
        .fill(0)
        .reduce((cur) => cur.split('').map(v => Number(v)).reduce((sum, cur) => sum + cur, 0).toString(),
            s.split('').map(c => c.codePointAt(0)! - 'a'.codePointAt(0)! + 1).join(''));
};`,
    },
  ],
};
export default leetCodeMarkdown;
