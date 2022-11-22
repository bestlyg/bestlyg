import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '878. 第 N 个神奇数字',
  url: 'https://leetcode.cn/problems/soup-servings/',
  difficulty: Difficulty.中等,
  tag: [Tag.数学, Tag.动态规划, Tag.概率与统计],
  desc: `有 A 和 B 两种类型 的汤。当两种类型的汤都分配完时，停止操作。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 5.7,
      desc: '二分，判断当前数是第几个数 = n / a + n / b - n / lcm',
      code: `class Solution {
public:
    const int mod = 1e9 + 7;
    int gcd(int a, int b) {
        if (b > a) return gcd(b, a);
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    int lcm(int a, int b) {
        return a * b / gcd(a, b);
    }
    int nthMagicalNumber(int n, int a, int b) {
        long long l = min(a, b), r = n * l, m, nlcm = lcm(a, b);
        while (l < r) {
            m = (l + r) >> 1;
            int num = m / a + m / b - m / nlcm;
            if (num >= n) r = m;
            else l = m + 1;
        }
        return l % mod;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
