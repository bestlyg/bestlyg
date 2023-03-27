import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1638. 统计只差一个字符的子串数目',
  url: 'https://leetcode.cn/problems/count-substrings-that-differ-by-one-character/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你两个字符串 s 和 t ，请你找出 s 中的非空子串的数目，这些子串满足替换 一个不同字符 以后，是 t 串的子串。换言之，请你找到 s 和 t 串中 恰好 只有一个字符不同的子字符串对的数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 6.1,
      desc: '枚举',
      code: `class Solution {
public:
    int countSubstrings(string s, string t) {
        int n = s.size(), m = t.size(), res = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int cnt = 0;
                for (int k = 0; i + k < n && j + k < m; k++) {
                    if (s[i + k] != t[j + k]) cnt++;
                    if (cnt == 1) res++;
                    else if (cnt > 1) break;
                }
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 72,
      memory: 14.7,
      desc: '同上',
      code: `class Solution:
    def countSubstrings(self, s: str, t: str) -> int:
        n, m, res = len(s), len(t), 0
        for i in range(n):
            for j in range(m):
                cnt, k = 0, 0
                while i+k < n and j+k < m:
                    if s[i+k] != t[j+k]:
                        cnt += 1
                    if cnt == 1:
                        res += 1
                    elif cnt > 1:
                        break
                    k += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2,
      desc: '同上',
      code: `impl Solution {
    pub fn count_substrings(s: String, t: String) -> i32 {
        let (s, t) = (
            s.chars().collect::<Vec<char>>(),
            t.chars().collect::<Vec<char>>(),
        );
        let (n, m, mut res) = (s.len(), t.len(), 0);
        for i in 0..n {
            for j in 0..m {
                let (mut cnt, mut k) = (0, 0);
                while i + k < n && j + k < m {
                    if s[i + k] != t[j + k] {
                        cnt += 1
                    }
                    if cnt == 1 {
                        res += 1
                    } else if cnt > 1 {
                        break;
                    }
                    k += 1
                }
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
