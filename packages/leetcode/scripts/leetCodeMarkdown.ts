import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6357. 最少得分子序列',
  url: 'https://leetcode.cn/problems/subsequence-with-the-minimum-score/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回使 t 成为 s 子序列的最小得分。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 11.2,
      desc: '前后缀匹配，把s分成前后两部分进行枚举，对于每一部分尝试匹配t的前后缀的最大长度',
      code: `class Solution {
public:
    int minimumScore(string s, string t) {
        int n = s.size(), m = t.size();
        vector<int> pre(n), suf(n + 1, m);
        for (int i = 0, p = 0; i < n && p < m; i++) {
            if (s[i] == t[p]) p++;
            pre[i] = p;
        }
        for (int i = n - 1, p = m - 1; i >= 0 && p >= 0; i--) {
            if (s[i] == t[p]) p--;
            suf[i] = p + 1;
        }
        int res = suf[0];
        for (int i = 0; i < n; i++) {
            if (suf[i + 1] < pre[i]) return 0;
            res = min(res, suf[i + 1] - pre[i]);
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 156,
      memory: 23.2,
      desc: '同上',
      code: `class Solution:
    def minimumScore(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        pre, suf = [0] * n, [m] * (n + 1)
        i, p = 0, 0
        while i < n and p < m:
            if s[i] == t[p]:
                p += 1
            pre[i] = p
            i += 1
        i, p = n-1, m-1
        while i >= 0 and p >= 0:
            if s[i] == t[p]:
                p -= 1
            suf[i] = p+1
            i -= 1
        res = suf[0]
        for i in range(n):
            if suf[i + 1] < pre[i]:
                return 0
            res = min(res, suf[i + 1] - pre[i])
        return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory:4.8,
      desc: '同上',
      code: `impl Solution {
    pub fn minimum_score(s: String, t: String) -> i32 {
        let (s, t) = (
            s.chars().collect::<Vec<char>>(),
            t.chars().collect::<Vec<char>>(),
        );
        let (n, m) = (s.len(), t.len());
        let (mut pre, mut suf) = (vec![0; n], vec![m; n + 1]);
        let (mut i, mut p) = (0, 0);
        while i < n && p < m {
            if s[i] == t[p] {
                p += 1;
            }
            pre[i] = p;
            i += 1;
        }
        let (mut i, mut p) = ((n - 1) as i32, (m - 1) as i32);
        while i >= 0 && p >= 0 {
            if s[i as usize] == t[p as usize] {
                p -= 1;
            }
            suf[i as usize] = p as usize + 1;
            i -= 1;
        }
        let mut res = suf[0];
        for i in 0..n {
            if suf[i + 1] < pre[i] {
                return 0;
            }
            res = res.min(suf[i + 1] - pre[i]);
        }
        res as i32
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
