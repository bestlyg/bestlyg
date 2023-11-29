import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2336. 无限集中的最小数字',
    url: 'https://leetcode.cn/problems/smallest-number-in-infinite-set',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `现有一个包含所有正整数的集合 [1, 2, 3, 4, 5, ...] 。实现 SmallestInfiniteSet 类。`,
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
            time: 92,
            memory: 16.58,
            desc: '堆',
            code: `class SmallestInfiniteSet:
    def __init__(self):
        self.nmin = 1
        self.q = []
        self.used = set()
    def popSmallest(self) -> int:
        if not self.q:
            self.nmin += 1
            return self.nmin - 1
        num = heappop(self.q)
        self.used.remove(num)
        return num
    def addBack(self, num: int) -> None:
        if self.nmin > num and num not in self.used:
            heappush(self.q, num)
            self.used.add(num)`,
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
