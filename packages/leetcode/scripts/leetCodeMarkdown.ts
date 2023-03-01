import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2373. 矩阵中的局部最大值',
  url: 'https://leetcode.cn/problems/largest-local-values-in-a-matrix/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `找出 grid 中每个 3 x 3 矩阵中的最大值。`,
  solutions: [
    {
      script: Script.CPP,
      time: 12,
      memory: 10.8,
      desc: '遍历',
      code: `class Solution {
public:
    vector<vector<int>> largestLocal(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<int>> res(n - 2, vector<int>(n - 2, 0));
        for (int i = 1; i < n - 1; i++) {
            for (int j = 1; j < n - 1; j++) {
                for (int row = i - 1; row <= i + 1; row++) {
                    for (int col = j - 1; col <= j + 1; col++) {
                        res[i - 1][j - 1] = max(res[i - 1][j - 1], grid[row][col]);
                    }
                }
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 15.5,
      desc: '同上',
      code: `class Solution:
    def largestLocal(self, grid: List[List[int]]) -> List[List[int]]:
        n = len(grid)
        res = [[0] * (n-2) for _ in range(n-2)]
        for i in range(1, n-1):
            for j in range(1, n-1):
                res[i-1][j-1] = max(
                    grid[row][col]
                    for row in range(i-1, i+2)
                    for col in range(j-1, j+2)
                )
        return res`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
        pub fn largest_local(grid: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
            let n = grid.len();
            let mut res = vec![vec![0; n - 2]; n - 2];
            for i in 1..(n - 1) {
                for j in 1..(n - 1) {
                    for row in (i - 1)..=(i + 1) {
                        for col in (j - 1)..=(j + 1) {
                            res[i - 1][j - 1] = res[i - 1][j - 1].max(grid[row][col]);
                        }
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
