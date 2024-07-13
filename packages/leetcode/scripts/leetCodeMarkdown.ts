import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3011. 判断一个数组是否可以变为有序',
    url: 'https://leetcode.cn/problems/find-if-array-can-be-sorted',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `如果你可以使数组变有序，请你返回 true ，否则返回 false 。`,
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
            time: 50,
            memory: 16.34,
            desc: '遍历',
            code: `class Solution:
    def canSortArray(self, nums: List[int]) -> bool:
        get = lambda num: bin(num).count('1')
        res = []
        cnt1 = -1
        arr = []
        for num in nums:
            if cnt1 != get(num):
                cnt1 = get(num)
                res += sorted(arr)
                arr.clear()
            arr.append(num)
        res += sorted(arr)
        return all(res[i] <= res[i + 1] for i in range(len(res) - 1))`,
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
