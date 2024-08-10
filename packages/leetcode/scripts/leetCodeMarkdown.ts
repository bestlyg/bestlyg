import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2940. 找到 Alice 和 Bob 可以相遇的建筑',
    url: 'https://leetcode.cn/problems/find-building-where-alice-and-bob-can-meet',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你能返回一个数组 ans ，其中 ans[i] 是第 i 个查询中，Alice 和 Bob 可以相遇的 最左边的建筑 。如果对于查询 i ，Alice 和 Bob 不能相遇，令 ans[i] 为 -1 。`,
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
            time: 324,
            memory: 39.23,
            desc: '离线处理queries，过滤能立即得出答案的，剩余的一定是h[i] > h[j]，此时从左往右遍历h，维护当前下标之前的所有需求最小堆',
            code: `class Solution:
    def leftmostBuildingQueries(self, heights: List[int], queries: List[List[int]]) -> List[int]:
        res = [-1 for _ in range(len(queries))]
        arr = [[] for _ in range(len(heights))]
        for idx, (i, j) in enumerate(queries):
            if i > j: i, j = j, i
            if i == j or heights[i] < heights[j]: res[idx] = j
            else: arr[j].append((heights[i], idx))

        q = []
        for cur_idx, h in enumerate(heights):
            while q and q[0][0] < h:
                idx = heappop(q)[1]
                res[idx] = cur_idx
            for v in arr[cur_idx]:
                heappush(q, v)
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
