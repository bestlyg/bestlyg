import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '921. 使括号有效的最少添加',
  url: 'https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/',
  difficulty: Difficulty.中等,
  tag: [Tag.栈, Tag.贪心, Tag.字符串],
  desc: `返回 为使结果字符串 s 有效而必须添加的最少括号数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6,
      desc: '遍历',
      code: `class Solution {
public:
    int minAddToMakeValid(string s) {
        int cnt = 0, l = 0;
        for (auto &c : s) {
            if (c == '(') l++;
            else if (l == 0) cnt++;
            else l--;
        }
        return cnt + l;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
