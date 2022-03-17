import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '357. 计算各个位数不同的数字个数',
  url: 'https://leetcode-cn.com/problems/count-numbers-with-unique-digits/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学, Tag.动态规划, Tag.回溯],
  desc: `给定一个非负整数 n，计算各位数字都不同的数字 x 的个数，其中 0 ≤ x < 10n 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '提前计算答案进行累加',
      code: `class Solution {
   public:
    int lists[8] = {9, 81, 648, 4536, 27216, 136080, 544320, 1632960};
    int countNumbersWithUniqueDigits(int n) {
        int ans = 1;
        for (int i = 1; i <= n; i++) {
            ans += lists[i - 1];
        }
        return ans;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 5.9,
      desc: '计算每位数有几种可能性',
      code: `class Solution {
   public:
    int countNumbersWithUniqueDigits(int n) {
        if (n == 0) return 1;
        vector<int> dp(n + 1);
        dp[0] = 1;
        dp[1] = 9;
        for (int i = 2, num = 9; i <= n; i++, num--) dp[i] = dp[i - 1] * num;
        int ans = 0;
        for (int i = 0; i <= n; i++) ans += dp[i];
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
