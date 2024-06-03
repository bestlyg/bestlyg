import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1103. 分糖果 II',
    url: 'https://leetcode.cn/problems/distribute-candies-to-people',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回一个长度为 num_people、元素之和为 candies 的数组，以表示糖果的最终分发情况（即 ans[i] 表示第 i 个小朋友分到的糖果数）。`,
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

        {
            date: new Date('2022.03.28').getTime(),
            script: Script.CPP,
            time: 0,
            memory: 6.32,
            desc: '模拟',
            code: `class Solution {
public:
    vector<int> distributeCandies(int candies, int num_people) {
        vector<int> ans(num_people,0);
        for (int i = 0, cnt = 1; candies > 0; i = (i + 1) % num_people,cnt++) {
            ans[i] += min(candies, cnt);
            candies -= cnt;
        }
        return ans;
    }
};`,
        },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 37,
            memory: 16.5,
            desc: '模拟',
            code: `class Solution:
    def distributeCandies(self, candies: int, num_people: int) -> List[int]:
        res = [0] * num_people
        cur = 1
        idx = 0
        while candies:
            v = min(cur, candies)
            res[idx] += v
            candies -= v
            cur += 1
            idx = (idx + 1) % num_people
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
