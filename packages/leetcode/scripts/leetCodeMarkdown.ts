import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2766. 重新放置石块',
    url: 'https://leetcode.cn/problems/relocate-marbles',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `完成这些操作后，请你按升序返回所有 有 石块的位置。`,
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
            time: 102,
            memory: 35.38,
            desc: 'set存储',
            code: `class Solution:
    def relocateMarbles(self, nums: List[int], moveFrom: List[int], moveTo: List[int]) -> List[int]:
        s = set(nums)
        for i in range(len(moveFrom)):
            s.remove(moveFrom[i])
            s.add(moveTo[i])
        return sorted(s)`,
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
