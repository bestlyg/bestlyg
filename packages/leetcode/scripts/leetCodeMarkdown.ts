import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2520. 统计能整除数字的位数',
    url: 'https://leetcode.cn/problems/count-the-digits-that-divide-a-number',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 num ，返回 num 中能整除 num 的数位的数目。如果满足 nums % val == 0 ，则认为整数 val 可以整除 nums 。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 0,
            memory: 5.94,
            desc: '遍历',
            code: `class Solution {
public:
    int countDigits(int num) {
        int res = 0;
        for (int v = num; v; v /= 10) res += num % (v % 10) == 0;
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 24,
            memory: 15.66,
            desc: '同上',
            code: `class Solution:
    def countDigits(self, num: int) -> int:
        return sum(num % int(c) == 0 for c in str(num))`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.93,
            desc: '同上',
            code: `impl Solution {
    pub fn count_digits(num: i32) -> i32 {
        let mut res = 0;
        let mut v = num;
        while v > 0 {
            res += if num % (v % 10) == 0 { 1 } else { 0 };
            v /= 10;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
