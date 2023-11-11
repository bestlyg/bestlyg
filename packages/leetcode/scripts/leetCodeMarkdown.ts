import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '765. 情侣牵手',
    url: 'https://leetcode.cn/problems/successful-pairs-of-spells-and-potions',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回一个长度为 n 的整数数组 pairs，其中 pairs[i] 是能跟第 i 个咒语成功组合的 药水 数目。`,
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
        //     time: 716,
        //     memory: 172.36,
        //     desc: '同上',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 48,
            memory: 15.68,
            desc: '贪心的每次没有匹配上去重置',
            code: `class Solution:
    def minSwapsCouples(self, row: List[int]) -> int:
        n = len(row)
        map = {row[i]: i for i in range(n)}
        ans = 0
        for i in range(0, n, 2):
            if row[i] ^ 1 != row[i + 1]:
                map[row[i + 1]] = map[row[i] ^ 1]
                row[map[row[i] ^ 1]], row[i + 1] = row[i + 1], row[map[row[i] ^ 1]]
                ans += 1
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
