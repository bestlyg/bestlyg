import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6224. 最大公因数等于 K 的子数组数目',
  url: 'https://leetcode.cn/problems/number-of-subarrays-with-gcd-equal-to-k/',
  difficulty: Difficulty.中等,
  tag: [],
  desc: `数组的最大公因数 是能整除数组中所有元素的最大整数。`,
  solutions: [
    {
      script: Script.TS,
      time: 88,
      memory: 42.4,
      desc: 'gcd后暴力',
      code: `function gcd(a: number, b: number): number {
        if (a < b) return gcd(b, a);
        if (b) return gcd(b, a % b);
        return a;
      }
      function subarrayGCD(nums: number[], k: number): number {
        let ans = 0;
        const n = nums.length;
        for (let i = 0; i < n; i++) {
          if (nums[i] === k) {
            ans++;
          }
          let num = nums[i];
          for (let j = i - 1; j >= 0; j--) {
            num = gcd(nums[j], num);
            if (num === k) ans++;
          }
        }
        return ans;
      }`,
    },
  ],
};
export default leetCodeMarkdown;
