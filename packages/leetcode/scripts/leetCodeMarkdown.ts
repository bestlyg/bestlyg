import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2660. 保龄球游戏的获胜者',
    url: 'https://leetcode.cn/problems/determine-the-winner-of-a-bowling-game',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回如果玩家 1 的得分高于玩家 2 的得分，则为 1 ；如果玩家 2 的得分高于玩家 1 的得分，则为 2 ；如果平局，则为 0 。`,
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
        //     date: new Date('2021.01.29').getTime(),
        //     script: Script.TS,
        //     time: 352,
        //     memory: 46.7,
        //     desc: '二分',
        //     code: ``,
        // },

        {
            script: Script.PY,
            time: 72,
            memory: 16.9,
            desc: '模拟',
            code: `class Solution:
    def isWinner(self, player1: List[int], player2: List[int]) -> int:
        def getScore(player: List[int]) -> int:
            cur = 0
            sum = 0
            for v in player:
                sum += v + v * ((cur & 0b11) != 0)
                cur = cur << 1 | (v == 10)
            return sum
        s1, s2 = getScore(player1), getScore(player2)
        return 1 if s1 > s2 else 2 if s2 > s1 else 0`,
        },
        {
            script: Script.CPP,
            time: 44,
            memory: 70.5,
            desc: '同上',
            code: `class Solution {
public:
    int getScore(vector<int>& player) {
        int cur = 0, sum = 0;
        for (auto &v: player) {
            sum += v + v * ((cur & 0b11) != 0);
            cur = cur << 1 | (v == 10);
        }
        return sum;
    }
    int isWinner(vector<int>& player1, vector<int>& player2) {
        int s1 = getScore(player1), s2 = getScore(player2);
        return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
    }
};`,
        },
        // {
        //     script: Script.RUST,
        //     time: 4,
        //     memory: 2.05,
        //     desc: '状态压缩，动态规划每一层的所有状态',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
