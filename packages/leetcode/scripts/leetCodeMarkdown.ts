import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1572. 矩阵对角线元素的和',
    url: 'https://leetcode.cn/problems/matrix-diagonal-sum/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个正方形矩阵 mat，请你返回矩阵对角线元素的和。`,
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
            time: 12,
            memory: 10.8,
            desc: '遍历，只记录最小值和第二小值',
            code: `class Solution {
public:
    int diagonalSum(vector<vector<int>>& mat) {
        int n = mat.size(), res = 0;
        for (int i = 0; i < n; i++) {
            res += mat[i][i] + mat[i][n - i - 1];
            if (i == n - i - 1) res -= mat[i][i];
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 44,
            memory: 15.88,
            desc: '同上',
            code: `class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        n = len(mat)
        res = 0
        for i in range(n):
            res += mat[i][i] + mat[i][n - i - 1]
            if i == n - i - 1:
                res -= mat[i][i]
        return res`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 2.13,
            desc: '同上',
            code: `impl Solution {
    pub fn diagonal_sum(mat: Vec<Vec<i32>>) -> i32 {
        mat.into_iter().enumerate().fold(0, |mut sum, (i, row)| {
            sum += row[i] + row[row.len() - 1 - i];
            if i == row.len() - 1 - i {
                sum -= row[i];
            }
            sum
        })
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
