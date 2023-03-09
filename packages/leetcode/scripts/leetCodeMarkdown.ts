import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2379. 得到 K 个黑块的最少涂色次数',
  url: 'https://leetcode.cn/problems/minimum-recolors-to-get-k-consecutive-black-blocks/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个整数 k ，表示想要 连续 黑色块的数目。每一次操作中，你可以选择一个白色块将它 涂成 黑色块。请你返回至少出现 一次 连续 k 个黑色块的 最少 操作次数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 8,
      memory: 6.2,
      desc: '遍历',
      code: `class Solution {
public:
    int minimumRecolors(string blocks, int k) {
        int n = blocks.size(), ans = 0x3f3f3f3f, cur = 0;
        for (int i = 0; i < n; i++) {
            cur += blocks[i] == 'W' ? 1 : 0;
            if (i + 1 >= k) {
                if (i + 1 > k) cur -= blocks[i - k] == 'W' ? 1 : 0;
                ans = min(ans, cur);
            }
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
    def minimumRecolors(self, blocks: str, k: int) -> int:
        n, ans, cur = len(blocks), 0x3f3f3f3f, 0
        for i in range(n):
            cur += 1 if blocks[i] == 'W' else 0
            if i + 1 >= k:
                if i + 1 > k:
                    cur -= 1 if blocks[i - k] == 'W' else 0
                ans = min(ans, cur)
        return ans`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
        pub fn minimum_recolors(blocks: String, k: i32) -> i32 {
            let k = k as usize;
            let blocks = blocks.chars().collect::<Vec<char>>();
            let (n, mut ans, mut cur) = (blocks.len(), 0x3f3f3f3f, 0);
            for i in 0..n {
                cur += if blocks[i] == 'W' { 1 } else { 0 };
                if i + 1 >= k {
                    if i + 1 > k {
                        cur -= if blocks[i - k] == 'W' { 1 } else { 0 };
                    }
                    ans = ans.min(cur);
                }
            }
            ans
        }
    }`,
    },
  ],
};

export default leetCodeMarkdown;
