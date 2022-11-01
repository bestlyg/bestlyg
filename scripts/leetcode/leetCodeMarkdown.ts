import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1662. 检查两个字符串数组是否相等',
  url: 'https://leetcode.cn/problems/check-if-two-string-arrays-are-equivalent/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.字符串],
  desc: `给你两个字符串数组 word1 和 word2 。如果两个数组表示的字符串相同，返回 true ；否则，返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 11,
      desc: '双指针遍历',
      code: `class Solution {
public:
    bool arrayStringsAreEqual(vector<string>& word1, vector<string>& word2) {
        int w1 = 0, l1 = 0, w2 = 0, l2 = 0;
        while (l1 < word1.size() && l2 < word2.size()) {
            if (word1[l1][w1++] != word2[l2][w2++]) return false;
            if (w1 == word1[l1].size()) w1 = 0, l1++;
            if (w2 == word2[l2].size()) w2 = 0, l2++;
        }
        return l1 == word1.size() && l2 == word2.size();
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
