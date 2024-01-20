import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2788. 按分隔符拆分字符串',
    url: 'https://leetcode.cn/problems/split-strings-by-separator',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回一个由拆分后的新字符串组成的字符串数组，不包括空字符串 。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            // date: new Date('2021.01.29').getTime(),
            script: Script.TS,
            time: 111,
            memory: 59.37,
            desc: '分割后平铺',
            code: `function splitWordsBySeparator(words: string[], separator: string): string[] {
    const sarr = separator.split('')
    return words
            .map(word => sarr.map(s => word.split(s)))
            .flat(3)
            .filter(Boolean)
};`,
        },
        // {
        //     script: Script.PY,
        //     time: 372,
        //     memory: 39.59,
        //     desc: '遍历',
        //     code: ``,
        // },

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
