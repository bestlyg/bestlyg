import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2244. 完成所有任务需要的最少轮数',
    url: 'https://leetcode.cn/problems/minimum-rounds-to-complete-all-tasks',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回完成所有任务需要的 最少 轮数，如果无法完成所有任务，返回 -1 。`,
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
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 147,
            memory: 70.3,
            desc: '遍历',
            code: `@cache
    def check(num: int) -> int:
        if num == 0: return 0
        if num == 1: return inf
        if num == 2 or num == 3: return 1
        res = min(check(num - 2), check(num - 3))
        if res == inf: return inf
        return res + 1
    class Solution:
        def minimumRounds(self, tasks: List[int]) -> int:
            counter = Counter(tasks)
            res = 0
            for cnt in counter.values():
                check_res = check(cnt)
                if check_res == inf: return -1
                res += check_res 
            return res`,
        },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 99,
            memory: 31.63,
            desc: '贪心',
            code: `class Solution:
    def minimumRounds(self, tasks: List[int]) -> int:
        counter = Counter(tasks)
        res = 0
        for cnt in counter.values():
            if cnt == 1: return -1
            res += cnt // 3
            if cnt % 3 != 0: res += 1 
        return res`,
        },

        //         {
        //             script: Script.CPP,
        //             time: 44,
        //             memory: 70.5,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     int getScore(vector<int>& player) {
        //         int cur = 0, sum = 0;
        //         for (auto &v: player) {
        //             sum += v + v * ((cur & 0b11) != 0);
        //             cur = cur << 1 | (v == 10);
        //         }
        //         return sum;
        //     }
        //     int isWinner(vector<int>& player1, vector<int>& player2) {
        //         int s1 = getScore(player1), s2 = getScore(player2);
        //         return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
        //     }
        // };`,
        //         },
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
