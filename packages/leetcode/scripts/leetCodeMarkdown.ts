import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '365. 水壶问题',
    url: 'https://leetcode.cn/problems/maximum-number-of-alloys',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你整数 n、k、budget，下标从 1 开始的二维数组 composition，两个下标从 1 开始的数组 stock 和 cost，请你在预算不超过 budget 金钱的前提下，最大化 公司制造合金的数量。`,
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
        //     date: new Date('2020.07.25').getTime(),
        //     script: Script.TS,
        //     time: 188,
        //     memory: 39.68,
        //     desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 2181,
            memory: 67.66,
            desc: 'bfs',
            code: `class Solution:
    def canMeasureWater(self, jug1Capacity: int, jug2Capacity: int, targetCapacity: int) -> bool:
        used = defaultdict(defaultdict)
        q = deque()
        q.append((0, 0))
        used[0][0] = True
        while q:
            jug1, jug2 = q.popleft()
            if jug1 == targetCapacity or jug2 == targetCapacity or jug1 + jug2 == targetCapacity:
                return True
            arr =[
                [jug1Capacity, jug2],
                [0, jug2],
                [min(jug1Capacity, jug1 + jug2), jug2 - (min(jug1Capacity, jug1 + jug2) - jug1)],
                [jug1, jug2Capacity],
                [jug1, 0],
                [jug1 - (min(jug2Capacity, jug1 + jug2) - jug2), min(jug2Capacity, jug1 + jug2)]
            ]
            for jug1, jug2 in arr:
                if jug2 not in used[jug1]:
                    q.append((jug1, jug2))
                    used[jug1][jug2] = True
        return False`,
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
        {
            script: Script.RUST,
            time: 441,
            memory: 21.37,
            desc: '同上',
            code: `impl Solution {
    pub fn can_measure_water(jug1_capacity: i32, jug2_capacity: i32, target_capacity: i32) -> bool {
        use std::cmp::min;
        use std::collections::{HashMap, VecDeque};
        let mut used: HashMap<i32, HashMap<i32, bool>> = Default::default();
        let mut q: VecDeque<(i32, i32)> = Default::default();
        q.push_back((0, 0));
        used.entry(0).or_default().entry(0).or_insert(true);
        while let Some((jug1, jug2)) = q.pop_front() {
            if jug1 == target_capacity || jug2 == target_capacity || jug1 + jug2 == target_capacity
            {
                return true;
            }
            let next = [
                [jug1_capacity, jug2],
                [0, jug2],
                [
                    min(jug1_capacity, jug1 + jug2),
                    jug2 - (min(jug1_capacity, jug1 + jug2) - jug1),
                ],
                [jug1, jug2_capacity],
                [jug1, 0],
                [
                    jug1 - (min(jug2_capacity, jug1 + jug2) - jug2),
                    min(jug2_capacity, jug1 + jug2),
                ],
            ];
            for [jug1, jug2] in next {
                let item = used.entry(jug1).or_default().entry(jug2).or_default();
                if !*item {
                    q.push_back((jug1, jug2));
                    *item = true;
                }
            }
        }
        false
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
