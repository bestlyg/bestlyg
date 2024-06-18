import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2288. 价格减免',
    url: 'https://leetcode.cn/problems/apply-discount-to-prices',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回表示修改后句子的字符串。`,
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
            time: 98,
            memory: 18.2,
            desc: '遍历',
            code: `class Solution:
    def discountPrices(self, sentence: str, discount: int) -> str:
        arr = sentence.split(' ')
        for i in range(len(arr)):
            if arr[i][0] == '$' and arr[i][1:].isdigit():
                arr[i] = '$' + str(format(int(arr[i][1:]) * ((100 - discount) / 100), '.2f'))
        return ' '.join(arr)`,
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
