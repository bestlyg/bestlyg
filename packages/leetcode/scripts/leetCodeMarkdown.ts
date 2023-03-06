import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1653. 使字符串平衡的最少删除次数',
  url: 'https://leetcode.cn/problems/minimum-deletions-to-make-string-balanced//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回使 s 平衡 的 最少 删除次数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 64,
      memory: 21.6,
      desc: '遍历到b的时候不做处理，遍历到a的时候考虑删除当前a或者删除前面的b',
      code: `class Solution {
public:
    int minimumDeletions(string s) {
        int dp = 0, b = 0;
        for (auto &c : s) {
            if (c == 'a') dp = min(dp + 1, b);
            else b += 1;
        }
        return dp;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 300,
      memory: 15.5,
      desc: '同上',
      code: `class Solution:
    def minimumDeletions(self, s: str) -> int:
        dp, b = 0, 0
        for c in s:
            if c == 'a':
                dp = min(dp+1, b)
            else:
                b += 1
        return dp`,
    },
    {
      script: Script.RUST,
      time: 16,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
        pub fn minimum_deletions(s: String) -> i32 {
            let (mut dp, mut b) = (0, 0);
            for c in s.chars() {
                if c == 'a' {
                    dp = b.min(dp + 1);
                } else {
                    b += 1;
                }
            }
            dp
        }
    }`,
    },
  ],
};

export default leetCodeMarkdown;
