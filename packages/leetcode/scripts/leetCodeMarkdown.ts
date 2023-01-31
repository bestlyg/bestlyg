import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2319. 判断矩阵是否是一个 X 矩阵',
  url: 'https://leetcode.cn/problems/check-if-matrix-is-x-matrix/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组,Tag.矩阵],
  desc: `给你一个大小为 n x n 的二维整数数组 grid ，表示一个正方形矩阵。如果 grid 是一个 X 矩阵 ，返回 true ；否则，返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 24,
      memory: 15.9,
      desc: '遍历',
      code: `class Solution {
public:
    bool checkXMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j || i == n - 1 - j) {
                    if (grid[i][j] == 0) return false;
                } else if (grid[i][j] != 0) {
                    return false;
                }
            }
        }
        return true;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 48,
      memory: 15.8,
      desc: '同上',
      code: `class Solution:
    def checkXMatrix(self, grid: List[List[int]]) -> bool:
        n = len(grid)
        for i in range(n):
            for j in range(n):
                if i == j or i == n - 1 - j:
                    if grid[i][j] == 0:
                        return False
                elif grid[i][j] != 0:
                    return False
        return True`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.3,
      desc: '同上',
      code: `impl Solution {
    pub fn check_x_matrix(grid: Vec<Vec<i32>>) -> bool {
        let n = grid.len();
        for i in 0..n {
            for j in 0..n {
                if i == j || i == n - 1 - j {
                    if grid[i][j] == 0 {
                        return false;
                    }
                } else if grid[i][j] != 0 {
                    return false;
                }
            }
        }
        return true;
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
