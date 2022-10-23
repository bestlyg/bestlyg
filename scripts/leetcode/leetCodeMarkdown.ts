import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1768. 交替合并字符串',
  url: 'https://leetcode.cn/problems/merge-strings-alternately/',
  difficulty: Difficulty.简单,
  tag: [Tag.双指针, Tag.字符串],
  desc: `返回 合并后的字符串 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '遍历',
      code: `class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        string ans = "";
        for (int i1 = 0, i2 = 0; i1 < word1.size() || i2 < word2.size(); i1++, i2++) {
            if (i1 < word1.size()) ans += word1[i1];
            if (i2 < word2.size()) ans += word2[i2];
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
