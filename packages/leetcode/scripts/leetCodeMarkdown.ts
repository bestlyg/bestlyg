import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1012. 至少有 1 位重复的数字',
  url: 'https://leetcode.cn/problems/numbers-with-repeated-digits/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给定正整数 n，返回在 [1, n] 范围内具有 至少 1 位 重复数字的正整数的个数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 72,
      memory: 14.3,
      desc: '数位dp',
      code: `class Solution {
public:
    unordered_map<int, unordered_map<int, int>> m;
    int dfs(string &sn, int idx, int mask, bool limit, bool empty) {
        if (idx == sn.size()) return empty ? 0 : 1;
        if (!limit && !empty && m[idx].count(mask)) return m[idx][mask];
        int res = 0;
        if (empty) res += dfs(sn, idx + 1, mask, false, true);
        for (int j = empty ? 1 : 0, nmax = limit ? sn[idx] - '0' : 9; j <= nmax; j++)
            if ((mask & (1 << j)) == 0) res += dfs(sn, idx + 1, mask | (1 << j), limit && j == nmax, false);
        return m[idx][mask] = res;
    };
    int numDupDigitsAtMostN(int n) {
        string sn = to_string(n);
        return n - dfs(sn, 0, 0, true, true);
    }
};`,
    },
    {
      script: Script.PY3,
      time: 280,
      memory: 19.4,
      desc: '同上',
      code: `class Solution:
    def numDupDigitsAtMostN(self, n: int) -> int:
        sn = str(n)
  
        @cache
        def dfs(idx: int, mask: int, limit: bool, empty: bool):
            if idx == len(sn):
                return 0 if empty else 1
            res = 0
            if empty:
                res += dfs(idx+1, mask, False, True)
            nmax = int(sn[idx]) if limit else 9
            for j in range(1 if empty else 0, nmax+1):
                if (mask & (1 << j)) == 0:
                    res += dfs(idx+1, mask | (1 << j),
                               limit and j == nmax, False)
            return res
        return n - dfs(0, 0, True, True)`,
    },
    {
      script: Script.RUST,
      time: 8,
      memory: 1.9,
      desc: '同上',
      code: `impl Solution {
    pub fn num_dup_digits_at_most_n(n: i32) -> i32 {
        let sn = format!("{}", n).chars().collect::<Vec<char>>();
        let mut m = vec![vec![-1; 1 << 10]; sn.len()];
        fn dfs(
            sn: &Vec<char>,
            m: &mut Vec<Vec<i32>>,
            idx: usize,
            mask: usize,
            limit: bool,
            empty: bool,
        ) -> i32 {
            if idx == sn.len() {
                if empty {
                    0
                } else {
                    1
                }
            } else if !limit && !empty && m[idx][mask] != -1 {
                m[idx][mask]
            } else {
                let mut res = if empty {
                    dfs(sn, m, idx + 1, mask, false, true)
                } else {
                    0
                };
                let nmax = if limit {
                    sn[idx] as usize - '0' as usize
                } else {
                    9
                };
                for j in (if empty { 1 } else { 0 })..=nmax {
                    if (mask & (1 << j)) == 0 {
                        res += dfs(sn, m, idx + 1, mask | (1 << j), limit && j == nmax, false);
                    }
                }
                m[idx][mask] = res;
                res
            }
        }
        return n - dfs(&sn, &mut m, 0, 0, true, true);
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
