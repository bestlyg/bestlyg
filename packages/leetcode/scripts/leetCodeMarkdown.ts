import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2596. 检查骑士巡视方案',
    url: 'https://leetcode.cn/problems/course-schedule-iv',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `你也得到一个数组 queries ，其中 queries[j] = [uj, vj]。对于第 j 个查询，您应该回答课程 uj 是否是课程 vj 的先决条件。返回一个布尔数组 answer ，其中 answer[j] 是第 j 个查询的答案。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 816,
        //     memory: 164.73,
        //     desc: '提前预处理',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 40,
            memory: 16,
            desc: '遍历',
            code: `dirs = [(1, 2), (1, -2), (2, 1), (2, -1), (-1, 2), (-1, -2), (-2, 1), (-2, -1)]

class Solution:
    def checkValidGrid(self, grid: List[List[int]]) -> bool:
        n = len(grid)
        cur = (0, 0)
        if grid[0][0] != 0: return False
        for i in range(n * n - 1):
            f = False
            for dir in dirs:
                x = cur[0] + dir[0]
                y = cur[1] + dir[1]
                if 0 <= x < n and 0 <= y < n and grid[x][y] == i + 1:
                    f = True
                    cur = (x, y)
            if not f:
                return False
        return True`,
        },
        // {
        //     script: Script.RUST,
        //     time: 60,
        //     memory: 3.11,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
