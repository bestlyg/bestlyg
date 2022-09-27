import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '面试题 01.02. 判定是否互为字符重排',
  url: 'https://leetcode.cn/problems/check-permutation-lcci/',
  difficulty: Difficulty.简单,
  tag: [Tag.哈希表, Tag.字符串, Tag.排序],
  desc: `给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '遍历',
      code: `class Solution {
public:
    bool CheckPermutation(string s1, string s2) {
        if (s1.size() != s2.size()) return false;
        char list[130] = {0};
        for (auto &c : s1) list[c]++;
        for (auto &c : s2) if (list[c]-- == 0) return false;
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
