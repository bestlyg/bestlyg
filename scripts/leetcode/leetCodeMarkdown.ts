import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1614. 括号的最大嵌套深度',
  url: 'https://leetcode-cn.com/problems/maximum-nesting-depth-of-the-parentheses/',
  difficulty: Difficulty.简单,
  tag: [Tag.栈, Tag.字符串],
  desc: `给你一个 有效括号字符串 s，返回该字符串的 s 嵌套深度 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 6.1,
      desc: '记录括号',
      code: `class Solution {
   public:
    int maxDepth(string s) {
        int ans = 0, cur = 0;
        for (auto& ch : s) {
            if (ch == '(')
                ans = max(ans, ++cur);
            else if (ch == ')')
                --cur;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
