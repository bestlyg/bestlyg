import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '931. 下降路径最小和',
    url: 'https://leetcode.cn/problems/minimum-falling-path-sum/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 n x n 的 方形 整数数组 matrix ，请你找出并返回通过 matrix 的下降路径 的 最小和 。`,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 12,
            memory: 9.9,
            desc: '遍历',
            code: `class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size(), res = INT_MAX;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int val = matrix[i][j] + matrix[i - 1][j];
                if (j > 0) val = min(val, matrix[i][j] + matrix[i - 1][j - 1]);
                if (j < n - 1) val = min(val, matrix[i][j] + matrix[i - 1][j + 1]);
                matrix[i][j] = val;
            }
        }
        for (int j = 0; j < n; j++) res = min(res, matrix[n - 1][j]);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 80,
            memory: 17,
            desc: '同上',
            code: `class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        for i in range(1, n):
            for j in range(n):
                val = matrix[i][j] + matrix[i-1][j]
                if j > 0:
                    val = min(val, matrix[i][j] + matrix[i-1][j-1])
                if j < n-1:
                    val = min(val, matrix[i][j] + matrix[i-1][j+1])
                matrix[i][j] = val
        return min(matrix[n-1])`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 2.1,
            desc: '同上',
            code: `impl Solution {
    pub fn min_falling_path_sum(mut matrix: Vec<Vec<i32>>) -> i32 {
        let n = matrix.len();
        for i in 1..n {
            for j in 0..n {
                let mut val = matrix[i][j] + matrix[i - 1][j];
                if j > 0 {
                    val = val.min(matrix[i][j] + matrix[i - 1][j - 1]);
                }
                if j < n - 1 {
                    val = val.min(matrix[i][j] + matrix[i - 1][j + 1]);
                }
                matrix[i][j] = val;
            }
        }
        *matrix[n - 1].iter().min().unwrap()
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
