import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3111. 覆盖所有点的最少矩形数目',
    url: 'https://leetcode.cn/problems/minimum-rectangles-to-cover-points',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你在确保每个点都 至少 被一个矩形覆盖的前提下，最少 需要多少个矩形。`,
    solutions: [
        // {
        //     date: new Date('2020.11.11').getTime(),
        //     script: Script.JS,
        //     time: 140,
        //     memory: 45.82,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.07.25').getTime(),
        //     script: Script.TS,
        //     time: 188,
        //     memory: 39.68,
        //     desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
        //     code: ``,
        // },

        // {
        //     date: new Date('2022.03.28').getTime(),
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.32,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 128,
            memory: 47.47,
            desc: '排序后贪心放置矩形',
            code: `class Solution:
    def minRectanglesToCoverPoints(self, points: List[List[int]], w: int) -> int:
        points.sort(key = lambda p: p[0])
        res = 0
        last = -1
        for point in points:
            if point[0] <= last: continue
            res += 1
            last = point[0] + w
        return res`,
        },
        // {
        //     script: Script.RUST,
        //     time: 53,
        //     memory: 13.54,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
