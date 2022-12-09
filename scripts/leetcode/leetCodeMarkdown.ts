import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1780. 判断一个数字是否可以表示成三的幂的和',
  url: 'https://leetcode.cn/problems/check-if-number-is-a-sum-of-powers-of-three/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学],
  desc: `给你一个整数 n ，如果你可以将 n 表示成若干个不同的三的幂之和，请你返回 true ，否则请返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.7,
      desc: '如果是由3的幂组成，那一定是可以模3等于0或者减一模3等于0',
      code: `class Solution {
public:
    bool checkPowersOfThree(int n) {
        if (n % 3 != 0) n--;
        for (; n && n % 3 == 0; n--) 
            while (n % 3 == 0) n /= 3;
        return !n;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 5.7,
      desc: '优化后为模3为0或1',
      code: `class Solution {
public:
    bool checkPowersOfThree(int n) {
        while (n) {
            if (n % 3 == 2) return false;
            n /= 3;
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
