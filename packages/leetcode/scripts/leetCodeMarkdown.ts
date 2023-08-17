import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1444. 切披萨的方案数',
    url: 'https://leetcode.cn/problems/number-of-ways-of-cutting-a-pizza/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 rows x cols 大小的矩形披萨和一个整数 k ，矩形包含两种字符： 'A' （表示苹果）和 '.' （表示空白格子）。你需要切披萨 k-1 次，得到 k 块披萨并送给别人。请你返回确保每一块披萨包含 至少 一个苹果的切披萨方案数。`,
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
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 8,
        //     memory: 13.16,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 220,
            memory: 19.05,
            desc: '记忆化dfs',
            code: `class Solution:
    def ways(self, pizza: List[str], k: int) -> int:
        MOD = 1000000000 + 7
        n = len(pizza)
        m = len(pizza[0])

        @cache
        def has_apple(i1: int, j1: int, i2: int, j2: int) -> int:
            for i in range(i1, i2 + 1):
                for j in range(j1, j2 + 1):
                    if pizza[i][j] == 'A':
                        return True
            return False

        @cache
        def dfs(i1: int, j1: int, i2: int, j2: int, k: int) -> int:
            if k == 0:
                return 1 if has_apple(i1, j1, i2, j2) else 0
            res = 0
            if j1 != j2:
                f = False
                for j in range(j1, j2):
                    if not f:
                        f = f or has_apple(i1, j1, i2, j)
                    if f:
                        res = (res + dfs(i1, j + 1, i2, j2, k - 1)) % MOD
            if i1 != i2:
                f = False
                for i in range(i1, i2):
                    if not f:
                        f = f or has_apple(i1, j1, i, j2)
                    if f:
                        res = (res + dfs(i + 1, j1, i2, j2, k - 1)) % MOD
            return res

        return dfs(0, 0, n - 1, m - 1, k - 1)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 4,
        //     memory: 1.88,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
