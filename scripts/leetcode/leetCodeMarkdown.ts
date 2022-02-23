import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '917. 仅仅反转字母',
  url: 'https://leetcode-cn.com/problems/reverse-only-letters/',
  difficulty: Difficulty.简单,
  tag: [Tag.双指针, Tag.字符串],
  desc: `返回反转后的 s 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '双指针',
      code: `class Solution {
   public:
    string reverseOnlyLetters(string s) {
        for (int l = 0, r = s.size() - 1; l < r; l++, r--) {
            while (l < s.size() && !isalpha(s[l])) l++;
            while (r >= 0 && !isalpha(s[r])) r--;
            if (l < r) swap(s[l], s[r]);
        }
        return s;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
