import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:! true,
    name: '2500. 删除每行中的最大值',
    url: 'https://leetcode.cn/problems/minimum-operations-to-halve-array-sum/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个正整数数组 nums 。每一次操作中，你可以从 nums 中选择 任意 一个数并将它减小到 恰好 一半。（注意，在后续操作中你可以对减半过的数继续执行操作）请你返回将 nums 数组和 至少 减少一半的 最少 操作数。`,
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
            time: 8,
            memory: 9.3,
            desc: '排序后遍历',
            code: `class Solution {
public:
    int deleteGreatestValue(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size(), res = 0;
        for (auto &row : grid) sort(row.begin(), row.end());
        for (int j = m - 1; j >= 0; j--) {
            int cur = INT_MIN;
            for (int i = 0; i < n; i++) {
                cur = max(cur, grid[i][j]);
            }
            res += cur;
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 112,
            memory: 16.2,
            desc: '同上',
            code: `class Solution:
    def deleteGreatestValue(self, grid: List[List[int]]) -> int:
        for row in grid:
            row.sort()
        n = len(grid)
        m = len(grid[0])
        res = 0
        for j in range(m):
            num = -inf
            for i in range(n):
                num = max(num, grid[i][j])
            res += num
        return res
            `,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2.2,
            desc: '同上',
            code: `impl Solution {
    pub fn delete_greatest_value(mut grid: Vec<Vec<i32>>) -> i32 {
        for row in &mut grid {
            row.sort();
        }
        let mut res = 0;
        for j in 0..grid[0].len() {
            let mut num = i32::MIN;
            for i in 0..grid.len() {
                num = num.max(grid[i][j]);
            }
            res += num;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
