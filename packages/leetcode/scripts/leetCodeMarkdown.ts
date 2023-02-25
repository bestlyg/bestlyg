import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1247. 交换字符使得字符串相同',
  url: 'https://leetcode.cn/problems/minimum-swaps-to-make-strings-equal//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `最后，请你返回使 s1 和 s2 相同的最小交换次数，如果没有方法能够使得这两个字符串相同，则返回 -1 。

  `,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 6.1,
      desc: '贪心',
      code: `class Solution {
public:
    int minimumSwap(string s1, string s2) {
        int xcnt = 0, ycnt = 0, n = s1.size(), ans = 0;
        for (int i = 0; i < n; i++) {
            if (s1[i] == s2[i]) continue;
            if (s1[i] == 'x') xcnt++;
            else ycnt++;
        }
        ans += xcnt / 2;
        xcnt %= 2;
        ans += ycnt / 2;
        ycnt %= 2;
        if (xcnt && ycnt) ans += 2, xcnt = 0, ycnt = 0;
        return xcnt || ycnt ? -1 : ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 15,
      desc: '同上',
      code: `class Solution:
    def minimumSwap(self, s1: str, s2: str) -> int:
        xcnt, ycnt = 0, 0
        ans = 0
        for a, b in zip(s1, s2):
            if a != b:
                if a == 'x':
                    xcnt += 1
                else:
                    ycnt += 1
        ans += xcnt // 2
        xcnt %= 2
        ans += ycnt // 2
        ycnt %= 2
        if xcnt and ycnt:
            ans += 2
            xcnt = 0
            ycnt = 0
        return -1 if xcnt or ycnt else ans`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn minimum_swap(s1: String, s2: String) -> i32 {
        let s1 = s1.chars().collect::<Vec<char>>();
        let s2 = s2.chars().collect::<Vec<char>>();
        let n = s1.len();
        let mut ans = 0;
        let (mut x, mut y) = (0, 0);
        for i in 0..n {
            if s1[i] != s2[i] {
                if s1[i] == 'x' {
                    x += 1;
                } else {
                    y += 1;
                }
            }
        }
        ans += x / 2 + y / 2;
        x %= 2;
        y %= 2;
        if x != 0 && y != 0 {
            ans += 2;
            x = 0;
            y = 0;
        }
        if x != 0 || y != 0 {
            -1
        } else {
            ans
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
