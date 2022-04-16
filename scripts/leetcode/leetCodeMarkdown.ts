import { specStr, markdown } from '../utils';
import { Markdown, Difficulty, Tag, Script } from './leetcode';

const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '479. 最大回文数乘积',
  url: 'https://leetcode-cn.com/problems/largest-palindrome-product/',
  difficulty: Difficulty.困难,
  tag: [Tag.数学],
  desc: `给定一个整数 n ，返回 可表示为两个 n 位整数乘积的 最大回文整数 。因为答案可能非常大，所以返回它对 1337 取余 。  `,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 5.7,
      desc: '枚举',
      code: `long long arr[8] = {9,          9009,         906609,         99000099,
                    9966006699, 999000000999, 99956644665999, 9999000000009999};
class Solution {
    public:
     int largestPalindrome(int n) { return arr[n - 1] % 1337; }
};`,
    },
  ],
};
export default leetCodeMarkdown;
