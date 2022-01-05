import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1576. 替换所有的问号',
  url: 'https://leetcode-cn.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters/',
  difficulty: Difficulty.简单,
  tag: [Tag.字符串],
  desc: `给你一个仅包含小写英文字母和 '?' 字符的字符串 s，请你将所有的 '?' 转换为若干小写字母，使最终的字符串不包含任何 连续重复 的字符。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.8,
      desc: '遍历到问号进行重新赋值 ',
      code: `class Solution {
   public:
    string modifyString(string s) {
        for (int i = 0, n = s.size(); i < n; i++) {
            if (s[i] != '?') continue;
            char prev = i > 0 ? s[i - 1] : '\\0',
                 next = i < n - 1 ? s[i + 1] : '\\0';
            for (char ch = 'a'; ch <= 'z'; ch++) {
                if (prev != ch && next != ch) {
                    s[i] = ch;
                    break;
                }
            }
        }
        return s;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
