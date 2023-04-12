import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1147. 段式回文',
  url: 'https://leetcode.cn/problems/robot-bounded-in-circle/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `机器人按顺序执行指令 instructions，并一直重复它们。只有在平面中存在环使得机器人永远无法离开时，返回 true。否则，返回 false。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 6,
      desc: '遍历',
      code: `class Solution {
public:
    int longestDecomposition(string text) {
        int n = text.size(), res = 0;
        auto check = [&](int i1, int i2, int size) -> bool {
            while (size--) {
                if (text[i1++] != text[i2++]) return false;
            }
            return true;
        };
        for (int i = 0; i <= n / 2; i++) {
            int f = false;
            for (int cnt = 1; i + cnt <= n - i; cnt++) {
                if (check(i, n - i - cnt, cnt)) {
                    f = true;
                    if (i == n - i - cnt) res += 1; // 是一个字符串
                    else res += 2; 
                    i += cnt - 1;
                    break;
                }
            }
            if (!f) {
                if ((n - 2 * i) / 2 != 0) res += 1; // 只剩空字符串
                break;
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 44,
      memory: 14.8,
      desc: '同上',
      code: `class Solution:
    def longestDecomposition(self, text: str) -> int:
        n = len(text)
        res = 0
        def check(i1: int, i2: int, size: int) -> bool:
            while size:
                if text[i1] != text[i2]:
                    return False
                i1 += 1
                i2 += 1
                size -= 1
            return True
        i = 0
        while i <= n // 2:
            f = False
            cnt = 1
            while i + cnt <= n - i:
                if check(i, n - i - cnt, cnt):
                    f = True
                    if i == n - i - cnt:
                        res += 1
                    else:
                        res += 2
                    i += cnt-1
                    break
                cnt += 1
            if not f:
                if (n - 2 * i) / 2 != 0:
                    res += 1
                break
            i += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn longest_decomposition(text: String) -> i32 {
        let text = text.chars().collect::<Vec<char>>();
        let n = text.len();
        let mut res = 0;
        let check = |mut i1: usize, mut i2: usize, mut size: usize| -> bool {
            while size != 0 {
                if text[i1] != text[i2] {
                    return false;
                }
                i1 += 1;
                i2 += 1;
                size -= 1;
            }
            true
        };
        let mut i = 0;
        while i <= n / 2 {
            let mut f = false;
            let mut cnt = 1;
            while i + cnt <= n - i {
                if check(i, n - i - cnt, cnt) {
                    f = true;
                    res += if i == n - i - cnt { 1 } else { 2 };
                    i += cnt - 1;
                    break;
                }
                cnt += 1;
            }
            if !f {
                if (n - 2 * i) / 2 != 0 {
                    res += 1;
                }
                break;
            }
            i += 1;
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
