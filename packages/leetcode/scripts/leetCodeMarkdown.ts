import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1488. 避免洪水泛滥',
    url: 'https://leetcode.cn/problems/avoid-flood-in-the-city',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `如果有多种可行解，请返回它们中的 任意一个 。如果没办法阻止洪水，请返回一个 空的数组 。请注意，如果你选择抽干一个装满水的湖泊，它会变成一个空的湖泊。但如果你选择抽干一个空的湖泊，那么将无事发生。`,
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
        //     time: 4,
        //     memory: 9.2,
        //     desc: '双指针',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 3896,
            memory: 31.44,
            desc: '记录前一次蓄满水后，最近的放空时间',
            code: `class Solution:
    def avoidFlood(self, rains: List[int]) -> List[int]:
        full = dict()
        empty = []
        res = [-1] * len(rains)
        for i, rain in enumerate(rains):
            if rain == 0:
                empty.append(i)
            elif rain not in full:
                full[rain] = i
            else:
                l = bisect_left(empty, full[rain])
                if l == len(empty):
                    return []
                res[empty[l]] = rain
                full[rain] = i
                empty.pop(l)
        for o in empty:
            res[o] = 1
        return res`,
        },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.12,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
