import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2413. 最小偶倍数',
  url: 'https://leetcode.cn/problems/smallest-even-multiple/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个正整数 n ，返回 2 和 n 的最小公倍数（正整数）。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory:5.8,
      desc: 'gcd',
      code: `int gcd(int a, int b) {
    if (a < b) return gcd(b, a);
    if (b == 0) return a;
    return gcd(b, a % b);
}
class Solution {
public:
    int smallestEvenMultiple(int n) {
        int res = gcd(2, n), num = 2 * n / res;
        if (num % 2 != 0) num *= 2;
        return num;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 52,
      memory: 14.7,
      desc: '同上',
      code: `def gcd(a: int, b: int):
    if a < b:
        return gcd(b, a)
    if b == 0:
        return a
    return gcd(b, a % b)


class Solution:
    def smallestEvenMultiple(self, n: int) -> int:
        res = gcd(2, n)
        num = 2*n/res
        if num % 2 != 0:
            num *= 2
        return int(num) `,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `fn gcd(a: i32, b: i32) -> i32 {
    if a < b {
        gcd(b, a)
    } else if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}

impl Solution {
    pub fn smallest_even_multiple(n: i32) -> i32 {
        let res = gcd(2, n);
        let mut num = 2 * n / res;
        if num % 2 != 0 {
            num *= 2;
        }
        num
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
