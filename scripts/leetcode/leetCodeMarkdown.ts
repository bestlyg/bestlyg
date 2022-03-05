import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '521. 最长特殊序列 I',
  url: 'https://leetcode-cn.com/problems/longest-uncommon-subsequence-i/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `给你两个字符串 a 和 b，请返回 这两个字符串中 最长的特殊序列  。如果不存在，则返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6,
      desc: '判断两个值是否相等',
      code: `class Solution {
   public:
    int findLUSlength(string a, string b) {
        return a == b ? -1 : max(a.size(), b.size());
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
