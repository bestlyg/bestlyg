import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '721. 账户合并',
    url: 'https://leetcode.cn/problems/max-increase-to-keep-city-skyline',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在 不改变 从任何主要方向观测到的城市 天际线 的前提下，返回建筑物可以增加的 最大高度增量总和 。`,
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
            time: 1584,
            memory: 19.45,
            desc: '并查集合并数据',
            code: `class UnionFind:
    def __init__(self, n) -> None:
        self.n = n
        self.data = [i for i in range(0, n)]
        self.sizes = [1] * n
        self.cnt = n
    def size(self, v: int) -> int:
        return self.sizes[self.find(v)]
    def find(self, v: int) -> int:
        if self.data[v] != v:
            self.data[v] = self.find(self.data[v])
        return self.data[v]
    def uni(self, v1: int, v2: int):
        p1 = self.find(v1)
        p2 = self.find(v2)
        if p1 != p2:
            self.sizes[p1] += self.sizes[p2]
            self.cnt -= self.sizes[p2]
            self.data[p2] = p1
    def same(self, v1: int, v2: int):
        return self.find(v1) == self.find(v2)
    def get_items(self) -> List[List[int]]:
        map = defaultdict(list)
        for i in range(self.n): map[self.find(i)].append(i)
        return map.values()
class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        n = len(accounts)
        uf = UnionFind(n)
        for i in range(n):
            name1 = accounts[i][0]
            emails1 = set(accounts[i][1:])
            for j in range(i):
                name2 = accounts[j][0]
                emails2 = set(accounts[j][1:])
                if name1 == name2 and not emails1.isdisjoint(emails2):
                    uf.uni(i, j)
        res = []
        for arr in uf.get_items():
            item = []
            res.append(item)
            item.append(accounts[arr[0]][0])
            emails = []
            for idx in arr: emails += accounts[idx][1:]
            item += sorted(set(emails))
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
