import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1334. 阈值距离内邻居最少的城市',
    url: 'https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `有 n 个城市，按从 0 到 n-1 编号。给你一个边数组 edges，其中 edges[i] = [fromi, toi, weighti] 代表 fromi 和 toi 两个城市之间的双向加权边，距离阈值是一个整数 distanceThreshold。返回能通过某些路径到达其他城市数目最少、且路径距离 最大 为 distanceThreshold 的城市。如果有多个这样的城市，则返回编号最大的城市。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 268,
            memory: 17,
            desc: '迪杰特斯拉短路算法',
            code: `class Solution:
    def findTheCity(self, n: int, edges: List[List[int]], distanceThreshold: int) -> int:
        nodes = [[] for _ in range(n)]
        for edge in edges:
            nodes[edge[0]].append((edge[1], edge[2]))
            nodes[edge[1]].append((edge[0], edge[2]))
        ans = 0
        cnt = inf
        for i in range(n):
            q = [(0, i)]
            used = [False] * n
            cur = -1
            while q:
                d, node = heappop(q)
                if used[node]: continue
                used[node] = True
                cur += 1
                for next_node, next_d in nodes[node]:
                    if not used[next_node] and d + next_d <= distanceThreshold:
                        heappush(q, (d + next_d, next_node))
            if cur <= cnt:
                cnt = cur
                ans = i
        return ans`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
