import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1021. 删除最外层的括号',
  url: 'https://leetcode.cn/problems/find-closest-lcci/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.字符串],
  desc: `有个内含单词的超大文本文件，给定任意两个不同的单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.4,
      desc: '一次遍历, 储存当前等级',
      code: `class Solution {
   public:
    string removeOuterParentheses(string s) {
        string ans = "";
        int level = 0;
        for (auto& ch : s) {
            if (ch == '(') {
                if (level != 0) ans += ch;
                level++;
            } else {
                level--;
                if (level != 0) ans += ch;
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
