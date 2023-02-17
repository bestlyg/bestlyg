import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1139. 最大的以 1 为边界的正方形',
  url: 'https://leetcode.cn/problems/largest-1-bordered-square/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你一个由若干 0 和 1 组成的二维网格 grid，请你找出边界全部由 1 组成的最大 正方形 子网格，并返回该子网格中的元素数量。如果不存在，则返回 0。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 10.6,
      desc: '预处理每个点的最大延长后遍历',
      code: `#define MAX 105
class Solution {
public:
    int largest1BorderedSquare(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        // 0: l, 1: r, 2 : t, 3: b
        int cache[MAX][MAX][4] = {0}, cnt;
        for (int i = 0; i < n; i++) {
            cnt = 0;
            for (int j = 0; j < m; j++) {
                cache[i][j][0] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
            cnt = 0;
            for (int j = m - 1; j >= 0; j--) {
                cache[i][j][1] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
        }
        for (int j = 0; j < m; j++) {
            cnt = 0;
            for (int i = 0; i < n; i++) {
                cache[i][j][2] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
            cnt = 0;
            for (int i = n - 1; i >= 0; i--) {
                cache[i][j][3] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
        }

        cnt = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 0) continue;
                cnt = max(cnt, 1);
                for (int k = 1; k <= min(cache[i][j][1], cache[i][j][3]); k++) {
                    if (cache[i + k][j][1] >= k && cache[i][j + k][3] >= k) cnt = max(cnt, (int)pow(k + 1, 2));
                }
            }
        }

        return cnt;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 272,
      memory: 16.3,
      desc: '同上',
      code: `class Solution:
    def largest1BorderedSquare(self, grid: List[List[int]]) -> int:
        n, m, cnt = len(grid), len(grid[0]), 0
        MAX = 105
        cache = [[[0] * 4 for _ in range(MAX)] for _ in range(MAX)]
        for i in range(n):
            cnt = 0
            for j in range(m):
                cache[i][j][0] = cnt
                cnt = cnt + 1 if grid[i][j] == 1 else 0
            cnt = 0
            for j in range(m - 1, -1, -1):
                cache[i][j][1] = cnt
                cnt = cnt + 1 if grid[i][j] == 1 else 0
        for j in range(m):
            cnt = 0
            for i in range(n):
                cache[i][j][2] = cnt
                cnt = cnt + 1 if grid[i][j] == 1 else 0
            cnt = 0
            for i in range(n - 1, -1, -1):
                cache[i][j][3] = cnt
                cnt = cnt + 1 if grid[i][j] == 1 else 0
        cnt = 0
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 0:
                    continue
                cnt = max(cnt, 1)
                for k in range(1, min(cache[i][j][1], cache[i][j][3]) + 1):
                    if cache[i + k][j][1] >= k and cache[i][j + k][3] >= k:
                        cnt = max(cnt, pow(k + 1, 2))
        return cnt`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.5,
      desc: '同上',
      code: `impl Solution {
    pub fn largest1_bordered_square(grid: Vec<Vec<i32>>) -> i32 {
        const MAX: usize = 105;
        let n = grid.len();
        let m = grid[0].len();
        let mut cnt = 0;
        let mut cache = [[[0; 4]; MAX]; MAX];
        for i in 0..n {
            cnt = 0;
            for j in 0..m {
                cache[i][j][0] = cnt;
                cnt = if grid[i][j] == 1 { cnt + 1 } else { 0 };
            }
            cnt = 0;
            for j in (0..m).rev() {
                cache[i][j][1] = cnt;
                cnt = if grid[i][j] == 1 { cnt + 1 } else { 0 };
            }
        }
        for j in 0..m {
            cnt = 0;
            for i in 0..n {
                cache[i][j][2] = cnt;
                cnt = if grid[i][j] == 1 { cnt + 1 } else { 0 };
            }
            cnt = 0;
            for i in (0..n).rev() {
                cache[i][j][3] = cnt;
                cnt = if grid[i][j] == 1 { cnt + 1 } else { 0 };
            }
        }
        cnt = 0;
        for i in 0..n {
            for j in 0..m {
                if grid[i][j] == 0 {
                    continue;
                }
                cnt = cnt.max(1);
                for k in 1..=cache[i][j][1].min(cache[i][j][3]) {
                    if cache[i + k][j][1] >= k && cache[i][j + k][3] >= k {
                        cnt = cnt.max((k + 1).pow(2));
                    }
                }
            }
        }
        cnt as i32
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;