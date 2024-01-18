import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2171. 拿出最少数目的魔法豆',
    url: 'https://leetcode.cn/problems/removing-minimum-number-of-magic-beans',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给定一个 正整数 数组 beans ，其中每个整数表示一个袋子里装的魔法豆的数目。请你从每个袋子中 拿出 一些豆子（也可以 不拿出），使得剩下的 非空 袋子中（即 至少还有一颗 魔法豆的袋子）魔法豆的数目 相等。一旦把魔法豆从袋子中取出，你不能再将它放到任何袋子中。请返回你需要拿出魔法豆的 最少数目。`,
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
            time: 372,
            memory: 39.59,
            desc: '遍历',
            code: `class Solution:
    def minimumRemoval(self, beans: List[int]) -> int:
        counter = list(Counter(beans).items())
        counter.sort(reverse = True)
        ans = nsum = sum(beans)
        ncnt = 0
        prev_num = -1
        for num, cnt in counter:
            if prev_num != -1: nsum += ncnt * (prev_num - num)
            nsum -= num * cnt
            prev_num = num
            ncnt += cnt
            ans = min(ans, nsum)
        return ans`,
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
        //     time: 0,
        //     memory: 2.11,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
