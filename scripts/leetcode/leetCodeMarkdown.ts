import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1796. 字符串中第二大的数字',
  url: 'https://leetcode.cn/problems/second-largest-digit-in-a-string',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串],
  desc: `给你一个混合字符串 s ，请你返回 s 中 第二大 的数字，如果不存在第二大的数字，请你返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.5,
      desc: '遍历',
      code: `class Solution {
public:
    int secondHighest(string s) {
        int n1 = -1, n2 = -1;
        for (auto &c : s) {
            if (!isdigit(c)) continue;
            int num = c - '0';
            if (n1 == -1) n1 = num;
            else if (num > n1) n2 = n1, n1 = num;
            else if (num == n1) continue;
            else if (n2 == -1) n2 = num;
            else if (num > n2) n2 = num;
        }
        return n2;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;