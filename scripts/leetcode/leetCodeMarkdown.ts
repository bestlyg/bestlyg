import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2027. 转换字符串的最少操作次数',
  url: 'https://leetcode.cn/problems/minimum-moves-to-convert-string/',
  difficulty: Difficulty.简单,
  tag: [Tag.贪心, Tag.字符串],
  desc: `返回将 s 中所有字符均转换为 'O' 需要执行的 最少 操作次数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.2,
      desc: '遍历',
      code: `class Solution {
public:
    int minimumMoves(string s) {
        int ans = 0;
        for (int i = 0; i < s.size(); i++) 
            if (s[i] == 'X') ans++, i += 2;
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
