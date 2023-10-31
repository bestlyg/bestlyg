import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2003. 每棵子树内缺失的最小基因值',
    url: 'https://leetcode.cn/problems/smallest-missing-genetic-value-in-each-subtree',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回一个数组 ans ，长度为 n ，其中 ans[i] 是以节点 i 为根的子树内 缺失 的 最小 基因值。`,
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
            time: 812,
            memory: 172.67,
            desc: 'dfs时用set存储所有值',
            code: `class Solution:
    def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
        n = len(parents)
        nodes = [[] for i in range(n)]
        for i in range(1, n): nodes[parents[i]].append(i)
        ans = [1 for _ in range(n)]
        def dfs(idx: int) -> (int, Set[int]):
            last = 1
            s = set([nums[idx]])
            for child in nodes[idx]:
                resLast, resSet = dfs(child)
                last = max(last, resLast)
                if len(resSet) > len(s):
                    resSet |= s
                    s = resSet
                else:
                    s |= resSet
            while last in s: last += 1
            ans[idx] = last
            return last, s
        dfs(0)
        return ans`,
        },
        {
            script: Script.PY,
            time: 452,
            memory: 66.3,
            desc: '自底向上，只遍历存在1的树',
            code: `class Solution:
    def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
        n = len(parents)
        nodes = [[] for i in range(n)]
        for i in range(1, n): nodes[parents[i]].append(i)
        ans = [1 for _ in range(n)]
        used = [False for _ in range(n)]
        s = set()
        def dfs(idx: int):
            if used[idx]: return
            used[idx] = True
            s.add(nums[idx])
            for child in nodes[idx]: dfs(child)
        
        cur = nums.index(1) if 1 in nums else -1
        last = 1
        while cur != -1:
            dfs(cur)
            while last in s: last += 1
            ans[cur] = last
            cur = parents[cur]
        return ans`,
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
