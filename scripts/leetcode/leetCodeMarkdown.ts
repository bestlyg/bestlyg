import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2000. 反转单词前缀',
  url: 'https://leetcode-cn.com/problems/reverse-prefix-of-word/',
  difficulty: Difficulty.简单,
  tag: [Tag.双指针, Tag.字符串],
  desc: `给你一个下标从 0 开始的字符串 word 和一个字符 ch 。找出 ch 第一次出现的下标 i ，反转 word 中从下标 0 开始、直到下标 i 结束（含下标 i ）的那段字符。如果 word 中不存在字符 ch ，则无需进行任何操作。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '遍历',
      code: `class Solution {
   public:
    string reversePrefix(string word, char ch) {
        int idx = 0;
        while (idx < word.size() && word[idx] != ch) idx++;
        if (idx == word.size()) return word;
        string ans = word.substr(0, idx + 1);
        reverse(ans.begin(), ans.end());
        ans += word.substr(idx + 1, word.size() - idx - 1);
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 6.2,
      desc: '遍历',
      code: `class Solution {
   public:
    string reversePrefix(string word, char ch) {
        int idx = 0;
        while (idx < word.size() && word[idx] != ch) idx++;
        if (idx == word.size()) return word;
        string ans = "";
        for (int i = idx; i >= 0; i--) ans += word[i];
        for (int i = idx + 1; i < word.size(); i++) ans += word[i];
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
