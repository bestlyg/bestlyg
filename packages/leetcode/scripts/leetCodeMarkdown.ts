import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1289. 下降路径最小和 II',
    url: 'https://leetcode.cn/problems/minimum-falling-path-sum-ii/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 n x n 整数矩阵 grid ，请你返回 非零偏移下降路径 数字和的最小值。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 40,
            memory: 13.82,
            desc: '遍历，只记录最小值和第二小值',
            code: `class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int n = grid.size(), min1, min2, res;
        auto refresh = [&](int row) {
            res = INT_MAX;
            min1 = INT_MAX;
            min2 = INT_MAX;
            for (int j = 0; j < n; j++) {
                res = min(res, grid[row][j]);
                if (min1 == INT_MAX || grid[row][j] < grid[row][min1]) min2 = min1, min1 = j;
                else if (min2 == INT_MAX || grid[row][j] < grid[row][min2]) min2 = j;
            }
        };
        for (int row = 1; row < n; row++) {
            refresh(row - 1);
            for (int j = 0; j < n; j++) {
                grid[row][j] += j == min1 ? grid[row - 1][min2] : grid[row - 1][min1];
            }
        }
        refresh(n - 1);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 128,
            memory: 18.97,
            desc: '同上',
            code: `class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)
        min1 = min2 = res = 0

        def refresh(row: int):
            nonlocal res
            nonlocal min1
            nonlocal min2
            res = min1 = min2 = inf
            for j in range(n):
                res = min(res, grid[row][j])
                if min1 == inf or grid[row][j] < grid[row][min1]:
                    min2 = min1
                    min1 = j
                elif min2 == inf or grid[row][j] < grid[row][min2]:
                    min2 = j
        for row in range(1, n):
            refresh(row-1)
            for j in range(n):
                grid[row][j] += grid[row -
                                        1][min2] if j == min1 else grid[row - 1][min1]
        refresh(n-1)
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.53,
            desc: '同上',
            code: `impl Solution {
    pub fn min_falling_path_sum(mut grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        let mut min1 = 0;
        let mut min2 = 0;
        for row in 1..n {
            min1 = usize::MAX;
            min2 = usize::MAX;
            for j in 0..n {
                if min1 == usize::MAX || grid[row - 1][j] < grid[row - 1][min1] {
                    min2 = min1;
                    min1 = j;
                } else if min2 == usize::MAX || grid[row - 1][j] < grid[row - 1][min2] {
                    min2 = j;
                }
            }
            for j in 0..n {
                grid[row][j] += if j == min1 {
                    grid[row - 1][min2]
                } else {
                    grid[row - 1][min1]
                };
            }
        }
        *grid[n - 1].iter().min().unwrap()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
