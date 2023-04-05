import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2427. 公因子的数目',
  url: 'https://leetcode.cn/problems/number-of-common-factors/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你两个正整数 a 和 b ，返回 a 和 b 的 公 因子的数目。如果 x 可以同时整除 a 和 b ，则认为 x 是 a 和 b 的一个 公因子 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory:5.8,
      desc: '遍历',
      code: `class Solution {
public:
    int commonFactors(int a, int b) {
        int res = 0;
        for (int i = 1; i <= min(a, b); i++) {
            if (a % i == 0 && b % i == 0) res++;
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 44,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def commonFactors(self, a: int, b: int) -> int:
        return len([i for i in range(1, min(a, b) + 1) if a % i == 0 and b % i == 0])
  `,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 1.9,
      desc: '同上',
      code: `impl Solution {
    pub fn common_factors(a: i32, b: i32) -> i32 {
        (1..=a.min(b))
            .into_iter()
            .filter(|v| a % v == 0 && b % v == 0)
            .collect::<Vec<i32>>()
            .len() as i32
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
