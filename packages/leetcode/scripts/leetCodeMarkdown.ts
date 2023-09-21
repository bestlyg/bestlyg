import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2603. 收集树中金币',
    url: 'https://leetcode.cn/problems/na-ying-bi',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，拿走其中的一枚或者两枚，求拿完所有力扣币的最少次数。`,
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
        //     time: 4,
        //     memory: 8.17,
        //     desc: '遍历',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 3812,
            memory: 28.9,
            desc: '同上',
            code: `class Solution:
    def collectTheCoins(self, coins: List[int], edges: List[List[int]]) -> int:
        n = len(edges) + 1
        nodes: List[List[int]] = [[] for _ in range(n)]
        for [n1, n2] in edges:
            nodes[n1].append(n2)
            nodes[n2].append(n1)
        egde_sum = n - 1
        # 把叶子没金币的删掉
        q = deque(i for i in range(n) if len(nodes[i]) == 1 and coins[i] == 0)
        while q:
            cur = q.pop()
            for idx in nodes[cur]:
                egde_sum -= 1
                nodes[idx].remove(cur)
                if len(nodes[idx]) == 1 and coins[idx] == 0:
                    q.append(idx)
        # 遍历所有叶子有金币的
        q = deque(i for i in range(n) if len(nodes[i]) == 1 and coins[i] == 1)
        while q:
            cur = q.pop()
            egde_sum -= 1
            for idx in nodes[cur]:
                nodes[idx].remove(cur)
                # 如果他只剩一条边，那就也可以不遍历他
                if len(nodes[idx]) == 1:
                    egde_sum -= 1
        return max(egde_sum * 2, 0)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.3,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
