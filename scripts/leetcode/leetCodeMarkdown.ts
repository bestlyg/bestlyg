import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1716. 计算力扣银行的钱',
  url: 'https://leetcode-cn.com/problems/calculate-money-in-leetcode-bank/',
  difficulty: Difficulty.简单,
  tag: [Tag.数学],
  desc: `给你 n ，请你返回在第 n 天结束的时候他在力扣银行总共存了多少块钱。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.8,
      desc: '等差数列',
      code: `class Solution {
   public:
    int totalMoney(int n) {
        int ans = 0, start = 1;
        for (; start <= n / 7; start++) ans += (start + start + 6) * 7 / 2;
        ans += (start + start + n % 7 - 1) * (n % 7) / 2;
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
