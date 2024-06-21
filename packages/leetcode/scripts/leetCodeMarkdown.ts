import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: 'LCP 61. 气温变化趋势',
    url: 'https://leetcode.cn/problems/6CE719',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `已知 temperatureA[i] 和 temperatureB[i] 分别表示第 i 天两地区的气温。 组委会希望找到一段天数尽可能多，且两地气温变化趋势相同的时间举办嘉年华活动。请分析并返回两地气温变化趋势相同的最大连续天数。`,
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
            time: 51,
            memory: 16.46,
            desc: '遍历',
            code: `clamp = lambda v, nmin, nmax: min(max(v, nmin), nmax)
class Solution:
    def temperatureTrend(self, temperatureA: List[int], temperatureB: List[int]) -> int:
        res = cur = 0
        arrA = [clamp(temperatureA[i + 1] - temperatureA[i], -1, 1) for i in range(len(temperatureA) - 1)]
        arrB = [clamp(temperatureB[i + 1] - temperatureB[i], -1, 1) for i in range(len(temperatureB) - 1)]
        for i in range(len(arrA)):
            if arrA[i] == arrB[i]:
                cur += 1
                res = max(res, cur)
            else:
                cur = 0
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
