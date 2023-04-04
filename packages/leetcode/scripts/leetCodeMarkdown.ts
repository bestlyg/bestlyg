import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1000. 合并石头的最低成本',
  url: 'https://leetcode.cn/problems/minimum-cost-to-merge-stones/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `有 N 堆石头排成一排，第 i 堆中有 stones[i] 块石头。每次移动（move）需要将连续的 K 堆石头合并为一堆，而这个移动的成本为这 K 堆石头的总数。找出把所有石头合并成一堆的最低成本。如果不可能，返回 -1 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 28,
      memory: 24.1,
      desc: '区间dp',
      code: `class Solution {
public:
    int mergeStones(vector<int>& stones, int k) {
        int n = stones.size(), dp[n][n][k + 1];
        if ((n - k) % (k - 1) != 0) return -1;
        memset(dp, -1, sizeof(dp));
        vector<int> sums(1, 0);
        for (auto &s : stones) sums.push_back(sums.back() + s);
        function<int(int, int, int)> dfs = [&](int start, int end, int p) -> int {
            if (start == end) return 0;
            if (dp[start][end][p] != -1) return dp[start][end][p];
            if (p == 1) return dp[start][end][p] = start == end ? 0 : sums[end + 1] - sums[start] + dfs(start, end, k);
            int res = INT_MAX;
            for (int m = start; m < end; m += k - 1) {
                res = min(res, dfs(start, m, 1) + dfs(m + 1, end, p - 1));
            }
            return dp[start][end][p] = res == INT_MAX ? -1 : res;
        };
        return dfs(0, n - 1, 1);
    }
};`,
    },
    {
      script: Script.CPP,
      time: 0,
      memory: 7.7,
      desc: '区间dp',
      code: `class Solution {
public:
    int mergeStones(vector<int>& stones, int k) {
        int n = stones.size(), dp[n][n];
        if ((n - k) % (k - 1) != 0) return -1;
        memset(dp, -1, sizeof(dp));
        vector<int> sums(1, 0);
        for (auto &s : stones) sums.push_back(sums.back() + s);
        function<int(int, int)> dfs = [&](int start, int end) -> int {
            if (start == end) return 0;
            if (dp[start][end] != -1) return dp[start][end];
            int res = INT_MAX;
            for (int m = start; m < end; m += k - 1) {
                res = min(res, dfs(start, m) + dfs(m + 1, end));
            }
            if ((end - start) % (k - 1) == 0) res += sums[end + 1] - sums[start];
            return dp[start][end] = res;
        };
        return dfs(0, n - 1);
    }
};`,
    },
    {
      script: Script.PY3,
      time: 44,
      memory: 15.5,
      desc: '同上',
      code: `class Solution:
    def mergeStones(self, stones: List[int], k: int) -> int:
        n = len(stones)
        if (n - k) % (k - 1) != 0:
            return -1
        dp = [[-1] * n for _ in range(n)]
        sums = [0]
        for s in stones:
            sums.append(sums[-1] + s)

        @cache
        def dfs(start: int, end: int) -> int:
            if start == end:
                return 0
            res = 0x7fffffff
            for m in range(start, end, k-1):
                res = min(res, dfs(start, m) + dfs(m + 1, end))
            if (end - start) % (k - 1) == 0:
                res += sums[end + 1] - sums[start]
            return res
        return dfs(0, n-1)`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn merge_stones(stones: Vec<i32>, k: i32) -> i32 {
        let n = stones.len();
        let k = k as usize;
        if (n - k) % (k - 1) != 0 {
            return -1;
        }
        let mut dp = vec![vec![-1; n]; n];
        let mut sums = vec![-1];
        for s in stones {
            sums.push(*sums.last().unwrap() + s);
        }

        fn dfs(dp: &mut Vec<Vec<i32>>, sums: &Vec<i32>, k: usize, start: usize, end: usize) -> i32 {
            if start == end {
                0
            } else if dp[start][end] != -1 {
                dp[start][end]
            } else {
                let mut res = i32::MAX;
                let mut m = start;
                while m < end {
                    res = res.min(dfs(dp, sums, k, start, m) + dfs(dp, sums, k, m + 1, end));
                    m += k - 1;
                }
                if (end - start) % (k - 1) == 0 {
                    res += sums[end + 1] - sums[start];
                }
                dp[start][end] = res;
                res
            }
        }
        return dfs(&mut dp, &sums, k, 0, n - 1);
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
