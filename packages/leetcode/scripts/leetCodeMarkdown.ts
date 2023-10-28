import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2558. 从数量最多的堆取走礼物',
    url: 'https://leetcode.cn/problems/take-gifts-from-the-richest-pile',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回在 k 秒后剩下的礼物数量。`,
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
            time: 52,
            memory: 15.66,
            desc: '堆',
            code: `class Solution:
    def pickGifts(self, gifts: List[int], k: int) -> int:
        gifts = [-v for v in gifts]
        heapify(gifts)
        for _ in range(k):
            heappush(gifts, -int((-heappop(gifts)) ** 0.5))
        return -sum(gifts)`,
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
