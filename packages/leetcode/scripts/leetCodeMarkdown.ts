import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: 'LCP 40. 心算挑战',
    url: 'https://leetcode.cn/problems/uOAnQW',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `「力扣挑战赛」心算项目的挑战比赛中，要求选手从 N 张卡牌中选出 cnt 张卡牌，若这 cnt 张卡牌数字总和为偶数，则选手成绩「有效」且得分为 cnt 张卡牌数字总和。 给定数组 cards 和 cnt，其中 cards[i] 表示第 i 张卡牌上的数字。 请帮参赛选手计算最大的有效得分。若不存在获取有效得分的卡牌方案，则返回 0。`,
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
            time: 209,
            memory: 25.76,
            desc: '从大到小排序后依次取值，如果最后为偶数则就是最大值，如果最后为奇数，比较删除一个奇数，增加一个偶数，和删除一个偶数，增加一个奇数两种方案的最大值',
            code: `class Solution:
    def maxmiumScore(self, cards: List[int], cnt: int) -> int:
        res = i = f = 0
        arr = sorted(Counter(cards).items(), reverse = True)
        while i < len(arr) and cnt > 0:
            k, v = arr[i]
            c = min(cnt, v)
            cnt -= c
            arr[i] = (k, v - c)
            res += k * c
            f ^= (k * c) & 1
            i += 1
        if f == 0: return res
        else:
            # v1
            idx = i - 1
            while idx > 0:
                if arr[idx][0] % 2 != 0: break
                idx -= 1
            if idx == -1: v1 = 0
            else:
                v1 = res - arr[idx][0]
                idx = i
                if idx > 0 and arr[idx - 1][1] > 0: idx -= 1
                while idx < len(arr):
                    if arr[idx][0] % 2 == 0: break
                    idx += 1
                if idx == len(arr): v1 = 0
                else: v1 += arr[idx][0]
            # v2
            idx = i - 1
            while idx >= 0:
                if arr[idx][0] % 2 == 0: break
                idx -= 1
            if idx == -1: v2 = 0
            else:
                v2 = res - arr[idx][0]
                idx = i
                if idx > 0 and arr[idx - 1][1] > 0: idx -= 1
                while idx < len(arr):
                    if arr[idx][0] % 2 != 0: break
                    idx += 1
                if idx == len(arr): v2 = 0
                else: v2 += arr[idx][0]
            return max(v1, v2)`,
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
