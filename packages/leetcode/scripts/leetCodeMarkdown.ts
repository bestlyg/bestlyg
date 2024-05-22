import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2225. 找出输掉零场或一场比赛的玩家',
    url: 'https://leetcode.cn/problems/find-players-with-zero-or-one-losses',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 matches 其中 matches[i] = [winneri, loseri] 表示在一场比赛中 winneri 击败了 loseri 。返回一个长度为 2 的列表 answer。`,
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
            time: 378,
            memory: 59.18,
            desc: '遍历',
            code: `class Solution:
    def findWinners(self, matches: List[List[int]]) -> List[List[int]]:
        counter = Counter()
        for w, l in matches:
            if not counter[w]: counter[w] = 0
            counter[l] += 1
        res = [[], []] 
        for k, v in sorted(counter.items()):
            if v < 2:
                res[v].append(k)
        return res`,
        },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 209,
            memory: 56.78,
            desc: '遍历',
            code: `class Solution:
            def findWinners(self, matches: List[List[int]]) -> List[List[int]]:
                sets = [set() for _ in range(3)]
                for w, l in matches:
                    if w not in sets[0] and w not in sets[1] and w not in sets[2]:
                        sets[0].add(w)
                    if l not in sets[0] and l not in sets[1] and l not in sets[2]:
                        sets[1].add(l)
                    else:
                        idx = 0
                        while idx < 2:
                            if l in sets[idx]:
                                sets[idx].remove(l)
                                sets[idx + 1].add(l)
                                break
                            idx += 1
                return [sorted(v) for v in sets[:2]]`,
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
