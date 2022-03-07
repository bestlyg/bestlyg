import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '504. 七进制数',
  url: 'https://leetcode-cn.com/problems/find-good-days-to-rob-the-bank/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组, Tag.动态规划, Tag.前缀和],
  desc: `请你返回一个数组，包含 所有 适合打劫银行的日子（下标从 0 开始）。返回的日子可以 任意 顺序排列。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.8,
      desc: '短除法',
      code: `class Solution {
   public:
    string convertToBase7(int num) {
        int f = 0;
        if (num < 0) {
            num = -num;
            f = 1;
        }
        string ans = "";
        while (num >= 7) {
            ans = to_string(num % 7) + ans;
            num /= 7;
        }
        ans = to_string(num) + ans;
        if (f) ans = "-" + ans;
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
