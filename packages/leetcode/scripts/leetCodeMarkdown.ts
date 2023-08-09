import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1281. 整数的各位积和之差',
    url: 'https://leetcode.cn/problems/subtract-the-product-and-sum-of-digits-of-an-integer',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 n，请你帮忙计算并返回该整数「各位数字之积」与「各位数字之和」的差。`,
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
            time: 0,
            memory: 5.7,
            desc: '遍历',
            code: `class Solution {
public:
    int subtractProductAndSum(int n) {
        int num1 = 1, num2 = 0;
        while (n) {
            num1 *= n % 10;
            num2 += n % 10;
            n /= 10;
        }
        return num1 - num2;
    }
};`,
        },
        {
            script: Script.PY,
            time: 44,
            memory: 16.1,
            desc: '同上',
            code: `class Solution:
    def subtractProductAndSum(self, n: int) -> int:
        num1 = 1
        num2 = 0
        while n:
            num1 *= n % 10
            num2 += n % 10
            n //= 10
        return num1 - num2`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 2,
            desc: '同上',
            code: `impl Solution {
    pub fn subtract_product_and_sum(mut n: i32) -> i32 {
        let mut num1 = 1;
        let mut num2 = 0;
        while n != 0 {
            num1 *= n % 10;
            num2 += n % 10;
            n /= 10;
        }
        num1 - num2
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
