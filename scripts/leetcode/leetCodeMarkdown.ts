import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1332. 删除回文子序列',
  url: 'https://leetcode-cn.com/problems/remove-palindromic-subsequences/',
  difficulty: Difficulty.简单,
  tag: [Tag.双指针, Tag.字符串],
  desc: `返回删除给定字符串中所有字符（字符串为空）的最小删除次数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '考虑是回文子序列，并非连续，且只有两种字母',
      code: `class Solution {
   public:
    int removePalindromeSub(string s) {
        for (int start = 0, end = s.size() - 1; start <= end; start++, end--) {
            if (s[start] != s[end]) return 2;
        }
        return 1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
