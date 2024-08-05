import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '600. 不含连续1的非负整数',
    url: 'https://leetcode.cn/problems/maximum-points-inside-the-square',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回 合法 正方形中可以包含的 最多 点数。`,
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
            time: 55,
            memory: 16.46,
            desc: '数位dp',
            code: `N = len(bin(10 ** 9)) - 2
arr = [0] * (N + 1)
arr[0] = arr[1] = 1
tmp_sum = 1
for i in range(2, N + 1):
    arr[i] = tmp_sum
    tmp_sum += arr[i - 1]

class Solution:
    def findIntegers(self, num: int) -> int:
        if num == 0: return 1
        n = len(bin(num)) - 2
        res = sum(arr[:n])
        next_num = num
        if bin(next_num)[2:4] == '11':
            next_num = (1 << (n - 1)) + (1 << (n - 2)) - 1
        return sum(arr[:n]) + self.findIntegers(next_num - (1 << (n - 1)))`,
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
