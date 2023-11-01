import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2127. 参加会议的最多员工数',
    url: 'https://leetcode.cn/problems/maximum-employees-to-be-invited-to-a-meeting',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的整数数组 favorite ，其中 favorite[i] 表示第 i 位员工喜欢的员工。请你返回参加会议的 最多员工数目 。`,
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
        //     script: Script.CPP,
        //     time: 64,
        //     memory: 31.09,
        //     desc: '排序后计算间隔',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 552,
            memory: 137.49,
            desc: '判断环的数量，如果环内超过2个，找最大数量的环，如果只有2个，找两个点的最大延伸链',
            code: `class Solution:
    def maximumInvitations(self, favorite: List[int]) -> int:
        n = len(favorite)
        deg = [0 for _ in range(n)]
        for i in range(n): deg[favorite[i]] += 1
        q = deque(i for i in range(n) if deg[i] == 0)
        nexts = [[] for _ in range(n)]
        while q:
            i = q.popleft()
            nexts[favorite[i]].append(i)
            deg[favorite[i]] -= 1
            if deg[favorite[i]] == 0: q.append(favorite[i])
        def dfs(idx: int) -> int:
            res = 1
            for next_i in nexts[idx]:
                res = max(res, dfs(next_i) + 1)
            return res

        max_ring = sum_chain = 0
        for i in range(n):
            if deg[i] == 0: continue
            deg[i] = 0
            ring = 1
            next_i = favorite[i]
            while next_i != i:
                deg[next_i] = 0
                ring += 1
                next_i = favorite[next_i]
            if ring == 2: sum_chain += dfs(i) + dfs(favorite[i])
            else: max_ring = max(max_ring, ring)
        return max(sum_chain, max_ring)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 16,
        //     memory: 4.29,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
