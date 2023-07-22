import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '860. 柠檬水找零',
    url: 'https://leetcode.cn/problems/max-value-of-equation/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 88,
            memory: 81.4,
            desc: '遍历',
            code: `class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        int coins[2] = {0};
        for (auto &bill : bills) {
            switch (bill) {
                case 5: 
                    coins[0] += 1; 
                    break;
                case 10: 
                    if (coins[0] >= 1) {
                        coins[0]--;
                    } else {
                        return false;
                    }
                    coins[1] += 1;
                    break;
                case 20:
                    if (coins[0] >= 1 && coins[1] >= 1) {
                        coins[0] -= 1;
                        coins[1] -= 1;
                    } else if (coins[0] >= 3) {
                        coins[0] -= 3;
                    } else {
                        return false;
                    }
            }
        }
        return true;
    }
};`,
        },
        // {
        //     script: Script.PY,
        //     time: 352,
        //     memory: 53.2,
        //     desc: '同上',
        //     code: ``,
        // },
        // {
        //     script: Script.RUST,
        //     time: 28,
        //     memory: 10.9,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
